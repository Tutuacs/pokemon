// Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import NavLinks from "./NavLinks";

export default function Navbar({ logged }: { logged: boolean; profile?: any }) {
  return (
    <nav className="navbar visible">
      <div className="flex items-center">
        <Link className="p-0" href={logged ? "/home" : "/"}>
          <Image
            src="https://utfs.io/f/cd55894b-ddec-4b30-a538-5b0b5a5d62fd-1x5rt.jpg"
            alt="home"
            width={60}
            height={60}
            className="rounded-lg"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <NavLinks />
      </div>
    </nav>
  );
}
