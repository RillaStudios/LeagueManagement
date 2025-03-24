import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { BodySmall, DisplayLarge, DisplayMedium, HeadlineMedium } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { Separator } from "@/lib/components/shadcn/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/shadcn/tabs";
import ConferenceCardList from "@/lib/components/ui/cards/conference/conference_card_list";
import DivisionCardList from "@/lib/components/ui/cards/division/division_card_list";
import SeasonCardList from "@/lib/components/ui/cards/season/season_card_list";
import TeamCardList from "@/lib/components/ui/cards/team/team_card_list";
import SeasonForm from "@/lib/components/ui/dialogs/league/season/season_form";
import AddLeagueDisplay from "@/lib/components/ui/display/add_league_display";
import LeagueActionRow from "@/lib/components/ui/display/league_displays/league_actions_row";
import LeagueManagerRow from "@/lib/components/ui/display/league_manager_role";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import { getConferences } from "@/lib/service/league/conference_service";
import { getDivisions } from "@/lib/service/league/division_service";
import { getLeague } from "@/lib/service/league/league_service";
import { getSeasons } from "@/lib/service/league/season_service";
import { getTeams } from "@/lib/service/league/team_service";
import Link from "next/link";

export default async function LeagueEditPage({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;

    const league = await getLeague(id);

    const conferences = await getConferences(id);

    const divisions = await getDivisions(id);

    const teams = await getTeams(id);

    const seasons = await getSeasons(id);

    if (!league) {
        return (
            <Page header={<Header />} footer={<Footer />}>
                <div className="h-[calc(100vh-8rem)]">
                    <Column
                        mainAxisAlign="center"
                        crossAxisAlign="center"
                        gap="4"
                        expanded
                    >
                        <HeadlineMedium text="League not found." />
                        <Link href="/" passHref><Button>Go Back</Button></Link>
                    </Column>
                </div>
            </Page>
        );
    }

    return (
        <Page header={<Header />} footer={<Footer />}>
            <Container height="h-full" padding="p-4 md:p-8">
                <LeagueManagerRow league={league} />
                <DisplayLarge text={league.name ? league.name : "N/A"} />
                <Separator className="my-8" />
                <Tabs defaultValue="league" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="league">League</TabsTrigger>
                        <TabsTrigger value="seasons">Seasons</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                    </TabsList>
                    {/* League Editor */}
                    <TabsContent value="league" className="mt-8">
                        <RowColumn expanded>
                            <Column
                                width="full"
                                expanded>
                                <DisplayMedium
                                    text={"Edit League"}
                                />
                                <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                                <AddLeagueDisplay isEdit leagueId={id} />
                            </Column>
                            <Column
                                width="full"
                                expanded
                            >
                                <DisplayMedium
                                    text={"Add Conferences, Divisions, and Teams"}
                                />
                                <Separator className="my-4 md:mt-8 w-full md:w-2/3" />
                                <Tabs defaultValue="conferences" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="conferences">Conferences</TabsTrigger>
                                        <TabsTrigger value="divisions">Divisions</TabsTrigger>
                                        <TabsTrigger value="teams">Teams</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="conferences">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Conferences" />
                                            {conferences.length > 0 ?
                                                <ConferenceCardList conferences={conferences} />
                                                : <BodySmall text="No conferences found." />}
                                        </Column>
                                    </TabsContent>
                                    <TabsContent value="divisions">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Divisions" />
                                            {divisions.length > 0 ?
                                                <DivisionCardList divisions={divisions} />
                                                : <BodySmall text="No divisions found." />}
                                        </Column>
                                    </TabsContent>
                                    <TabsContent value="teams">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Teams" />
                                            {teams.length > 0 ?
                                                <TeamCardList teams={teams} />
                                                : <BodySmall text="No teams found." />}
                                        </Column>
                                    </TabsContent>
                                </Tabs>
                            </Column>
                        </RowColumn>
                        <LeagueActionRow leagueId={id} />
                    </TabsContent>
                    {/* Season Editor */}
                    <TabsContent value="seasons" className="mt-8">
                        <RowColumn expanded>
                            <Column
                                width="full"
                                expanded>
                                <DisplayMedium
                                    text={"Create Season"}
                                />
                                <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                                <SeasonForm leagueId={id} align="left" />
                            </Column>
                            <Column
                                width="full"
                                expanded
                            >
                                <DisplayMedium
                                    text={"Edit Season(s)"}
                                />
                                <Separator className="my-4 md:mt-8 w-full md:w-2/3" />
                                <Column expanded gap="4">
                                    <HeadlineMedium text="Seasons" />
                                    {seasons.length > 0 ?
                                        <SeasonCardList seasons={seasons} />
                                        : <BodySmall text="No seasons found." />}
                                </Column>
                            </Column>
                        </RowColumn>
                    </TabsContent>
                    <TabsContent value="news" className="mt-8">
                        <RowColumn expanded>
                            <Column
                                width="full"
                                expanded>
                                <DisplayMedium
                                    text={"Create News Post"}
                                />
                                <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                                <AddLeagueDisplay isEdit leagueId={id} />
                            </Column>
                            <Column
                                width="full"
                                expanded
                            >
                                <DisplayMedium
                                    text={"Edit News Post(s)"}
                                />
                                <Separator className="my-4 md:mt-8 w-full md:w-2/3" />
                                <Tabs defaultValue="divisions" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="divisions">Divisions</TabsTrigger>
                                        <TabsTrigger value="conferences">Conferences</TabsTrigger>
                                        <TabsTrigger value="teams">Teams</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="divisions">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Divisions" />
                                            {divisions.length > 0 ?
                                                <DivisionCardList divisions={divisions} />
                                                : <BodySmall text="No divisions found." />}
                                        </Column>
                                    </TabsContent>
                                    <TabsContent value="conferences">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Conferences" />
                                            {conferences.length > 0 ?
                                                <ConferenceCardList conferences={conferences} />
                                                : <BodySmall text="No conferences found." />}
                                        </Column>
                                    </TabsContent>
                                    <TabsContent value="teams">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Teams" />
                                            {conferences.length > 0 ?
                                                <ConferenceCardList conferences={conferences} />
                                                : <BodySmall text="No conferences found." />}
                                        </Column>
                                    </TabsContent>
                                </Tabs>
                            </Column>
                        </RowColumn>
                    </TabsContent>
                </Tabs>
            </Container>
        </Page>
    );
}
