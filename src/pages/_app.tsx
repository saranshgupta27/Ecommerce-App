import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Header from "~/components/Header";

import "~/styles/globals.css";
import { AuthProvider } from "~/utils/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
};

export default MyApp;
