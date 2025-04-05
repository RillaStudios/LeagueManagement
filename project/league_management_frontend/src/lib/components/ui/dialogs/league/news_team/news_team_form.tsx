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
import { Input } from "@/lib/components/shadcn/input";
import { Textarea } from "@/lib/components/shadcn/textarea";
import { useAuth } from "@/lib/hooks/useAuth";
import { TeamNews } from "@/lib/types/league/team_news";
import { createNewsTeam, getAllTeamNews, getTeamNewsById, updateNewsTeam } from "@/lib/service/league/news_team_service";
import { getTeamById } from "@/lib/service/league/team_service";

const formSchema = z.object({
    title: z.string(),
    content: z.string(),
});

interface NewsTeamProps {
    teamId: number;
    newsId?: number;
    isEdit?: boolean;
    align?: "left" | "center" | "right";
    onSave?: (updatedNews: TeamNews) => void;
}

/* 
A form component for adding or editing a news post in a team.

@Author: IFD
@Date: 2025-04-01
*/
const NewsTeamForm: React.FC<NewsTeamProps> = ({ teamId, isEdit, newsId, align, onSave }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [news, setNews] = useState<TeamNews[] | null>(null);
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

                const team = await getTeamById(teamId);

                if (!team) {
                    throw new Error("Team not found");
                }

                const news = await getAllTeamNews(team.leagueId, teamId);

                setNews(news);

                if (isEdit) {

                    const newNews = await getTeamNewsById(team.leagueId, teamId, newsId!);

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

            const team = await getTeamById(teamId);

            if (!team) {
                throw new Error("Team not found");
            }

            const newNews: Partial<TeamNews> = {

                content: JSON.stringify({
                    title: values.title,
                    content: values.content,
                }),

            };

            let updatedNews: TeamNews | null;

            if (isEdit) {
                updatedNews = await updateNewsTeam(team.leagueId, teamId, newsId!, newNews, accessToken!);
            } else {
                updatedNews = await createNewsTeam(team.leagueId, teamId, newNews, accessToken!);
            }

            if (!updatedNews) {
                throw new Error("Failed to save news");
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

export default NewsTeamForm;