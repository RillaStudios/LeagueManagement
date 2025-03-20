'use client'

import MenuDrawer from "@/lib/components/ui/dialogs/mobile_drawer/menu_drawer";
import { createContext, useContext, useState } from "react";


interface HamContextType {
    drawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const DrawerContext = createContext<HamContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
    const [drawerOpen, setOpen] = useState(false);

    const openDrawer = () => {
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };

    return (
        <DrawerContext.Provider value={{ drawerOpen, openDrawer, closeDrawer }}>
            {children}
            <MenuDrawer />
        </DrawerContext.Provider>
    );
}

export function useDrawer() {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawer must be used within an DrawerProvider");
    }
    return context;
}