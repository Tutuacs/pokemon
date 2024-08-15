"use client";

import React, { useState, useEffect } from "react";
import PokemonCard from "@/components/PokeCard";
import useFetch from "@/utils/useFetch";
import { useNavbarContext } from "@/components/NavBarProviders";

type UserPokemon = {
  id: string;
  name: string;
  shiny: boolean;
  food: number;
  Pokemon: {
    id: number;
    name: string;
    description: string;
    image: string;
    shinyImage: string;
    rarity: number;
  };
};

type UserData = {
  id: number;
  name: string;
  email: string;
  pokePoints: number;
  pokeStars: number;
  createdAt: string;
  food: number;
  gold: number;
  normalChance: number;
  rareChance: number;
  superRareChance: number;
  epicChance: number;
  mithycChance: number;
  legendaryChance: number;
  toEpic: number;
  toMithyc: number;
  toLegendary: number;
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
  const [user, setUser] = useState<UserData | null>(null);
  const [userPokemons, setUserPokemons] = useState<UserPokemon[]>([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [showLegendary, setShowLegendary] = useState(false);
  const [showMythic, setShowMythic] = useState(false);
  const [showEpic, setShowEpic] = useState(false);

  const { fetchWithAuth } = useFetch("Dados carregados com sucesso!");
  const { profile } = useNavbarContext();

  const fetchUserPokemons = async () => {
    try {
      const response = await fetchWithAuth(`/user-pokemon/page/${page}`);
      if (response!.status !== 200) {
        throw new Error("Falha ao buscar Pokémons do usuário");
      }
      setUserPokemons(response!.data);
      // Limpar Pokémon selecionado ao atualizar a lista
      setSelectedPokemonId(null);
    } catch (error) {
      console.error("Erro ao buscar Pokémons do usuário:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchWithAuth(`/profile/${id}`);
        if (response!.status !== 200) {
          throw new Error("Falha ao buscar dados do usuário");
        }
        const updatedUser = response!.data;
        console.log(updatedUser);
        Math.floor(updatedUser.toEpic * 100 + 1) > 100
          ? setShowEpic(true)
          : setShowEpic(false);
        Math.floor(updatedUser.toMithyc * 100 + 1) > 100
          ? setShowMythic(true)
          : setShowMythic(false);
        Math.floor(updatedUser.toLegendary * 100 + 1) > 100
          ? setShowLegendary(true)
          : setShowLegendary(false);

          console.log(updatedUser.toEpic);
          console.log(updatedUser.toMithyc);
          console.log(updatedUser.toLegendary);
          console.log(Math.floor(updatedUser.toEpic * 100 + 1) > 100)
          console.log(Math.floor(updatedUser.toMithyc * 100 + 1) > 100)
          console.log(Math.floor(updatedUser.toLegendary * 100 + 1) > 100)


        if (updatedUser.toEpic == updatedUser.toLegendary) {
          updatedUser.toEpic -= 1;
        }

        if (updatedUser.toMithyc == updatedUser.toLegendary) {
          updatedUser.toMithyc -= 1;
        }

        if (updatedUser.toEpic == updatedUser.toMithyc) {
          updatedUser.toEpic -= 1;
        }

        if (updatedUser.toEpic == 11) {
          updatedUser.toEpic -= 1;
        } else if (updatedUser.toEpic == 12) {
          updatedUser.toEpic -= 2;
        }

        setUser(updatedUser);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    if (page == 1) {
      fetchUserData();
    }
    fetchUserPokemons();
  }, [page]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Calcular o número total de páginas
  const totalPages = Math.ceil(profile.pokemons / itemsPerPage);

  // Função para lidar com a seleção de um Pokémon
  const handlePokemonSelect = (pokemonId: string) => {
    setSelectedPokemonId(pokemonId);
  };

  // Encontrar o Pokémon selecionado
  const selectedPokemon = userPokemons.find(
    (pokemon) => pokemon.id === selectedPokemonId
  );

  return (
    <main className="flex flex-col min-h-screen p-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {/* Informações do Usuário */}
          <div>
            <div
              className="text-white p-4 shadow rounded-t-lg"
              style={{ background: "rgba(40, 40, 40, 0.95)" }}
            >
              <h3 className="text-xl font-bold mb-2 text-center">
                Informações do Usuário
              </h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg">
              <div className="mt-4">
                <label className="block font-bold mb-2">
                  Nome: 
                  <span className="font-normal">{user.name}</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">
                  Email: 
                  <span className="font-normal">{user.email}</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">
                  PokePoints: 
                  <span className="font-normal">{user.pokePoints}</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">
                  PokeStars: 
                  <span className="font-normal">{user.pokeStars}</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">
                  Food: 
                  <span className="font-normal">{user.food}</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">
                  Gold: 
                  <span className="font-normal">{user.gold}</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">Chances:</label>
                <p>Normal: {Math.floor(user.normalChance * 100)}%</p>
                <p>Rare: {Math.floor(user.rareChance * 100)}%</p>
                <p>Super Rare: {Math.floor(user.superRareChance * 100)}%</p>
                <p>
                  Epic: {Math.floor(user.epicChance * 100)}%
                  <br />
                </p>
                  {showEpic && (
                    <span className="font-bold text-purple-400">
                      {user.toEpic == 10
                        ? "Sua próxima tentativa é garantida!"
                        : `${10 - user.toEpic} tentativas até o garantido`}
                    </span>
                  )}
                <p>
                  Mythic: {Math.floor(user.mithycChance * 100)}%
                  <br />
                </p>
                  {showMythic && (
                    <span className="font-bold text-red-400">
                      {user.toMithyc == 10
                        ? "Sua próxima tentativa é garantida!"
                        : `${10 - user.toMithyc} tentativas até o garantido`}
                    </span>
                  )}
                <p>
                  Legendary: {Math.floor(user.legendaryChance * 100)}%
                  <br />
                  {showLegendary && (
                    <span className="font-bold text-orange-400">
                      {user.toLegendary == 10
                        ? "Sua próxima tentativa é garantida!"
                        : `${10 - user.toLegendary} tentativas até o garantido`}
                    </span>
                  )}
                </p>
                <p>Shiny: {Math.floor(user.shinyChance * 100)}%</p>
              </div>
            </div>
          </div>

          {/* Lista de Pokémons do Usuário com Paginação */}
          <div className="col-span-1">
            <div
              className="text-white p-4 shadow rounded-t-lg"
              style={{ background: "rgba(40, 40, 40, 0.95)" }}
            >
              <h3 className="text-xl font-bold mb-2 text-center">Pokémons</h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg max-h-[320px] min-h-[320px] overflow-y-auto">
              {userPokemons.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className={`p-4 rounded-lg bg-gray-200 mt-4 cursor-pointer ${
                    selectedPokemonId === pokemon.id ? "bg-blue-300" : ""
                  }`}
                  onClick={() => handlePokemonSelect(pokemon.id)}
                >
                  {pokemon.Pokemon.name}
                </div>
              ))}
              <div className="flex justify-between items-center mt-16 mb-8">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-black">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Detalhes do Pokémon Selecionado */}
          <div className="col-span-1">
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
                    ][selectedPokemon.Pokemon.rarity] as
                      | "normal"
                      | "rare"
                      | "super-rare"
                      | "epic"
                      | "mythic"
                      | "legendary"
                      | "shine"
                  }
                  frontImage={
                    selectedPokemon.shiny
                      ? selectedPokemon.Pokemon.shinyImage
                      : selectedPokemon.Pokemon.image
                  }
                  backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
                  titleText={selectedPokemon.Pokemon.name}
                  flip={true}
                  flipOneTime={false}
                  subText={selectedPokemon.Pokemon.description}
                  isShiny={selectedPokemon.shiny}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
