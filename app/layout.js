import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title:
    "Jamaludin Hakim Harsoyo | Fullstack Web Developer & Software Engineer",
  description:
    "Portfolio of Jamaludin Hakim, a fullstack web developer and software engineer specializing in scalable web applications, modern JavaScript frameworks, and intuitive user experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
