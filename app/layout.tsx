import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";

export const metadata = {
  title: "Elternheld MVP",
  description: "Eine Anwendung, die Eltern unterstützt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}