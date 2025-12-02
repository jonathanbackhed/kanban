import { House, Plus } from "lucide-react";
import SidebarNavButton from "./SidebarNavButton";
import BoardItem from "../board/BoardListItem";

export default function Sidebar() {
  return (
    <div className="flex w-60 flex-col justify-between border-t border-t-neutral-300 p-4">
      <div>
        <div className="mb-10 space-y-2">
          <SidebarNavButton url="/" title="Home" icon={<House size={18} className="mr-1" />} />
        </div>

        <div>
          <h4 className="mb-1 border-b font-bold">Boards</h4>
          <ul>
            <BoardItem title="Default project" url="/board" />
            <li className="mt-1">
              <button className="flex w-full items-center justify-center rounded-lg px-2 py-1 text-sm hover:cursor-pointer">
                <Plus size={18} className="mr-1" />
                Add new board
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
