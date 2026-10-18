
"use client"

import { UserDefaultAddressType } from "@/type/addressTypes";
import { createContext, ReactNode, useContext, useState } from "react";


interface AppContextType {
    isScrollDown: boolean;
    setIsScrollDown: (value: boolean) => void;
    userDefaultAddress: UserDefaultAddressType | null;
    setUserDefaultAddress: (
        value: UserDefaultAddressType | null
    ) => void;
}
const AppContext = createContext<AppContextType | null>(null)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [isScrollDown, setIsScrollDown] = useState(false);
    const [userDefaultAddress, setUserDefaultAddress] = useState<UserDefaultAddressType | null>(null);



    const valueToSend = {
        isScrollDown, setIsScrollDown,
        userDefaultAddress, setUserDefaultAddress
    }


    return (
        <AppContext.Provider value={valueToSend}>
            {children}
        </AppContext.Provider>)
}
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(
            "useApp must be used inside AppContextProvider"
        );
    }
    return context;
}