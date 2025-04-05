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
import { toast } from "@/hooks/use-toast";
import { NewsLeague } from "@/lib/types/league/news_league";
import { createNewsLeague, getNewsLeague, getNewsLeagues, updateNewsLeague } from "@/lib/service/league/news_league_service";
import { Input } from "@/lib/components/shadcn/input";
import { Textarea } from "@/lib/components/shadcn/textarea";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
    title: z.string(),
    content: z.string(),
});

interface NewsLeagueProps {
    leagueId: number;
    newsId?: number;
    isEdit?: boolean;
    align?: "left" | "center" | "right";
    onSave?: (updatedNews: NewsLeague) => void;
}

/* 
A form component for adding or editing a news post in a league.

@Author: IFD
@Date: 2025-04-01
*/
const NewsLeagueForm: React.FC<NewsLeagueProps> = ({ leagueId, isEdit, newsId, align, onSave }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [news, setNews] = useState<NewsLeague[] | null>(null);
    const { loading, setLoading } = useLoading();
    const { accessToken } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const news = await getNewsLeagues(leagueId);

                setNews(news);

                if (isEdit) {

                    const newNews = await getNewsLeague(leagueId, newsId!);

                    if (!newNews) {
                        throw new Error("News not found");
                    }

                    const newsContent = JSON.parse(newNews.content);

                    form.setValue('title', newsContent.title || '');
                    form.setValue('content', newsContent.content || '');

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

            const newNews: Partial<NewsLeague> = {

                content: JSON.stringify({
                    title: values.title,
                    content: values.content,
                }),

            };

            let updatedNews: NewsLeague | null;

            if (isEdit) {
                updatedNews = await updateNewsLeague(leagueId, newsId!, newNews, accessToken!);
            } else {
                updatedNews = await createNewsLeague(leagueId, newNews, accessToken!);
            }

            if (!updatedNews) {
                throw new Error("Failed to save news.");
            }

            if (onSave) {
                onSave(updatedNews); // Call the onSave callback
            }

            toast({
                variant: "default",
                title: "Success",
                description: `News ${isEdit ? "updated" : "added"} successfully.`,
            })

        } catch (error: any) {

            setServerError(error.message || "An error occurred. Please try again.");

            toast({
                variant: "destructive",
                title: "Error",
                description: `News could not be ${isEdit ? "updated" : "added"}!`,
            })

        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 w-full">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>News Title</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Enter news title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>News Content</FormLabel>
                            <FormControl>
                                <Textarea className="w-full resize-none min-h-[100px]" maxLength={160} placeholder="Enter league description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className={`flex ` + (align ? `justify-${align}` : "justify-center")}>
                    <Button type="submit">
                        {loading ? "Saving..." : isEdit ? "Edit News" : "Add News"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default NewsLeagueForm;