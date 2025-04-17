// src/hooks/useFirebase.ts
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc, query, where, writeBatch } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { User, Team } from '../types';

export const useFirebase = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize Firestore with sample data if collections are empty
  const initializeFirestore = async () => {
    try {
      console.log("Initializing Firestore collections...");
      
      // Check if users collection exists and has documents
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      
      // If no users exist, create sample users
      if (usersSnapshot.empty) {
        console.log("Creating sample users in Firestore");
        
        const sampleUsers = [
          {
            name: 'Jane Developer',
            email: 'jane@example.com',
            skills: ['React', 'TypeScript', 'UI Design'],
            interests: ['Web Development', 'Mobile Apps'],
            lookingForTeam: true
          },
          {
            name: 'John Coder',
            email: 'john@example.com',
            skills: ['Python', 'Machine Learning', 'Data Science'],
            interests: ['AI', 'Data Visualization'],
            lookingForTeam: true
          }
        ];
        
        // Create batch write for better performance
        const batch = writeBatch(db);
        
        // Add users to batch
        sampleUsers.forEach((user, index) => {
          const userDocRef = doc(db, 'users', `sample_user_${index}`);
          batch.set(userDocRef, user);
        });
        
        // Commit the batch
        await batch.commit();
        console.log("Sample users created");
      }
      
      // Check if teams collection exists and has documents
      const teamsRef = collection(db, 'teams');
      const teamsSnapshot = await getDocs(teamsRef);
      
      // If no teams exist, create sample teams
      if (teamsSnapshot.empty) {
        console.log("Creating sample teams in Firestore");
        
        const sampleTeams = [
          {
            name: 'Team Innovators',
            description: 'Working on a sustainable energy solution',
            members: ['sample_user_0'],
            skills: ['React', 'Python', 'Data Science'],
            lookingForMembers: true
          },
          {
            name: 'Code Warriors',
            description: 'Building an AI-powered educational platform',
            members: ['sample_user_1'],
            skills: ['Machine Learning', 'UI/UX', 'Backend'],
            lookingForMembers: true
          }
        ];
        
        // Create batch write for better performance
        const batch = writeBatch(db);
        
        // Add teams to batch
        sampleTeams.forEach((team, index) => {
          const teamDocRef = doc(db, 'teams', `sample_team_${index}`);
          batch.set(teamDocRef, team);
        });
        
        // Commit the batch
        await batch.commit();
        console.log("Sample teams created");
      }
      
      return true;
    } catch (error) {
      console.error("Error initializing Firestore:", error);
      return false;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      // Initialize Firestore collections
      await initializeFirestore();
      
      // Set up auth state listener
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // Get user profile
          try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', user.email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data() as User;
              setCurrentUser({
                ...userData,
                id: querySnapshot.docs[0].id
              });
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    };
    
    initialize();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      const usersList: User[] = [];
      
      querySnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() } as User);
      });
      
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const teamsRef = collection(db, 'teams');
      const querySnapshot = await getDocs(teamsRef);
      const teamsList: Team[] = [];
      
      querySnapshot.forEach((doc) => {
        teamsList.push({ id: doc.id, ...doc.data() } as Team);
      });
      
      setTeams(teamsList);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const createUser = async (email: string, password: string, userData: Omit<User, 'id'>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        email: user.email
      });
      
      setCurrentUser({
        id: user.uid,
        ...userData,
        email: user.email || ''
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error("Error signing in:", error);
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Error signing out:", error);
      return { success: false, error };
    }
  };

  const updateProfile = async (userId: string, userData: Partial<User>) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, userData);
      
      if (currentUser && currentUser.id === userId) {
        setCurrentUser({
          ...currentUser,
          ...userData
        });
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error };
    }
  };

  const createTeam = async (teamData: Omit<Team, 'id'>) => {
    try {
      const teamRef = doc(collection(db, 'teams'));
      await setDoc(teamRef, teamData);
      
      await fetchTeams();
      return { success: true, teamId: teamRef.id };
    } catch (error) {
      console.error("Error creating team:", error);
      return { success: false, error };
    }
  };

  return {
    currentUser,
    users,
    teams,
    loading,
    fetchUsers,
    fetchTeams,
    createUser,
    signIn,
    signOut,
    updateProfile,
    createTeam
  };
};