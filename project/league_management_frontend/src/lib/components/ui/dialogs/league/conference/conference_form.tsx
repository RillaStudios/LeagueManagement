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
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";

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

/* 
A form component for adding or editing a conference.

@Author: IFD
@Date: 2025-04-01
*/
const ConferenceForm: React.FC<ConferenceFormProps> = ({ leagueId, isEdit, conferenceId, onSave }) => {

    // Server error state
    const [serverError, setServerError] = useState<string | null>(null);

    const { accessToken } = useAuth();

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

            let updatedConference: Conference | null;

            if (isEdit) {

                updatedConference = await updateConference(leagueId, conferenceId!, newConference, accessToken!);

            } else {

                updatedConference = await addConference(leagueId, newConference, accessToken!);

            }

            if (!updatedConference) {
                throw new Error("Conference could not be added or updated.");
            }

            if (onSave) {
                onSave(updatedConference); // Call the onSave callback
            }

            toast({
                variant: "default",
                title: "Success",
                description: `Conference ${isEdit ? "updated" : "added"} successfully.`,
            })


        } catch (error: any) {

            // Set the server error
            setServerError(error.message?.toString() || "An error occurred. Please try again.");

            toast({
                variant: "destructive",
                title: "Error",
                description: `Conference could not be ${isEdit ? "updated" : "added"}!`,
            })

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
                        {loading ? "Saving..." : isEdit ? "Edit Conference" : "Add Conference"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ConferenceForm;
