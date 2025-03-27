import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/components/providers/theme_provider"
import { AuthProvider } from "@/lib/components/providers/auth_provider";
import { DialogProvider } from "@/lib/components/providers/dialog_provider";
import { Toaster } from "@/lib/components/shadcn/toaster";

const poppins = Poppins({
  variable: "--font-popins",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | LMS',
    default: 'League Management System',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  authors: [{ name: "Izaak Ford-Dow" }],
  creator: "Izaak Ford-Dow",
  publisher: "Izaak Ford-Dow",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${nunito.variable} font-nunito antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DialogProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </DialogProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
