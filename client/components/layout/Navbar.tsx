import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 font-mono">
      <div className="flex items-center">
        <h1 className="mr-4 flex items-start text-2xl">
          Kanban board<p className="text-xs">free</p>
        </h1>
        <div className="space-x-4">
          <Link className="hover:underline" href={"/#"}>
            Pricing
          </Link>
          <Link className="hover:underline" href={"/#"}>
            ToS
          </Link>
          <Link className="hover:underline" href={"/#"}>
            Contact
          </Link>
        </div>
      </div>
      <button className="hover:cursor-pointer hover:underline">Sign in</button>
    </div>
  );
}
