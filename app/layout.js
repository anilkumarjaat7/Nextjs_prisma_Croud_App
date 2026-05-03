import { SessionProvider } from "next-auth/react";
import { Providers } from "./Providers";
import "./globals.css";

export const metadata = {
  title: "Crowd App",
  description: "Create and manage your posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
