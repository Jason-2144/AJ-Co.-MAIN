import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '../services/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '7e092dad-93ae-4953-a0bf-572b72fdfae8',
    email: 'jsnashish@gmail.com'
  } as any);

  const [profile, setProfile] = useState<UserProfile | null>({
    id: '7e092dad-93ae-4953-a0bf-572b72fdfae8',
    first_name: 'Jason',
    last_name: 'Ashish',
    email: 'jsnashish@gmail.com',
    role_id: 'dcb44b34-2d3d-47d3-9413-daa4dcacc098',
    status: 'active',
    roles: { id: 'dcb44b34-2d3d-47d3-9413-daa4dcacc098', name: 'owner' }
  } as any);

  const [loading, setLoading] = useState<boolean>(false);

  const refreshProfile = async () => {
    // No-op in bypass mode
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const hasPermission = (permission: string): boolean => {
    // Owner role has unrestricted access to all permissions
    return true;
  };

  const signOut = async () => {
    console.log('Bypass active: Sign Out is disabled.');
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, hasPermission, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
