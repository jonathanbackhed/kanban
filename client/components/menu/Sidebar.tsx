import { House, LogIn, User } from "lucide-react";
import React from "react";
import SidebarButton from "./SidebarButton";
import BoardItem from "./BoardListItem";

export default function Sidebar() {
  return (
    <div className="p-4 w-60 border-t border-t-gray-100 flex flex-col justify-between">
      <div>
        <div className="space-y-2 mb-10">
          <SidebarButton title="Home" icon={<House size={18} className="mr-1" />} />
          {/* <SidebarButton title="Profile" icon={<User size={18} className="mr-1" />} /> */}
        </div>

        <div>
          <h4 className="font-bold border-b mb-1">Boards</h4>
          <ul>
            <BoardItem title="Demo project" active />
            <BoardItem title="House" />
            <BoardItem title="Movie app" />
          </ul>
        </div>
      </div>

      <div>{/* <SidebarButton title="Sign in" icon={<LogIn size={18} className="mr-1" />} /> */}</div>
    </div>
  );
}
