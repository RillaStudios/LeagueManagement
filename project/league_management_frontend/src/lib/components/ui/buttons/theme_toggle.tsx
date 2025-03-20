"use client"

import { useTheme } from "next-themes";
import { Button } from "@/lib/components/shadcn/button";
import { Sun, Moon, Monitor } from "lucide-react";

/* 
A theme toggle button that switches between light, dark, and system themes.
The theme is managed by the next-themes package.

The button icon changes based on the current theme.

@Author: IFD
@Since: 2025-02-25
*/
export default function ThemeToggle() {

    // Get the current theme and the function to set the theme
    const { theme, setTheme } = useTheme();

    // Switch between light, dark, and system themes
    function switchTheme() {
        if (theme === "system") {
            setTheme("light");
        } else if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("system");
        }
    }

    // Render the theme toggle button
    return (
        <Button variant="ghost" size="icon" onClick={switchTheme}>
            {theme === "system" ? (
                <Monitor className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ) : theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            )}
        </Button>
    );
}


