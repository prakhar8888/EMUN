import "./globals.css";

import { AuthProvider } from "../context/AuthContext";
import ConditionalChrome from "../components/layout/ConditionalChrome";

export const metadata = {
  title: "Enigma MUN Global Summit",
  description:
    "A premium Model United Nations platform for diplomacy, leadership, debate, and global collaboration.",
  keywords: [
    "MUN",
    "Model United Nations",
    "Diplomacy",
    "International Relations",
    "Global Summit",
    "Youth Leadership",
  ],
  authors: [{ name: "Enigma MUN" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-[#0A192F] text-[#E5E7EB] overflow-x-hidden antialiased">
        <AuthProvider>
          <ConditionalChrome>{children}</ConditionalChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
