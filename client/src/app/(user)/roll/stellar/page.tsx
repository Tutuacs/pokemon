"use client";

import PokemonCard from "@/components/PokeCard";
import StellarAnimation from "@/components/StellarAnimation";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import { RARITY, RARITY_MAP } from "@/common/rarity.enum";
import { useNavbarContext } from "@/components/NavBarProviders";
import "@/components/RollAgainBtn.css";
import { useRouter } from "next/navigation";

// Defina a interface para o tipo de dados que você está esperando
interface PokemonData {
  id: string;
  name: string;
  Pokemon: {
    rarity: number;
    image: string;
    shinyImage: string;
  };
  shiny: boolean;
  food: number;
  pokemonId: number;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function StellarPage() {
  const { fetchWithAuth } = useFetch();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [toggle, setToggle] = useState(false);
  const [invert, setInvert] = useState(false);
  const { profile, setProfile } = useNavbarContext();
  const router = useRouter(); // useRouter para navegação

  const fetchPokemon = async () => {
    try {
      const response = await fetchWithAuth("/roll/rollPokemon");
      console.log("response", response);

      if (response?.status !== 200 && response?.status !== 201) {
        router.push('/roll');
      }
      setProfile({
        ...profile,
        pokemons: profile.pokemons + 1,
        normalRolls: profile.normalRolls - 1,
      });
      setPokemonData(response?.data); // Armazene os dados no estado
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();

    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.remove("visible");
    }
  }, []);

  const toggleNavbar = () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("visible");
    }
    if (profile.normalRolls > 0) {
      setToggle(true);
      setInvert(true);
    }
  };

  const refreshPage = () => {
    router.push("/roll/again"); // Navega para a mesma rota
  };

  return (
    <main>
      <div className="mt-[-112px]">
        <StellarAnimation>
          {pokemonData && (
            <div onClick={toggleNavbar}>
              <PokemonCard
                rarity={RARITY_MAP[pokemonData.Pokemon.rarity as RARITY]}
                frontImage={
                  pokemonData.shiny
                    ? pokemonData.Pokemon.shinyImage
                    : pokemonData.Pokemon.image
                }
                backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
                isShiny={pokemonData.shiny}
                flip={invert}
                fix={invert}
              />
            </div>
          )}
          {toggle && (
            <div className="text-center bg-center mt-10">
              <button className="btn" onClick={refreshPage}>
                Roll Again
              </button>
            </div>
          )}
        </StellarAnimation>
      </div>
    </main>
  );
}
