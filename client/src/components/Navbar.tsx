// Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import NavLinks from "./NavLinks";

export default function Navbar({ logged, profile }: { logged: boolean, profile: any }) {

  // const { profile } = useNavbarContext();

  // const newType = profile?.role || -1;
  // const newLogged = newType !== -1;

  return (
    <nav className="navbar">
      <div className="flex items-center">
        <Link className="p-0" href={logged ? "/home" : "/"}>
          <Image
            src="https://img.artiz.ai/ai/20240729/66a7953cf0bff.jpg"
            alt="home"
            width={60}
            height={60}
            className="rounded-lg"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <NavLinks logged={logged} type={profile? profile.role : -1} profile={profile} />
      </div>
    </nav>
  );
}
