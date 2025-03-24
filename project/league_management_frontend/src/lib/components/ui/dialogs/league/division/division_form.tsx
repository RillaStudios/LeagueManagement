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
import { addDivision, getDivision, updateDivision } from "@/lib/service/league/division_service";
import { getConferences } from "@/lib/service/league/conference_service";

const formSchema = z.object({
    divName: z.string().min(1, {
        message: "Division name is required.",
    }),
    selectConference: z.string(),
});

interface DivisionFormProps {
    leagueId: number;
    divisionId?: number;
    isEdit?: boolean;
    onSave?: (updatedDivision: Division) => void;
}

const DivisionForm: React.FC<DivisionFormProps> = ({ leagueId, isEdit, divisionId, onSave }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [conferences, setConferences] = useState<Conference[] | null>(null);
    const { loading, setLoading } = useLoading();

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
                const conferences = await getConferences(leagueId);
                setConferences(conferences);

                if (isEdit) {
                    const newDivision = await getDivision(leagueId, divisionId!);
                    form.setValue('divName', newDivision.divisionName || '');
                    form.setValue('selectConference', newDivision.conferenceId?.toString() || '');
                }
            } catch (error) {
                setServerError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isEdit, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const newDivision: Partial<Division> = {
                divisionName: values.divName,
                conferenceId: parseInt(values.selectConference),
            };

            let updatedDivision: Division;
            if (isEdit) {
                updatedDivision = await updateDivision(leagueId, divisionId!, newDivision);
            } else {
                updatedDivision = await addDivision(leagueId, newDivision);
            }

            if (onSave) {
                onSave(updatedDivision); // Call the onSave callback
            }
        } catch (error: any) {
            setServerError(error.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign division to conference" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {conferences?.map((conference) => (
                                            <SelectItem key={conference.id} value={conference.id.toString()}>
                                                {conference.name}
                                            </SelectItem>
                                        ))}
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
                        {loading ? "Saving..." : isEdit ? "Edit Division" : "Add Division"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default DivisionForm;