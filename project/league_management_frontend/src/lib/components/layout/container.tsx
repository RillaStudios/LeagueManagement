import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    color?: string; // Tailwind color classes (e.g., 'bg-gray-100')
    width?: string; // Tailwind width classes (e.g., 'w-full')
    height?: string; // Tailwind height classes (e.g., 'h-full')
    maxWidth?: string; // Tailwind max-width classes (e.g., 'max-w-screen-lg')
    maxHeight?: string; // Tailwind max-height classes (e.g., 'max-h-screen')
    padding?: string; // Tailwind padding classes (e.g., 'px-4')
    margin?: string; // Tailwind margin classes (e.g., 'm-4')
    borderRadius?: string; // Tailwind border radius classes (e.g., 'rounded-lg')
    className?: string;
};

export default function Container({
    children,
    color = "bg-transparent", // Default background color
    width = "w-full", // Default width
    height = "h-auto", // Default height
    maxWidth = "max-w-none", // Default max-width is infinite
    maxHeight = "max-h-none", // Default max-height is infinite
    padding = "p-0", // Default padding
    margin = "m-0", // Default margin
    borderRadius = "rounded-none", // Default border radius
    className = "",
}: ContainerProps) {
    return (
        <div
            className={cn(
                color,
                width,
                height,
                maxWidth,
                maxHeight,
                padding,
                margin,
                borderRadius,
                className
            )}
        >
            {children}
        </div>
    );
}