import "./globals.css";
import { Open_Sans } from "next/font/google";

import Layout from "@/components/Layout/Layout";
import AllCtx from "@/ctxStore/allCtx";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Neemrana Management",
  description: "Welcome to Neemrana management. Have a nice day!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <AllCtx>
          <Layout>{children}</Layout>
        </AllCtx>
      </body>
    </html>
  );
}
