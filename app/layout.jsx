import "./globals.css";

export const metadata = {
  title: "Tirful",
  description: "Tirful – pushing his music in unexpected and exciting new directions."
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
