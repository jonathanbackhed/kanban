import React from "react";

export default function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center font-mono">
      <h1 className="text-2xl">Kanban board</h1>
      <button className="hover:underline hover:cursor-pointer">Sign in</button>
    </div>
  );
}
