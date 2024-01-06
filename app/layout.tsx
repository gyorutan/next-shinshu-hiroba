import type { Metadata } from "next";
import "./globals.css";
import ToasterContext from "@/context/ToasterContext";

export const metadata: Metadata = {
  title: "대학교 광장",
  description: "대학교 종합 커뮤니티 사이트",
  icons : {
    icon : [ "image/png" , "/android-chrome-512x512.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
