import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Demo2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
