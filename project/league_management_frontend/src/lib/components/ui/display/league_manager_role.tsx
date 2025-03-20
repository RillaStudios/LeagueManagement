'use client';

import { useUserData } from "@/lib/hooks/useUserData";
import { League } from "@/lib/types/league/league";
import { Button } from "../../shadcn/button";
import Row from "../../layout/row";
import { usePathname } from 'next/navigation';
import Link from "next/link";

interface LeagueManagerRowProps {
    league: League;
}

const LeagueManagerRow: React.FC<LeagueManagerRowProps> = ({ league }) => {

    const { user } = useUserData();
    const pathname = usePathname();

    if (!user || user.id !== league.createdBy) {
        return null;
    }

    const getButtonContext = () => {
        switch (pathname) {
            case `/leagues/${league.id}`:
                return {
                    href: `/leagues/${league.id}/edit`,
                    text: 'Edit League',
                };
            default:
                return {
                    href: `/leagues/${league.id}`,
                    text: 'View League',
                };
        }
    };

    return (
        <Row mainAxisAlign="end" expanded>
            <Link href={getButtonContext()['href']} passHref>
                <Button className="m-4">{getButtonContext()['text']}</Button>
            </Link>
        </Row>
    );
}

export default LeagueManagerRow;