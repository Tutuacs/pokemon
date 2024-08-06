"use client"
import React, { useContext, createContext, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

// Define o tipo para as propriedades do perfil da Navbar
type NavbarProviderProps = {
  profile: NavbarProfileProps;
  setProfile: (profile: NavbarProfileProps) => void;
  updateSession: () => Promise<void> | void;
};

// Tipo para o perfil da Navbar
export type NavbarProfileProps = {
  id: string;
  email: string;
  role: number;
  name: string;
  normalRolls: number;
  lastChargeNormalRoll: Date;
  food: number;
  gold: number;
  pokePoints: number;
  pokeStars: number;
  pokemons: number;
};

// Estado inicial padrão para o perfil
const defaultNav: NavbarProfileProps = {
  id: "0c8dfa6d-8dd1-46da-a680-86ad6ba02b85",
  email: "admin@admin.com",
  role: -1,
  name: "admin",
  normalRolls: 5,
  lastChargeNormalRoll: new Date("2024-08-02T17:05:03.691Z"),
  food: 0,
  gold: 0,
  pokePoints: 0,
  pokeStars: 0,
  pokemons: 0,
};

const NavbarContext = createContext<NavbarProviderProps>({
  profile: defaultNav,
  setProfile: () => {}, // Função padrão
  updateSession: () => {}, // Função padrão
});

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(defaultNav);

  const updateSession = async () => {
    const session = await getServerSession(authOptions);

    if (session?.tokens.profile !== profile) {
      setProfile(session?.tokens.profile!);
    }

    console.log("updating profile");
  };

  return (
    <NavbarContext.Provider value={{ profile, setProfile, updateSession }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);

export const getProfile = async () => {
  const session = await getServerSession(authOptions);

  return session?.tokens.profile!;
}
