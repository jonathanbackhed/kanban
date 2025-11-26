import Board from "@/components/Board";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/menu/Sidebar";

export default function Home() {
  return (
    <div className="h-screen max-w-[2560px] bg-green-200 flex flex-col mx-auto font-sans">
      <Navbar />
      <div className="flex flex-row flex-1">
        <Sidebar />
        <div className="flex flex-1 overflow-auto">
          <Board />
        </div>
      </div>
    </div>
  );
}
