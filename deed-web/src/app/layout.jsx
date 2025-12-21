import "../styles/globals.css";
import ReduxProvider from "./components/ReduxProvider";
export const metadata = {
  title: "Deed",
  description: "Mentorship platform",
  icons: {
    icon: "/media/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`antialiased bg-gray-50`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
