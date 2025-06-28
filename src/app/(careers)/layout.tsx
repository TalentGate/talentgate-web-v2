import Footer from "./_components/footer/footer";
import Navbar from "./_components/nav/navbar";

export default function CareersRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
