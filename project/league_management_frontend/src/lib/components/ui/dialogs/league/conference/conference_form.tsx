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
import { Conference } from "@/lib/types/league/conference";
import { addConference, getConference, updateConference } from "@/lib/service/league/conference_service";

const formSchema = z.object({
    conferenceName: z.string().min(1, {
        message: "Conference name is required.",
    }),
});

interface ConferenceFormProps {
    leagueId: number;
    isEdit: boolean;
    conferenceId?: number;
    onSave?: (updatedConference: Conference) => void;
}

const ConferenceForm: React.FC<ConferenceFormProps> = ({ leagueId, isEdit, conferenceId, onSave }) => {

    // Server error state
    const [serverError, setServerError] = useState<string | null>(null);

    // Use the loading hook
    const { loading, setLoading } = useLoading();

    // Create a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            conferenceName: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (isEdit) {
                    const newConference = await getConference(leagueId, conferenceId!);
                    form.setValue('conferenceName', newConference?.name || '');
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

            const newConference: Partial<Conference> = {
                name: values.conferenceName,
            };

            let updatedConference: Conference;
            if (isEdit) {
                updatedConference = await updateConference(leagueId, conferenceId!, newConference);
            } else {
                updatedConference = await addConference(leagueId, newConference);
            }

            if (onSave) {
                onSave(updatedConference); // Call the onSave callback
            }


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
                    name="conferenceName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conference Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter conference name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Adding conference..." : "Add Conference"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ConferenceForm;
