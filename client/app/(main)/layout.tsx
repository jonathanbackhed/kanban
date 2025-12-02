import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex h-screen max-w-[2560px] flex-col font-sans">
      <Navbar />
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <div className="flex flex-1 overflow-auto bg-neutral-200">{children}</div>
      </div>
    </div>
  );
}
