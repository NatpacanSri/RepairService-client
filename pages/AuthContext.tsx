// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('http://localhost:8080/user/userExist', {
                        credentials: "include"
                    })
                    const userExist = await response.json()

                    // console.log(userExist)
                    if (userExist.auth === false) {
                        console.log(userExist)
                        setAuth(false)
                    } else {
                        //   setMessage(`Hi ${userExist.fullname}`)
                        setAuth(true)
                        setUser(userExist)
                        console.log(userExist)
                    }
                } catch (error) {
                    console.log(error)
                    // setMessage(`Error: ${error}`)
                    // setAuth(false)
                }

            }
        )()
    }, []);

    return (
        <AuthContext.Provider value={{ auth, user, setAuth, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
