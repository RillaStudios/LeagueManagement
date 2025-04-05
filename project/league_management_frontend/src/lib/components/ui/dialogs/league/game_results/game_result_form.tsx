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
import { Team } from "@/lib/types/league/team";
import { GameStats } from "@/lib/types/league/game_stats";
import { updateGameStats } from "@/lib/service/league/game_stats_service";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
    homeTeamScore: z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), { message: "Expected a number" }),
    awayTeamScore: z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), { message: "Expected a number" }),
});

interface GameFormProps {
    leagueId: number;
    seasonId?: number;
    gameId?: number;
    homeTeam: Team;
    awayTeam: Team;
    gameStats: GameStats[];
    onSave?: (updatedGameStats: GameStats[]) => void;
}

/* 
A form component for updating game results.

@Author: IFD
@Date: 2025-04-01
*/
const GameResultForm: React.FC<GameFormProps> = ({ leagueId, gameId, seasonId, homeTeam, awayTeam, gameStats, onSave }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const { loading, setLoading } = useLoading();
    const { accessToken } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            homeTeamScore: 0,
            awayTeamScore: 0,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const homeTeamStats = gameStats.find((stat) => stat.teamId === homeTeam.teamId);
                const awayTeamStats = gameStats.find((stat) => stat.teamId === awayTeam.teamId);

                form.setValue('homeTeamScore', homeTeamStats?.pointsFor || 0);
                form.setValue('awayTeamScore', awayTeamStats?.pointsFor || 0);

            } catch (error) {

                setServerError(error instanceof Error ? error.message : 'An error occurred');

            } finally {

                setLoading(false);

            }
        };

        fetchData();
    }, [form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            setLoading(true);

            // Convert input values to numbers
            const homeTeamScore = Number(values.homeTeamScore);
            const awayTeamScore = Number(values.awayTeamScore);


            const newGameStats: Partial<GameStats>[] = [
                {
                    id: gameStats[0].id,
                    pointsFor: homeTeamScore,
                    pointsAgainst: awayTeamScore,
                },
                {
                    id: gameStats[1].id,
                    pointsFor: awayTeamScore,
                    pointsAgainst: homeTeamScore,
                },
            ];

            await updateGameStats(leagueId, seasonId!, gameId!, newGameStats, accessToken!);


            toast({
                variant: "default",
                title: "Success",
                description: `Game results updated successfully.`,
            })

            if (onSave) {
                onSave(newGameStats as GameStats[]);
            }

        } catch (error: any) {

            setServerError(error.message || "An error occurred. Please try again.");

            toast({
                variant: "destructive",
                title: "Error",
                description: `Game results could not be updated!`,
            })

        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <FormField
                    control={form.control}
                    name="homeTeamScore"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{homeTeam.teamName}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter score" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="awayTeamScore"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{awayTeam.teamName}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter score" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Saving..." : "Update Game Results"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default GameResultForm;