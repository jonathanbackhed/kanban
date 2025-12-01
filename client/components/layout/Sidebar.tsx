import { House, LogIn, User } from "lucide-react";
import React from "react";
import SidebarButton from "./SidebarButton";
import BoardItem from "../board/BoardListItem";

export default function Sidebar() {
  return (
    <div className="flex w-60 flex-col justify-between border-t border-t-gray-100 p-4">
      <div>
        <div className="mb-10 space-y-2">
          <SidebarButton title="Home" icon={<House size={18} className="mr-1" />} />
          {/* <SidebarButton title="Profile" icon={<User size={18} className="mr-1" />} /> */}
        </div>

        <div>
          <h4 className="mb-1 border-b font-bold">Boards</h4>
          <ul>
            <BoardItem title="Demo project" active />
            <BoardItem title="House" />
            <BoardItem title="Movie app" />
          </ul>
        </div>
      </div>

      <div>
        <SidebarButton title="Sign in" icon={<LogIn size={18} className="mr-1" />} />
      </div>
    </div>
  );
}
