// NavLinks.tsx
"use client";

import { ROLE } from "@/common/role.enums";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";
import RollTimer from "./RollTimer";
import { useNavbarContext } from "./NavBarProviders";

export default function NavLinks({
  logged,
}: {
  logged: boolean;
}) {

  const {profile} = useNavbarContext(); 

  const type = profile?.role;

  if (type === ROLE.ADMIN) {
    return (
      <>
        {!logged && (
          <Link className="p-2" href="/home">
            Admin Home
          </Link>
        )}
        {!logged && (
          <>
            <Link className="p-2" href="/roll">
              <RollTimer />
            </Link>
            <div className="p-2">Gold: {profile?.gold}</div>
            <Link href="/pokemon/collection" className="p-2">Collection: {profile?.pokemons}</Link>
            <div className="p-2">PokePoints: {profile?.pokePoints}</div>
            <div className="p-2">PokeStars: {profile?.pokeStars}</div>
            <Link className="p-2" href="/profile">
              Users
            </Link>
            <Link className="p-2" href="/pokemon">
              Pokemons
            </Link>
            <ButtonLogout />
          </>
        )}
      </>
    );
  } else if (type === ROLE.USER) {
    return (
      <>
        {!logged && (
          <Link className="p-2" href="/home">
            User Home
          </Link>
        )}
        {!logged && (
          <>
            <Link className="p-2" href="/roll">
              <RollTimer />
            </Link>
            <div className="p-2">Gold: {profile?.gold}</div>
            <Link href="/pokemon/collection" className="p-2">Collection: {profile?.pokemons}</Link>
            <div className="p-2">PokePoints: {profile?.pokePoints}</div>
            <div className="p-2">PokeStars: {profile?.pokeStars}</div>
          </>
        )}
        <Link className="p-2" href="/pokemon">
          Pokemons
        </Link>
        <ButtonLogout />
      </>
    );
  } else {
    return (
      <>
        <Link className="p-2" href="/home">
          Default Home
        </Link>
        <Link className="p-2" href="/login">
          Login
        </Link>
        <Link className="p-2" href="/roll">
          Roll
        </Link>
        <ButtonLogout />
      </>
    );
  }
}
