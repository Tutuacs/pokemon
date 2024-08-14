"use client";

import React, { useEffect, useState } from "react";
import "./form.css";
import PokemonCard from "@/components/PokeCard";
import { useNavbarContext } from "@/components/NavBarProviders";
import { ROLE } from "@/common/role.enums";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import FreePokemonButton from "@/components/FreePokemonButton";

type Props = {
  params: {
    id: string;
  };
};

type UserPokemon = {
  id: string;
  name: string;
  shiny: boolean;
  food: number;
  pokePoints: number;
  Pokemon: {
    id: number;
    name: string;
    description: string;
    image: string;
    evolveFood: number;
    evolvePokePoints: number;
    shinyImage: string;
    rarity: number;
  };
};

export default function PokemonIdPage(props: Props) {
  const { profile } = useNavbarContext();
  const router = useRouter();
  const { fetchWithAuth } = useFetch();

  const [formData, setFormData] = useState({
    name: "",
    rarity: "0",
    evolveFood: 0,
  });

  const [pokemonData, setPokemonData] = useState<UserPokemon | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);

  const fetchPokemon = async () => {
    try {
      const response = await fetchWithAuth(`/user-pokemon/${props.params.id}`);

      if (response?.status !== 200 && response?.status !== 201) {
        router.push("/pokemon/collection");
      }
      const pokemon = response!.data as UserPokemon;
      setPokemonData(pokemon);

      setIsShiny(pokemon.shiny);

      setFormData({
        name: pokemon.name,
        rarity: pokemon.Pokemon.rarity.toString(),
        evolveFood: pokemon.food,
      });
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "name" && value !== formData.name) {
      setNameChanged(true);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFeedPokemon = async () => {
    if (pokemonData) {
      // Calcula 5% do evolveFood
      const increment = pokemonData.Pokemon.evolveFood * 0.05;
      // Atualiza o food, garantindo que não ultrapasse o evolveFood
      const newFood = Math.min(
        pokemonData.food + increment,
        pokemonData.Pokemon.evolveFood
      );

      setPokemonData({
        ...pokemonData,
        food: newFood,
      });

      setNameChanged(false);

      // Atualiza o Pokémon no servidor
      await handleUpdatePokemon(newFood);
    }
  };

  const handleUpdatePokemon = async (newFood: number) => {

    const response = await fetchWithAuth(`/user-pokemon/${props.params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        food: newFood,
      }),
    });

    if (response?.status !== 200 && response?.status !== 201) {
      router.push("/pokemon/collection");
    }
  };

  const rarityOptions = [
    { value: 0, label: "normal" },
    { value: 1, label: "rare" },
    { value: 2, label: "super-rare" },
    { value: 3, label: "epic" },
    { value: 4, label: "mythic" },
    { value: 5, label: "legendary" },
  ];

  const foodProgress = pokemonData
    ? Math.min((pokemonData.food / pokemonData.Pokemon.evolveFood) * 100, 100)
    : 0;

  const pokePointsProgress = pokemonData
    ? Math.min(
        (profile.pokePoints / pokemonData.Pokemon.evolvePokePoints) * 100,
        100
      )
    : 0;

  return (
    <main className="create-pokemon-page flex h-screen">
      <div className="form-container w-2/3 p-6 bg-white rounded-lg shadow-lg">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-bold mb-4">Create Pokemon</h2>
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              disabled={foodProgress >= 100}
            />
            {nameChanged && (
              <p className="text-red-500 mt-2">
                Alimente para salvar seu pokemon com o nome desejado (atualmente não é possivel alterar quando ele estiver totalmente alimentado)
              </p>
            )}
          </label>
          {profile.role !== ROLE.DEFAULT && (
            <>
              <div className="block">
                <label className="">
                  Evolve Food:{" "}
                  <span className="ml-2">
                    {pokemonData?.food.toFixed(0)} /{" "}
                    {pokemonData?.Pokemon.evolveFood}
                  </span>
                </label>
                <div className="flex items-center mt-4">
                  <button
                    type="button"
                    onClick={handleFeedPokemon}
                    className={`bg-green-500 text-white px-4 py-2 mr-4 rounded hover:bg-green-400 ${
                      foodProgress >= 100 && "bg-green-600 hover:bg-green-600"
                    }`}
                    disabled={foodProgress >= 100}
                  >
                    Feed
                  </button>
                  <div className="w-full h-4 p-4 rounded-lg border border-green-500 bg-white relative">
                    <div
                      className="absolute left-0 rounded-lg top-0 h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${foodProgress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="block">
                <label>Evolve PokePoints: </label>
                <span className="font-bold">
                  {pokemonData && (
                    <span
                      className={`font-normal ${
                        profile.pokePoints <
                        pokemonData?.Pokemon.evolvePokePoints
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {profile.pokePoints}{" "}
                    </span>
                  )}
                  / {pokemonData?.Pokemon.evolvePokePoints}
                </span>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar bg-yellow-500 glitter-effect"
                    style={{ width: `${pokePointsProgress}%` }}
                  />
                </div>
              </div>
            </>
          )}
          {pokemonData && formData && (
            <FreePokemonButton
              id={props.params.id}
              isShiny={pokemonData!.shiny}
              name={pokemonData!.name}
              rarity={Number(formData.rarity)}
            />
          )}
        </form>
      </div>
      <div className="preview-container w-1/3 p-6 flex items-center justify-center">
        {pokemonData && (
          <PokemonCard
            rarity={
              rarityOptions[Number(formData.rarity)].label.toLowerCase() as
                | "normal"
                | "rare"
                | "super-rare"
                | "epic"
                | "mythic"
                | "legendary"
                | "shine"
            }
            frontImage={
              isShiny
                ? pokemonData!.Pokemon.shinyImage
                : pokemonData!.Pokemon.image
            }
            flip={true}
            flipOneTime={false}
            backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
            titleText={formData.name}
            subText={pokemonData?.Pokemon.description}
            isShiny={isShiny}
          />
        )}
      </div>
    </main>
  );
}
