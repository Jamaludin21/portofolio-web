import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { TrafficLogger } from "@/hooks/useTrafficLogger";

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
        <TrafficLogger />
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
