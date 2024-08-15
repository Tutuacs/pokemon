"use client";

import React, { useState, useEffect } from "react";
import useFetch from "@/utils/useFetch";
import PokemonCard from "@/components/PokeCard";

type Pokemon = {
  id: number;
  name: string;
  evolveFood: string;
  evolvePokePoints: string;
  description: string;
  image: string;
  shinyImage: string;
  rarity: number;
  Evolution: Pokemon | null;
};

type Props = {
  params: {
    id: string;
  };
};

export default function PokemonDetailPage({ params }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isShiny, setIsShiny] = useState(false); // Estado para o modo shiny
  const { fetchWithAuth } = useFetch();

  useEffect(() => {
    if (!pokemon) {
      fetchPokemonDetails();
    }
  });

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetchWithAuth(`/pokemon/${params.id}`);
      if (response?.status === 200) {
        setPokemon(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do Pokémon", error);
    }
  };

  if (!pokemon) {
    return <div>Carregando...</div>;
  }

  const rarityOptions: {
    value: number;
    label:
      | "normal"
      | "rare"
      | "super-rare"
      | "epic"
      | "mythic"
      | "legendary"
      | "shine";
  }[] = [
    { value: 0, label: "normal" },
    { value: 1, label: "rare" },
    { value: 2, label: "super-rare" },
    { value: 3, label: "epic" },
    { value: 4, label: "mythic" },
    { value: 5, label: "legendary" },
  ];

  const toggleShiny = () => {
    setIsShiny(!isShiny); // Alterna o estado do modo shiny
  };

  const span = pokemon.Evolution ? "grid-cols-5" : "grid grid-cols-4";

  return (
    <main
      className={`p-6 shadow-lg grid ${span} gap-4 text-white min-w-screen min-h-screen items-center mt-[-110px]`}
    >
      {/* Informações do Pokémon */}
      <div className="p-4 col-span-1">
        <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
        <p className="mb-4">{pokemon.description}</p>
        <p className="mb-4">Food to evolution: {pokemon.evolveFood}</p>
        <p className="mb-4">PokePoints to evolution: {pokemon.evolvePokePoints}</p>

        {/* Botão para ativar o modo shiny caso não haja evolução */}
        {!pokemon.Evolution && (
          <button
            onClick={toggleShiny}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isShiny ? "Visualizar Normal" : "Visualizar Shiny"}
          </button>
        )}
      </div>

      {/* Cartinha do Pokémon */}
      <div className="col-span-1 flex">
        <PokemonCard
          rarity={rarityOptions[pokemon.rarity].label}
          frontImage={isShiny ? pokemon.shinyImage : pokemon.image} // Alterar imagem com base no estado shiny
          backImage="https://utfs.io/f/04c1aab2-8510-46a6-9044-35a767385d5e-427qdm.jpg"
          titleText={pokemon.name}
          subText={pokemon.description}
          isShiny={isShiny}
          fix={false}
          flip={true}
          flipOneTime={false}
        />
      </div>

      {pokemon.Evolution && (
        <>
          {/* Botão entre as cartas se houver evolução */}
          <div className="flex justify-center col-span-0 items-center">
            <button
              onClick={toggleShiny}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isShiny ? "Visualizar Normal" : "Visualizar Shiny"}
            </button>
          </div>
          {/* Cartinha da Evolução */}
          <div className="col-span-1 flex justify-center">
            <PokemonCard
              rarity={rarityOptions[pokemon.Evolution.rarity].label}
              frontImage={pokemon.Evolution.image}
              backImage="https://utfs.io/f/04c1aab2-8510-46a6-9044-35a767385d5e-427qdm.jpg"
              titleText={pokemon.Evolution.name}
              subText={pokemon.Evolution.description}
              isShiny={isShiny}
              fix={false}
              flip={true}
              flipOneTime={false}
            />
          </div>

          {/* Informações da Evolução */}
          <div className="p-4 col-span-1 text-white">
            <h3 className="text-xl font-bold mt-4">{pokemon.Evolution.name}</h3>
            <p className="mb-4">{pokemon.Evolution.description}</p>
            <p className="mb-4">Food to evolution: {pokemon.Evolution.evolveFood}</p>
            <p className="mb-4">
              PokePoints to evolution: {pokemon.Evolution.evolvePokePoints}
            </p>
          </div>
        </>
      )}
    </main>
  );
}
