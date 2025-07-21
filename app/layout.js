import "./globals.css";

export const metadata = {
  title: "Portofolio James Dev",
  description: "Website portofolio by James Dev/@Jamaludin21",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
