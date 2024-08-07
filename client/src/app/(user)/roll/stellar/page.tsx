"use client";

import PokemonCard from "@/components/PokeCard";
import StellarAnimation from "@/components/StellarAnimation";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import { RARITY, RARITY_MAP } from "@/common/rarity.enum";
import { useNavbarContext } from "@/components/NavBarProviders";

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
  const { profile, setProfile } = useNavbarContext();

  const fetchPokemon = async () => {
    try {
      const response = await fetchWithAuth("/roll/rollPokemon");
      console.log("response", response);
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

  const navbar = document.querySelector(".navbar");

  useEffect(() => {
    fetchPokemon();

    if (navbar) {
      navbar.classList.remove("visible");
    }
  }, []);

  return (
    <main>
      <div className="mt-[-112px]">
        <StellarAnimation>
          {pokemonData && (
            <PokemonCard
              rarity={RARITY_MAP[pokemonData.Pokemon.rarity as RARITY]}
              frontImage={
                pokemonData.shiny
                  ? pokemonData.Pokemon.shinyImage
                  : pokemonData.Pokemon.image
              }
              backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
              isShiny={pokemonData.shiny}
            />
          )}
        </StellarAnimation>
      </div>
    </main>
  );
}
