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
    description: "",
    image: "",
    shinyImage: "",
    rarity: "0",
  });

  const [pokemonData, setPokemonData] = useState<UserPokemon | null>(null);
  const [isShiny, setIsShiny] = useState(false);

  const fetchPokemon = async () => {
    try {
      const response = await fetchWithAuth(`/user-pokemon/${props.params.id}`);

      if (response?.status !== 200 && response?.status !== 201) {
        router.push("/pokemon/collection");
      }
      const pokemon = response!.data as UserPokemon;
      setPokemonData(pokemon);
      console.log("response", pokemon);

      setFormData({
        name: pokemon.name,
        description: pokemon.Pokemon.description,
        image: pokemon.Pokemon.image,
        shinyImage: pokemon.Pokemon.shinyImage,
        rarity: pokemon.Pokemon.rarity.toString(),
      });
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeedPokemon = () => {
    if (pokemonData && pokemonData.food < pokemonData.Pokemon.evolveFood) {
      setPokemonData({
        ...pokemonData,
        food: pokemonData.food + 1,
      });
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
    <main className="create-pokemon-page flex">
      <div className="form-container w-2/3 p-6 bg-white rounded-lg shadow-lg">
        <form className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Create Pokemon</h2>
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          {profile.role === ROLE.ADMIN ? (
            <>
              <label className="block">
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                />
              </label>
              <label className="block">
                Image URL:
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label className="block">
                Shiny Image URL:
                <input
                  type="text"
                  name="shinyImage"
                  value={formData.shinyImage}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label className="block">
                Rarity:
                <select
                  name="rarity"
                  value={formData.rarity}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {rarityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          ) : (
            <>
              <div className="block">
                <label>Evolve Food:</label>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar bg-red-500"
                    style={{ width: `${foodProgress}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleFeedPokemon}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                  disabled={foodProgress >= 100}
                >
                  Feed Pokemon
                </button>
                <span>
                  {pokemonData?.food} / {pokemonData?.Pokemon.evolveFood}
                </span>
              </div>
              <div className="block">
                <label>Evolve PokePoints:</label>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar bg-yellow-500 glitter-effect"
                    style={{ width: `${pokePointsProgress}%` }}
                  />
                </div>
                <span>
                  {profile.pokePoints} / {pokemonData?.Pokemon.evolvePokePoints}
                </span>
              </div>
            </>
          )}
          {
            pokemonData && formData && (
              <FreePokemonButton id={props.params.id} isShiny={pokemonData!.shiny} name={pokemonData!.name} rarity={Number(formData.rarity)} />
            )
          }
        </form>
      </div>
      <div className="preview-container w-1/3 p-6 flex items-center justify-center">
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
          frontImage={isShiny ? formData.shinyImage : formData.image}
          flip={true}
          flipOneTime={false}
          backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
          titleText={formData.name}
          subText={formData.description}
          isShiny={isShiny}
        />
      </div>
    </main>
  );
}
