"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/* 
A provider component that manages the theme of the application.

@Author: IFD
@Date: 2025-02-25
*/
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
