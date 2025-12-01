import React from "react";

interface Props {
  title: string;
  active?: boolean;
}

export default function BoardListItem({ title, active }: Props) {
  return (
    <li>
      <button
        className={
          "w-full rounded-lg px-2 py-1 text-start hover:cursor-pointer hover:bg-black/10 " + (active && "font-bold")
        }
      >
        {title}
      </button>
    </li>
  );
}
