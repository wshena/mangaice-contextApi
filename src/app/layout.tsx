import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import { AppProvider } from "./provider/AppProvider";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mangaice",
  description: "Get best quality manga on Mangaice",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <main className="relative flex overflow-x-hidden">
            <Sidebar />
            <div className="w-full ">
              <Navbar />
              {children}
            </div>
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
