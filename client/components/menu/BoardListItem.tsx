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
          "hover:bg-black/10 hover:cursor-pointer rounded-lg px-2 py-1 w-full text-start " + (active && "font-bold")
        }>
        {title}
      </button>
    </li>
  );
}
