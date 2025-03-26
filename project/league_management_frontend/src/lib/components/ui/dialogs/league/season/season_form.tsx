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
import { useEffect, useState } from "react";
import useLoading from "@/lib/hooks/useLoading";
import { DatePicker } from "@/lib/components/shadcn/input_date";
import { Season } from "@/lib/types/league/season";
import { createSeason, getSeason, updateSeason } from "@/lib/service/league/season_service";

const formSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
});

interface SeasonFormProps {
    leagueId: number;
    seasonId?: number;
    isEdit?: boolean;
    align?: "left" | "center" | "right";
    onSave?: (updatedSeason: Season) => void;
}

const SeasonForm: React.FC<SeasonFormProps> = ({ leagueId, isEdit, seasonId, onSave, align }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const { loading, setLoading } = useLoading();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (isEdit) {
                    const existingSeason = await getSeason(leagueId, seasonId!);

                    form.setValue("startDate", new Date(existingSeason.startDate));
                    form.setValue("endDate", new Date(existingSeason.endDate));

                }

            } catch (error) {
                setServerError(error instanceof Error ? error.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isEdit, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const newSeason: Partial<Season> = {
                startDate: values.startDate.toISOString(),
                endDate: values.endDate.toISOString(),
            };

            let updatedSeason: Season;

            if (isEdit) {
                updatedSeason = await updateSeason(leagueId, seasonId!, newSeason);
            } else {
                updatedSeason = await createSeason(leagueId, newSeason);
            }

            if (onSave) {
                onSave(updatedSeason);
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
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Season Start Date</FormLabel>
                            <FormControl>
                                <div>
                                    <DatePicker value={field.value} onChange={field.onChange} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Season End Date</FormLabel>
                            <FormControl>
                                <div>
                                    <DatePicker value={field.value} onChange={field.onChange} />
                                </div>
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
                        {loading ? "Saving..." : isEdit ? "Edit Season" : "Add Season"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SeasonForm;