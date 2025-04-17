// src/hooks/useMyMLH.ts
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface MyMLHProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  major?: string;
  phone_number?: string;
  level_of_study?: string;
  graduation_year?: string;
  date_of_birth?: string;
  gender?: string;
  school?: {
    id: number;
    name: string;
  };
}

export const useMyMLH = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get client ID from environment variables
  const clientId = import.meta.env.VITE_MLH_CLIENT_ID;
  
  // This should be kept secure in a real production app
  const clientSecret = import.meta.env.VITE_MLH_CLIENT_SECRET;
  
  // Make sure this matches your GitHub Codespaces port
  const redirectUri = 'https://super-duper-pancake-x9q9rg7xjv7h97jg-5173.app.github.dev/auth/mlh/callback';

  // Helper function to get the proxy server URL
  const getProxyUrl = () => {
    return 'https://super-duper-pancake-x9q9rg7xjv7h97jg-3001.app.github.dev';
  };

  // Initiate the OAuth flow by redirecting to MyMLH authorization page
  const authorizeWithMyMLH = () => {
    // Using the 'public' scope as indicated in the MLH docs
    // Updated to use beta.my.mlh.io
    const authUrl = `https://beta.my.mlh.io/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=public&response_type=code`;
    window.location.href = authUrl;
  };

  // Exchange the authorization code for an access token
  const exchangeCodeForToken = async (code: string) => {
    try {
      // Using a public CORS proxy
      const corsProxyUrl = 'https://corsproxy.io/';
      const targetUrl = 'https://super-duper-pancake-x9q9rg7xjv7h97jg-3001.app.github.dev/api/mlh/token';
      
      console.log("Using CORS proxy to access:", targetUrl);
      
      const response = await fetch(`${corsProxyUrl}${encodeURIComponent(targetUrl)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ code, redirectUri })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Token exchange error:", errorText);
        throw new Error(`Failed to exchange code for token: ${errorText}`);
      }
      
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  };

  // Fetch the user's profile from MyMLH using the access token
  const fetchUserProfile = async (accessToken: string) => {
    try {
      const proxyUrl = getProxyUrl();
      console.log("Fetching user profile from MyMLH via proxy at:", proxyUrl);
      
      // Using our proxy server instead of directly calling MyMLH
      const response = await fetch(`${proxyUrl}/api/mlh/user?token=${accessToken}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: 'Unknown error', details: errorText };
        }
        console.error("Profile fetch error:", errorData);
        throw new Error(`Failed to fetch user profile: ${errorData.error || errorText}`);
      }
      
      // Parse the response
      const data = await response.json();
      return data.data as MyMLHProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  // Main handler for the OAuth callback
  const handleCallback = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Exchange authorization code for access token
      console.log("Processing authorization code...");
      const accessToken = await exchangeCodeForToken(code);
      
      // 2. Use the access token to fetch the user's profile
      console.log("Fetching user profile with access token...");
      const profile = await fetchUserProfile(accessToken);
      
      // 3. Use the email as a stable identifier to check if the user exists
      const userEmail = profile.email;
      
      console.log("Checking if user exists in Firebase...");
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // User exists, sign them in
        console.log("User exists, signing in...");
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        // Generate a deterministic password for this user
        // In production, you'd use a more secure method
        const password = `mlh_${profile.id}_${profile.email.split('@')[0]}`;
        
        try {
          // Sign in with Firebase Auth
          await signInWithEmailAndPassword(auth, userEmail, password);
          
          // Update last login time and MLH profile data
          await setDoc(doc(db, 'users', userDoc.id), {
            lastLogin: new Date().toISOString(),
            mlhProfile: profile
          }, { merge: true });
          
          setLoading(false);
          return { success: true, user: userData };
        } catch (signInError) {
          console.error("Error signing in with existing account:", signInError);
          throw signInError;
        }
      } else {
        // User doesn't exist, create a new account
        console.log("User doesn't exist, creating new account...");
        
        // Generate a deterministic password
        const password = `mlh_${profile.id}_${profile.email.split('@')[0]}`;
        
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
        const user = userCredential.user;
        
        // Map skills and interests from MLH profile
        const skills = [];
        if (profile.major) skills.push(profile.major);
        
        // Create user profile in Firestore
        const userData = {
          name: `${profile.first_name} ${profile.last_name}`,
          email: userEmail,
          skills: skills,
          interests: ['Hackathons', 'Team Projects'],
          lookingForTeam: true,
          school: profile.school?.name,
          registrationDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          mlhId: profile.id,
          mlhProfile: profile
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        
        setLoading(false);
        return { success: true, user: userData };
      }
    } catch (err) {
      console.error("Error in MyMLH callback:", err);
      setError('Failed to authenticate with MyMLH');
      setLoading(false);
      return { success: false, error: err };
    }
  };

  return {
    authorizeWithMyMLH,
    handleCallback,
    loading,
    error
  };
};

