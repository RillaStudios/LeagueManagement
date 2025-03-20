import Page from "@/lib/components/layout/page";
import LeagueList from "@/lib/components/ui/display/league_list";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";

export default function LeaguesPage() {
    return (
        <Page
            header={<Header />}
            footer={<Footer />}
        >
            <h1>Leagues</h1>
            <LeagueList accountLeagues={false} />
        </Page>
    );
}