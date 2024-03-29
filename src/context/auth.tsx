"use client"

import apiClient from "@/lib/apiClient";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextType {
    user: null | {
        id: number;
        email: string;
        username: string;
    }
    login: (token: string) => void;
    logout: () => void
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<null | {
        id: number; 
        email: string;
        username: string;
    }>(null);

    useEffect(()=> {
        const localStorageToken = localStorage.getItem("auth_token");
        if(localStorageToken) {
            apiClient.defaults.headers["Authorization"] = `Bearer ${localStorageToken}`;
            apiClient.get("/users/find")
                .then((response) => {
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    const login = async (token: string) => {
        localStorage.setItem("auth_token", token);
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

        try {
            apiClient.get("/users/find")
                .then((response) => {
                    setUser(response.data.user);
                })
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("auth_token");
        setUser(null);
        delete apiClient.defaults.headers["Authorization"]
    }

    const value = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};