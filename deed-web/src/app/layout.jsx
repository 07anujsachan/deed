import "../styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "./components/ReduxProvider";
export const metadata = {
  title: "Deed",
  description: "Mentorship platform",
  icons: {
    icon: "/media/logo.png",
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
