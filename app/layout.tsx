import "./globals.css";
import UserProvider from "@/app/context/user";
import AllOverlays from "@/app/components/AllOverlays";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TikTok Clone",
    description: "TikTok Clone",
}

export default function RootLayout({
    children,
}: { children: React.ReactNode })
{
    return (
        <html lang="zh">
            <UserProvider>
                <body>
                    <AllOverlays />
                    { children }
                </body>
            </UserProvider>
        </html>
    );
}
