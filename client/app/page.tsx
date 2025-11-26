import Board from "@/components/Board";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen max-w-[2560px] bg-green-200 flex flex-col mx-auto font-sans">
      <div className="flex flex-1 overflow-auto">
        <Board />
      </div>
    </div>
  );
}
