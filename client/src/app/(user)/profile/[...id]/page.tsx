"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import PokemonCard from '@/components/PokeCard';

// Mock user data (replace with actual data fetching)
const mockUserData = {
  id: 1,
  name: "Ash Ketchum",
  email: "ash@example.com",
  pokePoints: 100,
  pokeStars: 50,
  food: 30,
  gold: 20,
  normalRolls: 5,
  specialRolls: 3,
  toEpic: 1,
  toMithyc: 2,
  toLegendary: 3,
  normalChance: 0.5,
  rareChance: 0.4,
  superRareChance: 0.3,
  epicChance: 0.2,
  mithycChance: 0.1,
  legendaryChance: 0.05,
  shinyChance: 0.01,
  Pokemon: [
    {
      id: 1,
      name: 'Pikachu',
      description: 'Electric type Pokémon',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png',
      rarity: 2,
      isShiny: false,
    },
    {
      id: 2,
      name: 'Charizard',
      description: 'Fire/Flying type Pokémon',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
      shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/6.png',
      rarity: 4,
      isShiny: true,
    },
    // Add more Pokémon as needed
  ],
};

type UserPokemon = {
  id: number;
  name: string;
  description: string;
  image: string;
  shinyImage: string;
  rarity: number;
  isShiny: boolean;
};

type UserData = {
  id: number;
  name: string;
  email: string;
  pokePoints: number;
  pokeStars: number;
  food: number;
  gold: number;
  normalRolls: number;
  specialRolls: number;
  toEpic: number;
  toMithyc: number;
  toLegendary: number;
  normalChance: number;
  rareChance: number;
  superRareChance: number;
  epicChance: number;
  mithycChance: number;
  legendaryChance: number;
  shinyChance: number;
  Pokemon: UserPokemon[];
};

type Props = {
  params: {
    id: string;
  };
};

export default function UserProfilePage(props: Props) {
  const { id } = props.params;
  const [user, setUser] = useState<UserData>();
  const [selectedPokemon, setSelectedPokemon] = useState<UserPokemon | null>(null);

  useEffect(() => {
    // Fetch user data based on ID
    setUser(mockUserData); // Replace with actual data fetching
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col min-h-screen p-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {/* User Info */}
          <div>
            <div className="text-white p-4 shadow rounded-t-lg"
            style={{background: "rgba(40, 40, 40, 0.95)"}}>
              <h3 className="text-xl font-bold mb-2 text-center">Informações do Usuário</h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg">
              <div className="mt-4">
                <label className="block font-bold mb-2">Nome:</label>
                <p>{user.name}</p>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">Email:</label>
                <p>{user.email}</p>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">PokePoints:</label>
                <p>{user.pokePoints}</p>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">PokeStars:</label>
                <p>{user.pokeStars}</p>
              </div>
              {/* Add other user properties as needed */}
            </div>
          </div>

          {/* User Pokémon List */}
          <div className="col-span-1">
            <div className=" text-white p-4 shadow rounded-t-lg"
            style={{background: "rgba(40, 40, 40, 0.95)"}}>
              <h3 className="text-xl font-bold mb-2 text-center">Pokémons</h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg max-h-[320px] min-h-[320px] overflow-y-auto">
              {user.Pokemon.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="p-4 rounded-lg bg-gray-200 mt-4 cursor-pointer"
                  onClick={() => setSelectedPokemon(pokemon)}
                >
                  {pokemon.name}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 mt-[-90px]">
          {selectedPokemon && (
          <div className="mt-6 flex justify-center">
            <PokemonCard
              rarity={
                [
                  "normal",
                  "rare",
                  "super-rare",
                  "epic",
                  "mythic",
                  "legendary",
                  "shine",
                ][selectedPokemon.rarity] as
                  | "normal"
                  | "rare"
                  | "super-rare"
                  | "epic"
                  | "mythic"
                  | "legendary"
                  | "shine"
              }
              frontImage={selectedPokemon.isShiny ? selectedPokemon.shinyImage : selectedPokemon.image}
              backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
              titleText={selectedPokemon.name}
              subText={selectedPokemon.description}
              isShiny={selectedPokemon.isShiny}
            />
          </div>
        )}
          </div>
        </div>
      </div>
    </main>
  );
}
