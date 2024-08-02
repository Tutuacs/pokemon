// Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { ROLE } from "@/common/role.enums";
import "./navbar.css";
import ButtonLogout from "./ButtonLogout";
import RollTimer from "./RollTimer"; // Importando o componente cliente

export default function Navbar({
  type,
  logged,
  profile,
}: {
  type: ROLE;
  logged: boolean;
  profile: {
    gold: number;
    pokemons: number;
    pokePoints: number;
    normalRolls: number;
    lastChargeNormalRoll: Date;
    pokeStars: number;
  };
}) {
  profile.normalRolls = 3;

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
        {type == ROLE.ADMIN ? (
          <>
            {!logged && (
              <Link className="p-2" href="/home">
                Admin Home
              </Link>
            )}
            {logged && (
              <>
                <RollTimer
                  normalRolls={profile.normalRolls}
                  lastChargeNormalRoll={profile.lastChargeNormalRoll}
                />
              </>
            )}
            <div className="p-2">Gold: {profile.gold}</div>
            <div className="p-2">Collection: {profile.pokemons}</div>
            <div className="p-2">PokePoints: {profile.pokePoints}</div>
            <div className="p-2">PokeStars: {profile.pokeStars}</div>
            <Link className="p-2" href="/profile">
              Users
            </Link>
            <Link className="p-2" href="/pokemon">
              Pokemons
            </Link>
            <Link className="p-2" href="/roll">
              Roll
            </Link>
            <ButtonLogout />
          </>
        ) : type == ROLE.USER ? (
          <>
            {!logged && (
              <Link className="p-2" href="/home">
                User Home
              </Link>
            )}
            {logged && (
              <>
                <RollTimer
                  normalRolls={profile.normalRolls}
                  lastChargeNormalRoll={profile.lastChargeNormalRoll}
                />
              </>
            )}
            <div className="p-2">Gold: {profile.gold}</div>
            <div className="p-2">Collection: {profile.pokemons}</div>
            <div className="p-2">PokePoints: {profile.pokePoints}</div>
            <div className="p-2">PokeStars: {profile.pokeStars}</div>
            <Link className="p-2" href="/pokemon">
              Pokemons
            </Link>
            <Link className="p-2" href="/roll">
              Roll
            </Link>
            <ButtonLogout />
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
            <Link className="p-2" href="/roll">
              Roll
            </Link>
            <ButtonLogout />
          </>
        )}
      </div>
    </nav>
  );
}
