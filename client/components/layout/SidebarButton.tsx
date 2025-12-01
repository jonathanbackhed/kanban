import { House } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  icon?: React.ReactElement;
}

export default function SidebarButton({ title, icon }: Props) {
  return (
    <button className="px-4 py-2 bg-gray-100 rounded-2xl w-full font-bold flex justify-center items-center hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300">
      {icon}
      {title}
    </button>
  );
}
