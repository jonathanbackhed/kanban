import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  icon?: React.ReactElement;
  url: string;
}

export default function SidebarNavButton({ title, icon, url }: Props) {
  return (
    <Link
      href={url}
      className="flex w-full items-center justify-center rounded-lg bg-neutral-200 px-4 py-2 font-bold hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300"
    >
      {icon}
      {title}
    </Link>
  );
}
