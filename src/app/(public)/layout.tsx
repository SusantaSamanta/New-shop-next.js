import Header from "@/app/_components/Header";
import MobileBottomNav from "@/app/_components/MobileBottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />

      <main className="">{children}</main>

      <MobileBottomNav />
    </div>
  );
}