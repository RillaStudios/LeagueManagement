'use client';

import React, { createContext, useContext, useState } from "react";

interface DialogState {
    [key: string]: boolean; // Key is the dialog identifier
}

interface DialogContextType {
    dialogState: DialogState;
    openDialog: (key: string) => void;
    closeDialog: (key: string) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

/* 
A provider component that manages the state of dialogs in the application.

@Author: IFD
@Date: 2025-02-25
*/
export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dialogState, setDialogState] = useState<DialogState>({});

    const openDialog = (key: string) => {
        setDialogState((prevState) => ({
            ...prevState,
            [key]: true,
        }));
    };

    const closeDialog = (key: string) => {
        setDialogState((prevState) => ({
            ...prevState,
            [key]: false,
        }));
    };

    return (
        <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};