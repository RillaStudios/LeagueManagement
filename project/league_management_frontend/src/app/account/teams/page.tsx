import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { DisplayMedium } from "@/lib/components/layout/typography";
import { Separator } from "@/lib/components/shadcn/separator";
import PlayerCardList from "@/lib/components/ui/cards/player/player_card_list";
import TeamCardList from "@/lib/components/ui/cards/team/team_card_list";
import AddLeagueDisplay from "@/lib/components/ui/dialogs/league/add_league_form";
import { PlayerView } from "@/lib/components/ui/display/player_view";
import TeamList from "@/lib/components/ui/display/team_list";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";

export default async function AccountTeamsPage() {

    return (
        <Page
            header={<Header />}
            footer={<Footer />}
        >
            <Container
                padding="p-3 md:p-5 lg:p-20"
                className="h-auto"
            >
                <RowColumn
                    expanded={true}>
                    <Column
                        width="full"
                        expanded>
                        <DisplayMedium
                            text={"My Teams"}
                        />
                        <Separator className="mt-4 mb-8 md:mt-8 w-full md:w-2/3" />
                        <TeamCardList useOwner={true} />
                    </Column>
                    <Column
                        width="full"
                        expanded>
                        <DisplayMedium
                            text={"My Players"}
                        />
                        <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                    </Column>
                </RowColumn>
            </Container>
        </Page >
    );
}