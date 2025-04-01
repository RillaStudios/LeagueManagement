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
import { toast } from "@/hooks/use-toast";
import { Venue } from "@/lib/types/league/venue";
import { addVenue, getVenue, updateVenue } from "@/lib/service/league/venue_service";

const formSchema = z.object({
    address: z.string().min(1, {
        message: "Address is required.",
    }),
    link: z.string(),
});

interface VenueFormProps {
    leagueId: number;
    isEdit?: boolean;
    venueId?: number;
    align?: "left" | "center" | "right";
    onSave?: (updatedVenue: Venue) => void;
}

/* 
A form component for adding or editing a venue in a league.

@Author: IFD
@Date: 2025-04-01
*/
const VenueForm: React.FC<VenueFormProps> = ({ leagueId, isEdit, venueId, onSave, align }) => {

    // Server error state
    const [serverError, setServerError] = useState<string | null>(null);

    // Use the loading hook
    const { loading, setLoading } = useLoading();

    // Create a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            link: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (isEdit) {

                    const newVenue = await getVenue(leagueId, venueId!);

                    form.setValue('address', newVenue?.address || '');
                    form.setValue('link', newVenue?.link || '');

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

            const newVenue: Partial<Venue> = {
                address: values.address,
                link: values.link,
            };

            let updatedVenue: Venue;

            if (isEdit) {

                updatedVenue = await updateVenue(leagueId, venueId!, newVenue);

            } else {

                updatedVenue = await addVenue(leagueId, newVenue);

            }

            if (onSave) {

                onSave(updatedVenue); // Call the onSave callback

            }

            toast({
                variant: "default",
                title: "Success",
                description: `Venue ${isEdit ? "updated" : "added"} successfully.`,
            })


        } catch (error: any) {

            // Set the server error
            setServerError(error.message?.toString() || "An error occurred. Please try again.");

            toast({
                variant: "destructive",
                title: "Error",
                description: `Venue could not be ${isEdit ? "updated" : "added"}!`,
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
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Venue Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter venue address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Venue Link</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter venue link" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && (
                    <p
                        className={`flex text-red-500 text-sm text-center` +
                            (align ? ` justify-${align}` : " justify-center")}
                    >
                        {serverError}
                    </p>
                )}
                <div className={`flex ` + (align ? `justify-${align}` : "justify-center")}>
                    <Button type="submit">
                        {loading ? "Saving..." : isEdit ? "Edit Venue" : "Add Venue"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default VenueForm;
