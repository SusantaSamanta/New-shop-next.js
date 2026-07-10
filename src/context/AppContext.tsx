
"use client"

import { createContext, ReactNode, useContext, useState } from "react";


interface AppContextType {
    isScrollDown: boolean;
    setIsScrollDown: (value: boolean) => void;
}
const AppContext = createContext<AppContextType | null>(null)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [isScrollDown, setIsScrollDown] = useState(false);

    return (
        <AppContext.Provider value={{ isScrollDown, setIsScrollDown }}>
            {children}
        </AppContext.Provider>)
}
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }
    return context;
}