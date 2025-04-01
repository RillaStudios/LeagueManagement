"use client";

import { format } from "date-fns";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent } from "./popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { CalendarIcon } from "lucide-react";

interface DateTimePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
    const [currentDate, setCurrentDate] = useState<Date | undefined>(value);

    // Synchronize currentDate with the value prop
    useEffect(() => {
        setCurrentDate(value);
    }, [value]);

    function handleDateSelect(date: Date | undefined) {
        const newDate = date ? new Date(date) : undefined;
        if (currentDate) {
            newDate?.setHours(currentDate.getHours());
            newDate?.setMinutes(currentDate.getMinutes());
        }
        setCurrentDate(newDate);
        onChange?.(newDate);
    }

    function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
        if (!currentDate) return;

        const newDate = new Date(currentDate);

        if (type === "hour") {
            const hour = parseInt(value, 10);
            newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
        } else if (type === "minute") {
            newDate.setMinutes(parseInt(value, 10));
        } else if (type === "ampm") {
            const hours = newDate.getHours();
            if (value === "AM" && hours >= 12) {
                newDate.setHours(hours - 12);
            } else if (value === "PM" && hours < 12) {
                newDate.setHours(hours + 12);
            }
        }

        setCurrentDate(newDate);
        onChange?.(newDate);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full pl-3 text-left font-normal",
                    )}
                >
                    {currentDate ? (
                        format(currentDate, "MM/dd/yyyy hh:mm aa")
                    ) : (
                        <span>MM/DD/YYYY hh:mm aa</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="sm:flex">
                    <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i + 1)
                                    .reverse()
                                    .map((hour) => (
                                        <Button
                                            key={hour}
                                            size="icon"
                                            variant={
                                                currentDate &&
                                                    currentDate.getHours() % 12 === hour % 12
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() =>
                                                handleTimeChange("hour", hour.toString())
                                            }
                                        >
                                            {hour}
                                        </Button>
                                    ))}
                            </div>
                            <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                            />
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                    (minute) => (
                                        <Button
                                            key={minute}
                                            size="icon"
                                            variant={
                                                currentDate &&
                                                    currentDate.getMinutes() === minute
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() =>
                                                handleTimeChange("minute", minute.toString())
                                            }
                                        >
                                            {minute.toString().padStart(2, "0")}
                                        </Button>
                                    )
                                )}
                            </div>
                            <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                            />
                        </ScrollArea>
                        <ScrollArea className="">
                            <div className="flex sm:flex-col p-2">
                                {["AM", "PM"].map((ampm) => (
                                    <Button
                                        key={ampm}
                                        size="icon"
                                        variant={
                                            currentDate &&
                                                ((ampm === "AM" &&
                                                    currentDate.getHours() < 12) ||
                                                    (ampm === "PM" &&
                                                        currentDate.getHours() >= 12))
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() => handleTimeChange("ampm", ampm)}
                                    >
                                        {ampm}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}