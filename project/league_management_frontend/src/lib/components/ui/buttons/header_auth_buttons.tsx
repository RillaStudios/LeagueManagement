'use client';

import { Avatar } from "@/lib/components/shadcn/avatar";
import { Button } from "@/lib/components/shadcn/button";
import { Skeleton } from "@/lib/components/shadcn/skeleton";
import HamMenuButton from "./ham_menu_button";
import { useDrawer } from "../../providers/ham_menu_provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../shadcn/dropdown-menu";
import { useUserData } from "@/lib/hooks/useUserData";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

const HeaderAuthButtons: React.FC = () => {
    // Get authentication state
    const { isAuthenticated, openAuthForm, logout } = useAuth();
    const { user, loading } = useUserData();
    const { openDrawer } = useDrawer();

    // Show sign-in/register buttons if not authenticated
    if (!isAuthenticated)
        return (
            <>
                <Button onClick={() => openAuthForm("login")} className="hidden lg:inline-flex">Sign In</Button>
                <Button onClick={() => openAuthForm("register")} variant={'secondary'} className="hidden lg:inline-flex">Register</Button>
                <HamMenuButton onClick={() => openDrawer()} />
            </>
        );

    // Show user avatar if authenticated
    return (
        <>
            <HamMenuButton onClick={() => openDrawer()} />
            <Avatar>
                {loading ? (
                    <Skeleton className="h-full w-full rounded-full" />
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                            {user?.firstName && user?.lastName
                                ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
                                : user?.email?.slice(0, 2).toUpperCase()}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="m-2">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={"/account"} passHref><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></Link>
                            <Link href={"/account/leagues"} passHref><DropdownMenuItem className="cursor-pointer">Leagues</DropdownMenuItem></Link>
                            <Link href={"/account/teams"}><DropdownMenuItem className="cursor-pointer">Teams</DropdownMenuItem></Link>
                            <DropdownMenuItem className="cursor-pointer" onClick={logout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                )}
            </Avatar>
        </>

    );
};

export default HeaderAuthButtons;
