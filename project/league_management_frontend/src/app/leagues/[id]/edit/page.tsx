import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { DisplayLarge, DisplayMedium, HeadlineMedium } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { Separator } from "@/lib/components/shadcn/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/shadcn/tabs";
import ConferenceCardList from "@/lib/components/ui/cards/conference/conference_card_list";
import DivisionCardList from "@/lib/components/ui/cards/division/division_card_list";
import SeasonCardList from "@/lib/components/ui/cards/season/season_card_list";
import TeamCardList from "@/lib/components/ui/cards/team/team_card_list";
import SeasonForm from "@/lib/components/ui/dialogs/league/season/season_form";
import AddLeagueDisplay from "@/lib/components/ui/dialogs/league/add_league_form";
import LeagueManagerRow from "@/lib/components/ui/buttons/league_button";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import { getLeague } from "@/lib/service/league/league_service";
import Link from "next/link";
import Row from "@/lib/components/layout/row";
import VenueCardList from "@/lib/components/ui/cards/venues/venue_card_list";
import VenueForm from "@/lib/components/ui/dialogs/league/venue/venue_form";
import StatDisplay from "@/lib/components/ui/display/stat_display";
import GameCardList from "@/lib/components/ui/cards/game/game_card_list";
import NewsLeagueCardList from "@/lib/components/ui/cards/news_league/news_league_card_list";
import PlayerCardList from "@/lib/components/ui/cards/player/player_card_list";

export default async function LeagueEditPage({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;

    const league = await getLeague(id);

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
                <Row expanded mainAxisAlign="end">
                    <LeagueManagerRow league={league} />
                </Row>
                <DisplayLarge text={league.name ? league.name : "N/A"} />
                <Separator className="my-8" />
                <Tabs defaultValue="league" className="w-full">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="league">League</TabsTrigger>
                        <TabsTrigger value="seasons">Seasons</TabsTrigger>
                        <TabsTrigger value="games">Games</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                        <TabsTrigger value="venues">Venues</TabsTrigger>
                        <TabsTrigger value="players">Players</TabsTrigger>
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
                                            <ConferenceCardList leagueId={league.id} />
                                        </Column>
                                    </TabsContent>
                                    <TabsContent value="divisions">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Divisions" />
                                            <DivisionCardList leagueId={league.id} />
                                        </Column>
                                    </TabsContent>
                                    <TabsContent value="teams">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Teams" />
                                            <TeamCardList leagueId={league.id} />
                                        </Column>
                                    </TabsContent>
                                </Tabs>
                            </Column>
                        </RowColumn>
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
                                <Tabs defaultValue="seasons" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="seasons">Seasons</TabsTrigger>
                                        <TabsTrigger value="stats">Stats</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="seasons">
                                        <Column expanded gap="4" width="full">
                                            <HeadlineMedium text="Seasons" />
                                            <SeasonCardList leagueId={league.id} />
                                        </Column>
                                    </TabsContent>
                                    <TabsContent value="stats">
                                        <Column expanded gap="4">
                                            <HeadlineMedium text="Stats" />
                                            <StatDisplay leagueId={id} />
                                        </Column>
                                    </TabsContent>
                                </Tabs>
                            </Column>
                        </RowColumn>
                    </TabsContent>
                    {/* Games Editor */}
                    <TabsContent value="games" className="mt-8">
                        <RowColumn expanded>
                            <Column
                                width="full"
                                expanded
                            >
                                <DisplayMedium
                                    text={"Games Manager"}
                                />
                                <Separator className="my-4 md:mt-8 w-full md:w-2/3" />
                                <Column expanded gap="4" width="full">
                                    <HeadlineMedium text="Seasons" />
                                    <GameCardList leagueId={league.id} />
                                </Column>
                            </Column>
                        </RowColumn>
                    </TabsContent>
                    {/* News Editor */}
                    <TabsContent value="news" className="mt-8">
                        <RowColumn expanded>
                            <Column
                                width="full"
                                expanded>
                                <DisplayMedium
                                    text={"News Post(s)"}
                                />
                                <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                                <NewsLeagueCardList leagueId={id} />
                            </Column>
                        </RowColumn>
                    </TabsContent>
                    {/* Venue Editor */}
                    <TabsContent value="venues" className="mt-8">
                        <RowColumn expanded>
                            <Column
                                width="full"
                                expanded>
                                <DisplayMedium
                                    text={"Create Venue"}
                                />
                                <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                                <div className="w-1/3">
                                    <VenueForm leagueId={league.id} align="left" />
                                </div>
                            </Column>
                            <Column
                                width="full"
                                expanded
                            >
                                <DisplayMedium
                                    text={"Edit Venue(s)"}
                                />
                                <Separator className="my-4 md:mt-8 w-full md:w-2/3" />
                                <Column expanded gap="4 w-full">
                                    <HeadlineMedium text="Venues" />
                                    <VenueCardList leagueId={league.id} />
                                </Column>
                            </Column>
                        </RowColumn>
                    </TabsContent>
                    {/* Players Editor */}
                    <TabsContent value="players" className="mt-8">
                        <Column
                            width="full"
                            expanded
                        >
                            <DisplayMedium
                                text={"Player Manager"}
                            />
                            <Separator className="my-4 md:mt-8 w-full" />
                            <Column expanded gap="4 w-full">
                                <HeadlineMedium text="Players" />
                                <PlayerCardList leagueId={league.id} />
                            </Column>
                        </Column>
                    </TabsContent>
                </Tabs>
            </Container>
        </Page>
    );
}
