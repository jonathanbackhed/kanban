import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  active?: boolean;
  url: string;
}

export default function BoardListItem({ title, active, url }: Props) {
  return (
    <li className="flex">
      <Link
        href={url}
        className={
          "w-full rounded-lg px-2 py-1 text-start hover:cursor-pointer hover:bg-black/10 " + (active && "font-bold")
        }
      >
        {title}
      </Link>
    </li>
  );
}
