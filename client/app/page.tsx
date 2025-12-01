import Board from "@/components/board/Board";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="mx-auto flex h-screen max-w-[2560px] flex-col bg-green-200 font-sans">
      <Navbar />
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <div className="flex flex-1 overflow-auto">
          <Board />
        </div>
      </div>
    </div>
  );
}
