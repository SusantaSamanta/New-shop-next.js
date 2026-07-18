import Header from "../_components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />

      <main>{children}</main>

      {/* <MobileBottomNav /> */}
    </div>
  );
}