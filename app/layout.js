import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Download facebook Instagram Youtube and Pintrest Videos",
  description: "this is a next app to download the Instagram videos Youtubes videos facebook videos and pintrest video",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-[100dvh] bg-gradient-to-b from-gray-700 to-gray-700 via-gray-950 text-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}
