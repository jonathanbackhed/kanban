import React from "react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 font-mono">
      <h1 className="text-2xl">Kanban board</h1>
      <button className="hover:cursor-pointer hover:underline">Sign in</button>
    </div>
  );
}
