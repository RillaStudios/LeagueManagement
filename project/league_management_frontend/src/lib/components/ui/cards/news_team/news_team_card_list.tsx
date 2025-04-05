'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { TeamNews } from "@/lib/types/league/team_news";
import { deleteNewsTeam, getAllTeamNews } from "@/lib/service/league/news_team_service";
import { getTeamById } from "@/lib/service/league/team_service";
import AddEditNewsTeamDialog from "../../dialogs/league/news_team/add_news_team";
import { NewsTeamCard } from "./news_team_card";

interface NewsTeamCardListProps {
    teamId: number;
}

/* 
A list of news league cards for a given league. It fetches the 
news leagues from the server and displays them in a list.

@Author: IFD
@Date: 2025-03-22
*/
const NewsTeamCardList: React.FC<NewsTeamCardListProps> = ({ teamId }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [news, setNews] = useState<TeamNews[]>([]);
    const [activeNewsId, setActiveNewsId] = useState<number | null>(null);
    const { accessToken } = useAuth();
    const [leagueId, setLeagueId] = useState<number>(0);
    // Add loading state
    const [isLoading, setIsLoading] = useState<boolean>(true);


    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    /* 
    A function to fetch news leagues from the server.

    @Author: IFD
    @Date: 2025-03-22
    */
    const fetchNews = async () => {
        setIsLoading(true);
        try {
            const team = await getTeamById(teamId);

            if (!team) {
                throw new Error("Team not found");
            }

            setLeagueId(team.leagueId);

            const response = await getAllTeamNews(team.leagueId, teamId);

            if (Array.isArray(response)) {
                setNews(response);
            } else {
                setNews([]);
            }

        } catch (error: any) {
            toast({
                title: "Error",
                description: `Failed to fetch news: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });
            setNews([]);
        } finally {
            setIsLoading(false);
        }
    };

    /* 
    A useEffect hook to fetch news leagues when the
    component mounts or when the leagueId changes.

    @Author: IFD
    @Date: 2025-03-22
    */
    useEffect(() => {
        fetchNews();
    }, [teamId]);

    /* 
    A function to handle the edit action for a news item.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleEdit = (newsId: number) => {
        setActiveNewsId(newsId);
        openDialog("editNewsTeam");
    };

    /* 
    A function to handle the delete action for a news item.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleDelete = (newsId: number) => {

        const newsItem = news.find((newsRes) => newsRes.teamNewsId === newsId);

        if (newsItem) {

            deleteNewsTeam(leagueId, teamId, newsId, accessToken!).then(() => {
                setNews(news.filter((newsRes) => newsRes.teamNewsId !== newsId));

                toast({
                    title: "Success",
                    description: `News deleted successfully.`,
                    variant: "default",
                    duration: 2000,
                });

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

    /* 
    A function to handle the update action for a news item.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleUpdate = (updatedNews: TeamNews) => {
        setNews((prevNews) => {
            const newsExists = prevNews.some((news) => news.teamNewsId === updatedNews.teamNewsId);
            if (newsExists) {
                return prevNews.map((newsRes) =>
                    newsRes.teamNewsId === updatedNews.teamNewsId ? updatedNews : newsRes
                );
            } else {
                return [...prevNews, updatedNews];
            }
        });

        // Close dialogs based on which one is open
        if (dialogState['editNewsTeam']) {
            closeDialog('editNewsTeam');
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
                <AddEditNewsTeamDialog
                    teamId={teamId}
                    isEdit={false}
                    onSave={handleUpdate}
                    onClose={() => setIsAddDialogOpen(false)} // Add this prop
                />
            )}

            {isLoading ? (
                <BodySmall text="Loading news..." />
            ) : news.length === 0 ? (
                <BodySmall text="No news found." />
            ) : (
                news.map((newsItem: TeamNews) => (
                    <React.Fragment key={newsItem.teamNewsId}>
                        <NewsTeamCard
                            news={newsItem}
                            onDelete={() => handleDelete(newsItem.teamNewsId)}
                            onEdit={() => handleEdit(newsItem.teamNewsId)}
                        />
                        {dialogState['editNewsTeam'] && activeNewsId === newsItem.teamNewsId && (
                            <AddEditNewsTeamDialog
                                teamId={teamId}
                                newsId={newsItem.teamNewsId}
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

export default NewsTeamCardList;