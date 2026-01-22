'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Banco de dados inicial em memória
  const [usersDatabase, setUsersDatabase] = useState([
    {
      id: '1',
      login: 'Veica',
      senha: '123',
      dataCadastro: new Date().toISOString(),
    },
  ]);

  const login = (loginInput, passInput) => {
    const foundUser = usersDatabase.find(
      (u) => u.login === loginInput && u.senha === passInput
    );

    if (foundUser) {
      setUser(foundUser);
      router.push('/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    router.push('/(auth)/login'); // ou apenas '/'
  };

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: crypto.randomUUID(),
      dataCadastro: new Date().toISOString(),
    };
    setUsersDatabase([...usersDatabase, newUser]);
  };

  const editUser = (id, updatedData) => {
    setUsersDatabase((prev) => 
      prev.map((u) => (u.id === id ? { ...u, ...updatedData } : u))
    );
  };

  const deleteUser = (id) => {
    setUsersDatabase((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AuthContext.Provider 
      value={{ user, usersDatabase, login, logout, addUser, editUser, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);