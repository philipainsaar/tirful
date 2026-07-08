import "./globals.css";

export const metadata = {
  title: "Tirful",
  description: "Tirful DOS terminal music player with a Three.js neon background."
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
