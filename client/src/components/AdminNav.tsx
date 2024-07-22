import Link from "next/link";
import ButtonLogout from "./ButtonLogout";

export default async function AdminNav() {
  return (
    <main className="flex justify-between p-4 bg-slate-800 shadow-lg">
      <div className="flex items-center">
        <Link className="p-2 text-white" href="/home">
          Admin Home
        </Link>
      </div>
      <div className="flex items-center">
        <ButtonLogout />
      </div>
    </main>
  );
}
