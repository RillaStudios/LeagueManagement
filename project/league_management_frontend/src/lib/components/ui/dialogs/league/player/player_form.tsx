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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/components/shadcn/select";
import { getAllUserTeams, getTeams } from "@/lib/service/league/team_service";
import { Team } from "@/lib/types/league/team";
import { toast } from "@/hooks/use-toast";
import { createPlayer, getPlayer, updatePlayer } from "@/lib/service/league/player_service";
import { Player } from "@/lib/types/league/player";
import { DatePicker } from "@/lib/components/shadcn/input_date";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUserData } from "@/lib/hooks/useUserData";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Player name is required.",
    }),
    weight: z.string().min(1, {
        message: "Weight is required.",
    }),
    height: z.string().min(1, {
        message: "Height is required.",
    }),
    skillLevel: z.string().min(1, {
        message: "Skill level is required.",
    }),
    dob: z.date(),
    teamId: z.string().min(1, {
        message: "Team is required.",
    }),
});

interface TeamFormProps {
    leagueId: number;
    playerId?: number;
    isEdit?: boolean;
    onSave?: (updatedPlayer: Player) => void;
    coachEdit?: boolean;
}

/* 
A form component for adding or editing a player in a league. It uses react-hook-form for form handling and zod for validation.

@Author: IFD
@Date: 2025-04-01
*/
const PlayerForm: React.FC<TeamFormProps> = ({ leagueId, isEdit, playerId, onSave, coachEdit }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [teams, setTeams] = useState<Team[] | null>(null);
    const { loading, setLoading } = useLoading();
    const { accessToken } = useAuth(); // Get the access token from the auth context
    const { user } = useUserData(); // Get the user data from the user context

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            weight: "",
            height: "",
            skillLevel: "",
            dob: new Date(),
            teamId: "",
        },
    });

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);

                if (user && coachEdit) {
                    await getAllUserTeams(accessToken!).then((response) => {
                        setTeams(response);

                        if (leagueId) {
                            leagueId = response[0].leagueId;
                        }
                    }).catch((error) => {
                        toast({
                            title: "Error",
                            description: `Failed to fetch teams: ${error.message}`,
                            variant: "destructive",
                            duration: 2000,
                        });
                    });
                } else {
                    if (leagueId) {
                        await getTeams(leagueId!).then((response) => {
                            setTeams(response);
                        }).catch((error) => {
                            toast({
                                title: "Error",
                                description: `Failed to fetch teams: ${error.message}`,
                                variant: "destructive",
                                duration: 2000,
                            });
                        });
                    }
                }
            } catch (error) {
                setServerError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [user, coachEdit, leagueId, accessToken]);

    // Separate useEffect for loading player data after teams are loaded
    useEffect(() => {
        const fetchPlayerData = async () => {
            if (isEdit && playerId && teams) {
                try {
                    setLoading(true);
                    const newPlayer = await getPlayer(leagueId, playerId);

                    if (newPlayer) {
                        const team = teams.find((team) => team.teamId === newPlayer.teamId);
                        const teamName = team?.teamName || "N/A";

                        form.setValue('name', newPlayer.name || '');
                        form.setValue('weight', newPlayer.weight.toString() || '');
                        form.setValue('height', newPlayer.height.toString() || '');
                        form.setValue('skillLevel', newPlayer.skillLevel || '');
                        form.setValue('dob', newPlayer.dob || new Date());
                        form.setValue('teamId', team ? team.teamId.toString() : '');
                    }
                } catch (error) {
                    setServerError(error instanceof Error ? error.message : 'An error occurred');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPlayerData();
    }, [isEdit, playerId, teams, leagueId, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const newPlayer: Partial<Player> = {
                playerId: playerId,
                name: values.name,
                weight: parseInt(values.weight),
                height: parseInt(values.height),
                skillLevel: values.skillLevel,
                dob: values.dob,
                teamId: parseInt(values.teamId),
            };

            let updatedPlayer: Player;

            if (isEdit && playerId) {
                // Update the team if editing
                const result = await updatePlayer(leagueId, playerId, newPlayer, accessToken!);
                if (!result) throw new Error("Failed to update player");
                updatedPlayer = result;

            } else {
                // Create a new team if not editing
                // Use the team's ID from the form field, which is already a string ID
                newPlayer.teamId = parseInt(values.teamId);

                const team = teams?.find((team) => team.teamId === newPlayer.teamId);

                if (!team) throw new Error("Team not found");

                if (!team.leagueId) throw new Error("League ID not found for the team");

                const result = await createPlayer(team?.leagueId, newPlayer, accessToken!);
                if (!result) throw new Error("Failed to create player");
                updatedPlayer = result;
            }

            if (onSave) {
                onSave(updatedPlayer);
            }

            toast({
                variant: "default",
                title: "Success",
                description: `Player ${isEdit ? "updated" : "added"} successfully.`,
            });
        } catch (error: any) {
            setServerError(error.message || "An error occurred. Please try again.");

            toast({
                variant: "destructive",
                title: "Error",
                description: `Player could not be ${isEdit ? "updated" : "added"}!`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Player Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter team name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Player Weight</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter player weight" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Player Height</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter player height" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="skillLevel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Player Skill Level</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter player skill level" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Player DOB</FormLabel>
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
                    name="teamId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assign Team</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign player to team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams?.map((team) => (
                                            <SelectItem key={team.teamId} value={team.teamId.toString()}>
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
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Saving..." : isEdit ? "Edit Player" : "Add Player"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PlayerForm;