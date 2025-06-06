import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GridProps = {
    children: ReactNode;
    columns?: string; // Tailwind column classes (e.g., 'grid-cols-12')
    rows?: string; // Tailwind row classes (e.g., 'grid-rows-2')
    gap?: string; // Tailwind gap classes (e.g., 'gap-4')
    className?: string;
};

/* 
A simple grid component that uses Tailwind CSS classes to create a grid layout.

@Author: IFD
@Date: 2025-02-20
*/
export default function Grid({
    children,
    columns = "grid-cols-12", // Default to 12-column grid
    rows = "",
    gap = "gap-4",
    className = "",
}: GridProps) {
    return (
        <div className={cn("grid", columns, rows, gap, className)}>
            {children}
        </div>
    );
}
