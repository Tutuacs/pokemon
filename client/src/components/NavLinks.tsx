// NavLinks.tsx
"use client";

import { ROLE } from "@/common/role.enums";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";
import RollTimer from "./RollTimer";
import { useNavbarContext } from "./NavBarProviders";

export default function NavLinks() {
  const { profile } = useNavbarContext();

  if (profile.role === ROLE.ADMIN) {
    return (
      <>
        <Link className="p-2" href="/home">
          Admin Home
        </Link>
        <>
          <Link className="p-2" href="/roll">
            <RollTimer />
          </Link>
          <div className="p-2">Food: {profile?.food}</div>
          <Link href="/pokemon/collection" className="p-2">
            Collection: {profile?.pokemons}
          </Link>
          <div className="p-2">PokePoints: {profile?.pokePoints}</div>
          <div className="p-2">PokeStars: {profile?.pokeStars}</div>
          <Link className="p-2" href="/profile">
            Users
          </Link>
          <Link className="p-2" href="/pokemon/all">
          Pokemons
        </Link>
        <ButtonLogout />
        </>
      </>
    );
  } else if (profile.role === ROLE.USER) {
    return (
      <>
        <Link className="p-2" href="/home">
          User Home
        </Link>
        <>
          <Link className="p-2" href="/roll">
            <RollTimer />
          </Link>
          <div className="p-2">Food: {profile?.food}</div>
          <Link href="/pokemon/collection" className="p-2">
            Collection: {profile?.pokemons}
          </Link>
          <div className="p-2">PokePoints: {profile?.pokePoints}</div>
          <div className="p-2">PokeStars: {profile?.pokeStars}</div>
          <Link className="p-2" href="/pokemon/all">
          Pokemons
        </Link>
        <ButtonLogout />
        </>
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
        <Link className="p-2" href="/pokemon/all">
          Pokemons
        </Link>
      </>
    );
  }
}
