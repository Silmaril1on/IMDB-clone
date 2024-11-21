import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./navigation/Navigation";
import { StoreProvider } from "./store/StoreProvider";
import Footer from "./footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title:
    "IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows",
  description:
    "IMDb is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows. Get personalized recommendations, and learn where to watch across hundreds of streaming providers.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navigation />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
