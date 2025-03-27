'use client';

import { useUserData } from "@/lib/hooks/useUserData";
import { League } from "@/lib/types/league/league";
import { Button } from "../../shadcn/button";
import { usePathname } from 'next/navigation';
import Link from "next/link";

interface LeagueButtonProps {
    league: League;
    className?: string;
    variant?: 'default' | 'secondary' | 'outline';
}

const LeagueButton: React.FC<LeagueButtonProps> = ({ league, className, variant }) => {

    const { user } = useUserData();
    const pathname = usePathname();

    if (!user || user.id !== league.createdBy) {
        return null;
    }

    const getButtonContext = () => {
        switch (pathname) {
            case `/leagues`:
                return {
                    href: `/leagues/${league.id}/edit`,
                    text: 'Edit League',
                };
            case `/leagues/${league.id}`:
                return {
                    href: `/leagues/${league.id}/edit`,
                    text: 'Edit League',
                };
            case `/account/leagues`:
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
        !user ? null : (
            <Link href={getButtonContext().href} passHref>
                <Button className={className || 'm-4'} variant={variant || 'default'}>{getButtonContext().text}</Button>
            </Link>
        )
    );
}

export default LeagueButton;