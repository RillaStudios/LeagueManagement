import Column from "@/lib/components/layout/column";
import Page from "@/lib/components/layout/page";
import { DisplayLarge, DisplaySmall, HeadlineLarge } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { Card } from "@/lib/components/shadcn/card";
import { Separator } from "@/lib/components/shadcn/separator";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import Link from "next/link";

/* 
A simple home page for the League Management System.

@Author: IFD
@Date: 2025-02-20
*/
export default function Home() {
  return (
    <Page
      header={<Header />} // Empty header
      footer={<Footer />} // Empty footer
      children={
        <div className="h-[820px] flex items-center justify-center">
          <Column expanded crossAxisAlign="center" mainAxisAlign="center">
            <Card className="flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-primary to-secondary p-8">
              <DisplayLarge text="Welcome to the League Management System" className="text-center text-4xl font-bold text-primary-foreground" />
              <DisplaySmall text="Manage your leagues, teams, and players with ease." className="text-center text-2xl font-semibold text-secondary-foreground" />
              <Separator className="my-4" />
              <HeadlineLarge text="Version 1.0" className="text-center text-3xl font-bold text-primary-foreground" />
            </Card>
            <Link href="/leagues" className="mt-8">
              <Button variant={"outline"}>
                View All Leagues
              </Button>
            </Link>
          </Column>
        </div>
      }
    />
  );
}
