'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { NewsLeagueCard } from "./news_league_card";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { NewsLeague } from "@/lib/types/league/news_league";
import { deleteNewsLeague, getNewsLeagues } from "@/lib/service/league/news_league_service";
import AddEditNewsLeagueDialog from "../../dialogs/league/news_league/add_news_league";

interface NewsLeagueCardListProps {
    leagueId: number;
}

const NewsLeagueCardList: React.FC<NewsLeagueCardListProps> = ({ leagueId }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [news, setNews] = useState<NewsLeague[]>([]);
    const [activeNewsId, setActiveNewsId] = useState<number | null>(null);

    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const fetchNews = async () => {
        try {
            const response = await getNewsLeagues(leagueId);
            setNews(response);
        } catch (error: any) {
            toast({
                title: "Error",
                description: `Failed to fetch news: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        fetchNews();
    }, [leagueId]);

    const handleEdit = (newsId: number) => {
        setActiveNewsId(newsId);
        openDialog("editNewsLeague");
    };

    const handleDelete = (newsId: number) => {

        const newsItem = news.find((newsRes) => newsRes.leagueNewsId === newsId);

        if (newsItem) {
            deleteNewsLeague(leagueId, newsId).then(() => {
                setNews(news.filter((newsRes) => newsRes.leagueNewsId !== newsId));
            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete news.`,
                    variant: "destructive",
                    duration: 2000,
                });
            },
            );
        }

    };

    const handleUpdate = (updatedNews: NewsLeague) => {
        setNews((prevNews) => {
            const newsExists = prevNews.some((news) => news.leagueNewsId === updatedNews.leagueNewsId);
            if (newsExists) {
                return prevNews.map((newsRes) =>
                    newsRes.leagueNewsId === updatedNews.leagueNewsId ? updatedNews : newsRes
                );
            } else {
                return [...prevNews, updatedNews];
            }
        });

        // Close dialogs based on which one is open
        if (dialogState['editNewsLeague']) {
            closeDialog('editNewsLeague');
        }
        // Use local state for add dialog
        if (isAddDialogOpen) {
            setIsAddDialogOpen(false);
        }
    };

    return (
        <>
            <Button onClick={() => setIsAddDialogOpen(true)} className="my-4">
                Add News
            </Button>

            {isAddDialogOpen && (
                <AddEditNewsLeagueDialog
                    leagueId={leagueId}
                    isEdit={false}
                    onSave={handleUpdate}
                    onClose={() => setIsAddDialogOpen(false)} // Add this prop
                />
            )}

            {news.length === 0 ? (
                <BodySmall text="No news found." />
            ) : (
                news.map((newsItem: NewsLeague) => (
                    <React.Fragment key={newsItem.leagueNewsId}>
                        <NewsLeagueCard
                            news={newsItem}
                            onDelete={() => handleDelete(newsItem.leagueNewsId)}
                            onEdit={() => handleEdit(newsItem.leagueNewsId)}
                        />
                        {dialogState['editNewsLeague'] && activeNewsId === newsItem.leagueNewsId && (
                            <AddEditNewsLeagueDialog
                                leagueId={leagueId}
                                newsId={newsItem.leagueNewsId}
                                isEdit={true}
                                onSave={handleUpdate}
                            />
                        )}
                    </React.Fragment>
                ))
            )}
        </>
    );
}

export default NewsLeagueCardList;