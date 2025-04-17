export interface User {
    id: string;
    name: string;
    email: string;
    skills: string[];
    interests: string[];
    lookingForTeam: boolean;
  }
  
  export interface Team {
    id: string;
    name: string;
    description: string;
    members: string[];
    skills: string[];
    lookingForMembers: boolean;
  }