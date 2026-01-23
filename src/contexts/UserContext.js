'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserContext = createContext({});

//Chave para garantir que ele recupere dados apenas do meu app
const LOCAL_STORAGE_KEY = "@desafioVeica"

export function UserProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função de Login e salva a sessão no localStorage
    function saveSession(data){
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        setUser(data)
        router.push('/usuarios');

    }

    // Valida se esta logado
    function loadUser(){
        const Session = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);

        if (Session) {
            setUser(JSON.parse(Session));
        }

        setLoading(false);

    }

    // Sai do sisteam e remove os dados do localStorage
    function logout(){
        setUser(null)

        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)

        router.push("/")
    }

    // Rodando verificação de usuário logado ao atualizar e abrir a pagina
    useEffect(() => {
        loadUser()
    },[])

    return (
        <UserContext.Provider value={{ user, loading, saveSession, logout, isAuthenticated: !!user }}>
        {children}
        </UserContext.Provider>
    )
    
}

export const useUser = () => useContext(UserContext);