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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/components/shadcn/select";
import { toast } from "@/hooks/use-toast";
import { getTeams, getTeamsBySeason } from "@/lib/service/league/team_service";
import { Team } from "@/lib/types/league/team";
import { createGame, getGame, updateGame } from "@/lib/service/league/game_service";
import { Game } from "@/lib/types/league/game";
import { Venue } from "@/lib/types/league/venue";
import { getVenues } from "@/lib/service/league/venue_service";
import { DateTimePicker } from "@/lib/components/shadcn/date-time-picker";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
    homeTeam: z.string(),
    awayTeam: z.string(),
    venue: z.string(),
    date: z.date(),
}).refine(data => data.homeTeam !== data.awayTeam, {
    message: "Home team and away team cannot be the same",
    path: ["awayTeam"], // This targets the error at the away team field
});

interface GameFormProps {
    leagueId: number;
    seasonId?: number;
    gameId?: number;
    isEdit?: boolean;
    onSave?: (updatedGame: Game) => void;
}

/* 
A form component for adding or editing a game in a league.

@Author: IFD
@Date: 2025-04-01
*/
const GameForm: React.FC<GameFormProps> = ({ leagueId, isEdit, gameId, seasonId, onSave }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [teams, setTeams] = useState<Team[] | null>(null);
    const [venues, setVenues] = useState<Venue[] | null>(null);
    const { loading, setLoading } = useLoading();
    const { accessToken } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            homeTeam: "",
            awayTeam: "",
            venue: "",
            date: new Date(),
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const teams = await getTeamsBySeason(leagueId, seasonId!);

                const venues = await getVenues(leagueId);

                setVenues(venues);

                setTeams(teams);

                if (isEdit) {

                    const newGame = await getGame(leagueId, seasonId!, gameId!);

                    if (!newGame) {
                        throw new Error("Game not found");
                    }

                    form.setValue('homeTeam', newGame.homeTeamId.toString() || '');
                    form.setValue('awayTeam', newGame.awayTeamId.toString() || '');
                    form.setValue('venue', newGame.venueId.toString() || '');
                    form.setValue('date', new Date(newGame.gameDate));

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

            const newGame: Partial<Game> = {

                homeTeamId: parseInt(values.homeTeam),
                awayTeamId: parseInt(values.awayTeam),
                venueId: parseInt(values.venue),
                gameDate: values.date.toISOString(),

            };

            let updatedGame: Game | null;

            if (isEdit) {
                updatedGame = await updateGame(leagueId, seasonId!, gameId!, newGame, accessToken!);
            } else {
                updatedGame = await createGame(leagueId, seasonId!, newGame, accessToken!);
            }

            if (!updatedGame) {
                throw new Error("Game not found or could not be created");
            }

            if (onSave) {
                onSave(updatedGame); // Call the onSave callback
            }

            toast({
                variant: "default",
                title: "Success",
                description: `Game ${isEdit ? "updated" : "added"} successfully.`,
            })

        } catch (error: any) {

            setServerError(error.message || "An error occurred. Please try again.");

            toast({
                variant: "destructive",
                title: "Error",
                description: `Game could not be ${isEdit ? "updated" : "added"}!`,
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
                    name="homeTeam"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Home Team</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign home team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams?.map((team) => (
                                            <SelectItem
                                                key={team.teamId}
                                                value={team.teamId.toString()}
                                                disabled={team.teamId.toString() === form.watch('awayTeam')}
                                            >
                                                {team.teamName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="awayTeam"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Away Team</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign away team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams?.map((team) => (
                                            <SelectItem
                                                key={team.teamId}
                                                value={team.teamId.toString()}
                                                disabled={team.teamId.toString() === form.watch('homeTeam')}
                                            >
                                                {team.teamName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Venue</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign game venue" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {venues?.map((venue) => (
                                            <SelectItem key={venue.venueId} value={venue.venueId.toString()}>
                                                {venue.address}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Game Date & Time</FormLabel>
                            <FormControl>
                                <div>
                                    <DateTimePicker value={field.value} onChange={field.onChange} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Saving..." : isEdit ? "Edit Game" : "Add Game"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default GameForm;