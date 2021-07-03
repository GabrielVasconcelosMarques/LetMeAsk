import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){

    const [user, setUser] = useState<User>();

    // Função criada pra fazer com que atualize a página, não se perca os dados do usuário logado
    useEffect(() => {
        // ver se o usuário ja fez login antes, através desse onauthstatechanged
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            const { displayName, photoURL, uid } = user

            if(!displayName || !photoURL){
                throw new Error('Missing information from Google Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
        })

        // boa prática para descadastrar do ouvidor de evento do useeffect
        return () => {
            unsubscribe();
        }

    }, [])

    // fazer login uma vez, e todas as páginas terão acesso aos dados do usuario logado que foram guardados em user e setuser e são passados pelo context em authcontext.provider
    async function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if(result.user){
            const { displayName, photoURL, uid } = result.user
            

        if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account.');
        }

        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
        })
    }
  }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}

