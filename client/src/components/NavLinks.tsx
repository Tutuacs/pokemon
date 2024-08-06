// NavLinks.tsx
"use client";

import { ROLE } from "@/common/role.enums";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";
import RollTimer from "./RollTimer";

export default function NavLinks({
  type,
  logged,
  profile,
}: {
  type: ROLE;
  logged: boolean;
  profile: any;
}) {

  console.log("profile ON NAVLINKS -1 ", profile);
  // updateSession();

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
            <div className="p-2">Collection: {profile?.pokemons}</div>
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
            <div className="p-2">Collection: {profile?.pokemons}</div>
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
        <Link className="p-2" href="/register">
          Register
        </Link>
        <Link className="p-2" href="/roll">
          Roll
        </Link>
        <ButtonLogout />
      </>
    );
  }
}
