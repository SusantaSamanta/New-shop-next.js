import Header from "@/app/_components/Header";
import MobileBottomNav from "@/app/_components/MobileBottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <MobileBottomNav />
    </>
  );
}