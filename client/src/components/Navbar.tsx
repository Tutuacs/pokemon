import Image from "next/image";
import Link from "next/link";
import { ROLE } from "@/common/role.enums";
import "./navbar.css"

export default function Navbar({
  type,
  logged,
}: {
  type: ROLE;
  logged: boolean;
}) {
  return (
    <nav className="navbar">
      <div className="flex items-center">
        <Link className="p-2" href="/">
          <Image src="https://img.artiz.ai/ai/20240727/66a3fd0976eaa.jpg" alt="home" width={200} height={50} />
        </Link>
      </div>
      <div className="flex items-center">
        {type == ROLE.ADMIN ? (
          <>
            <Link className="p-2" href="/home">
              Admin Home
            </Link>
            <Link className="p-2" href="/profile">
              Users
            </Link>
            <Link className="p-2" href="/pokemon">
              Pokemons
            </Link>
            <Link className="p-2" href="/roll/stellar">
              Star Roll
            </Link>
          </>
        ) : type == ROLE.USER ? (
          <>
            <Link className="p-2" href="/home">
              User Home
            </Link>
            <Link className="p-2" href="/pokemon">
              Pokemons
            </Link>
            <Link className="p-2" href="/roll/stellar">
              Star Roll
            </Link>
          </>
        ) : (
          <>
            <Link className="p-2" href="/home">
              Default Home
            </Link>
            <Link className="p-2" href="/login">
              Login
            </Link>
            <Link className="p-2" href="/register">
              Register
            </Link>
            <Link className="p-2" href="/roll/stellar">
              Star Roll
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
