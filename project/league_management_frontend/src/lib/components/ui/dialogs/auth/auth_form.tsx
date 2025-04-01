'use client'

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/shadcn/tabs";
import LoginForm from "./login";
import { Separator } from "@/lib/components/shadcn/separator";
import RegisterForm from "./register";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSearchParams } from "next/navigation";

/* 
A component that renders a dialog for user authentication (login/register).

@Author: IFD
@Date: 2025-04-01
*/
const AuthForm: React.FC = () => {
    const { formOpen, defaultTab, closeAuthForm, openAuthForm, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

    const searchParams = useSearchParams();

    // Ensure we only use router after the component has mounted
    useEffect(() => {
        const showAuth = searchParams.get('showAuth') === 'true';
        if (showAuth && !isAuthenticated) {
            openAuthForm();
        }

    }, [searchParams, isAuthenticated, openAuthForm]);


    return (
        <Dialog open={formOpen} onOpenChange={closeAuthForm}>
            <DialogPortal>
                {/* Fix: Ensure the overlay is clickable */}
                <DialogOverlay onClick={closeAuthForm} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={closeAuthForm} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>Sign In or Register</DialogTitle>
                        <DialogDescription>
                            To access your account, manage your league, or team.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div className="w-full">
                        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Sign In</TabsTrigger>
                                <TabsTrigger value="register">Register</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login"><LoginForm /></TabsContent>
                            <TabsContent value="register"><RegisterForm /></TabsContent>
                        </Tabs>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AuthForm;
