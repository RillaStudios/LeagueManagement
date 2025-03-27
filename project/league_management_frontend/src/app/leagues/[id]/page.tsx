import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import Row from "@/lib/components/layout/row";
import RowColumn from "@/lib/components/layout/row_column";
import { HeadlineMedium } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import LeagueManagerRow from "@/lib/components/ui/buttons/league_button";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import { getLeague } from "@/lib/service/league/league_service";
import Link from "next/link";

export default async function LeaguePage({ params }: { params: Promise<{ id: number }> }) {

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
            <Container height="h-full">
                <Row expanded mainAxisAlign="end">
                    <LeagueManagerRow league={league} />
                </Row>
                <RowColumn>
                    <h1>{league.name}</h1>
                </RowColumn>
                <div>League: {league.name}</div>
            </Container>
        </Page>
    );
}
