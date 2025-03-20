"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/lib/components/shadcn/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/shadcn/form";
import { Input } from "@/lib/components/shadcn/input";
import { useEffect, useState } from "react";
import useLoading from "@/lib/hooks/useLoading";
import { Division } from "@/lib/types/league/division";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/components/shadcn/select";
import { Conference } from "@/lib/types/league/conference";
import { addDivision, getConferences } from "@/lib/service/league_service";

const formSchema = z.object({
    divName: z.string().min(1, {
        message: "Division name is required.",
    }),
    selectConference: z.string(),
});

interface DivisionFormProps {
    leagueId: number;
    isEdit: boolean;
}

const DivisionForm: React.FC<DivisionFormProps> = ({ leagueId, isEdit }) => {

    // Server error state
    const [serverError, setServerError] = useState<string | null>(null);

    const [division, setDivision] = useState<Division | null>(null);

    const [conferences, setConferences] = useState<Conference[] | null>(null);

    // Use the loading hook
    const { loading, setLoading } = useLoading();

    // Create a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            divName: "",
            selectConference: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch conferences regardless of edit mode
                const conferences = await getConferences(leagueId);

                setConferences(conferences);

                if (isEdit) {
                    const divisionId = window.location.pathname.split('/').pop(); // Get division ID from URL
                    const divisionResponse = await fetch(`/api/leagues/${leagueId}/divisions/${divisionId}`);
                    if (!divisionResponse.ok) throw new Error('Failed to fetch division');
                    const divisionData = await divisionResponse.json();
                    setDivision(divisionData);

                    // Set form values with division data
                    form.setValue('divName', divisionData.name);
                    form.setValue('selectConference', divisionData.conferenceId);
                }
            } catch (error) {
                setServerError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isEdit, form]);


    /* 
    A function that is called when the form is submitted.

    @param values - The form values

    @returns {Promise<void>}

    @Author IFD
    @Since 2025-02-38
    */
    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            //Set loading to true
            setLoading(true);

            const newDivision: Partial<Division> = {
                divisionName: values.divName,
                conferenceId: null,
            };

            addDivision(leagueId, newDivision);


        } catch (error: any) {

            // Set the server error
            setServerError(error.message?.toString() || "An error occurred. Please try again.");

        } finally {

            //Set loading to false
            setLoading(false);

        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <FormField
                    control={form.control}
                    name="divName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Division Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter division name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="selectConference"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assign Conference</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign division to conference" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Adding division..." : "Add Division"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default DivisionForm;
