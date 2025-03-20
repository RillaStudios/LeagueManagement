'use client';

import { useUserData } from "@/lib/hooks/useUserData";
import { Input } from "../../shadcn/input";
import { z } from "zod";
import { useState, useEffect } from "react";
import useLoading from "@/lib/hooks/useLoading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/form";
import { Button } from "../../shadcn/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { Textarea } from "../../shadcn/textarea";
import { BodySmall } from "../../layout/typography";
import Column from "../../layout/column";
import { addLeague } from "@/lib/service/league_service";
import { League } from "@/lib/types/league/league";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "League name is required.",
    }),
    gameType: z.string(),
    description: z.string(),
    location: z.string(),
});

const AddLeagueDisplay: React.FC<{}> = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { accessToken } = useAuth();
    const { user } = useUserData();
    const [serverError, setServerError] = useState<string | null>(null);
    const { loading, setLoading } = useLoading();

    // Create a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            gameType: "",
            description: "",
            location: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: "",
                gameType: "",
                description: "",
                location: "",
            });
        }
    }, [user, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setServerError(null);
            setLoading(true);

            const newLeague: Partial<League> = {
                name: values.name,
                gameType: values.gameType,
                description: values.description,
                location: values.location,
            };

            addLeague(accessToken!, newLeague);

        } catch (error) {
            console.error("Failed to add league:", error);
            setServerError("Failed to add league. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>League Name</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" placeholder="Enter league name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gameType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Game Type (Optional)</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" placeholder="Enter game type" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Game Type (Optional)</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" placeholder="Enter league location (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>League Description (Optional)</FormLabel>
                            <FormControl>
                                <Textarea className="w-full md:w-1/2 resize-none min-h-[100px]" maxLength={160} placeholder="Enter league description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-left">{serverError}</p>}
                <div className="flex justify-start">
                    <Column gap="8">
                        <BodySmall text="Note: A league must be created before adding conferences, teams, and divisions." />
                        <Button type="submit" disabled={!form.formState.isDirty || loading}>
                            {loading ? "Adding League..." : "Add League"}
                        </Button>
                    </Column>
                </div>
            </form>
        </Form>
    );
}

export default AddLeagueDisplay;