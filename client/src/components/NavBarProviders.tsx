"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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
const initialProfile: NavbarProfileProps = {
  id: "",
  email: "",
  role: -1,
  name: "",
  normalRolls: 0,
  lastChargeNormalRoll: new Date(),
  food: 0,
  gold: 0,
  pokePoints: 0,
  pokeStars: 0,
  pokemons: 0,
};

const NavbarContext = createContext<NavbarProviderProps>({
  profile: initialProfile,
  setProfile: () => {}, // Função padrão
  updateSession: () => {}, // Função padrão
});

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<NavbarProfileProps>(initialProfile);

  useEffect(() => {
    if (session) {
      setProfile(session.tokens.profile as NavbarProfileProps);
    }
  }, [session]);

  const updateSession = async () => {
    if (session && session.tokens.profile !== profile) {
      setProfile(session.tokens.profile as NavbarProfileProps);
    }
  };

  return (
    <NavbarContext.Provider value={{ profile, setProfile, updateSession }}>
      {children}
    </NavbarContext.Provider>
  );
}

export const useNavbarContext = () => useContext(NavbarContext);
