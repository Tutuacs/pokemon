"use client";

import React, { useState, useEffect } from "react";
import PokemonCard from "@/components/PokeCard";
import "./form.css";
import useFetch from "@/utils/useFetch";

type Pokemon = {
  id: number;
  name: string;
  description: string;
  evolutionId: string;
  image: string;
  shinyImage: string;
  rarity: number;
};

type Response = {
  page: number;
  pokemons: Pokemon[];
  count: number;
};

export default function CreatePokemonPage() {
  const defaultPokemon: Pokemon = {
    id: 1,
    name: "",
    description: "",
    image: "",
    shinyImage: "",
    rarity: 4,
    evolutionId: "",
  };

  const defaultFormData = {
    name: "",
    description: "",
    image: "",
    shinyImage: "",
    rarity: "1",
    evolveFood: 0,
    evolvePokePoints: 0,
    evolutionId: "",
  };

  const [formData, setFormData] = useState({
    ...defaultFormData,
    image:
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/charizard-watercolor-jo-kiwi.jpg",
    shinyImage:
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/mega-charizard-x-jo-kiwi.jpg",
    rarity: "4",
  });

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedEvolution, setSelectedEvolution] =
    useState<Pokemon>(defaultPokemon);
  const { fetchWithAuth } = useFetch();

  const [isShiny, setIsShiny] = useState(false);
  const [haveEvolution, setHaveEvolution] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (haveEvolution) {
      fetchEvolutionPokemons();
    }
  }, [page, haveEvolution]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShinyChange = () => {
    setIsShiny(!isShiny);
  };

  const handleEvolutionChange = () => {
    setHaveEvolution(!haveEvolution);
  };

  const handleEvolutionSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = e.target.value;
    const selected = pokemons.find(
      (pokemon) => pokemon.id === Number(selectedId)
    );
    setSelectedEvolution(selected!);
    setFormData({ ...formData, evolutionId: selectedId });
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

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

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.image.trim() !== "" &&
      formData.shinyImage.trim() !== "" &&
      formData.rarity !== "" &&
      (haveEvolution? formData.evolutionId.trim() !== "": true) &&
      formData.evolveFood > 0 &&
      formData.evolvePokePoints > 0
    );
  };

  const fetchEvolutionPokemons = async () => {
    try {
      const res = await fetchWithAuth(`/pokemon/page/${page}`);
      if (res?.status === 200) {
        const response: Response = res.data;
        const pokemons: Pokemon[] = response.pokemons;
        setPokemons(pokemons);
        setTotalPages(Math.ceil(response.count / 10));
      }
    } catch (error) {
      console.error("Failed to fetch evolution pokemons", error);
    }
  };

  const handleCreatePokemon = async () => {
    try {
      let bodyData: {
        name: string;
        description: string;
        image: string;
        shinyImage: string;
        rarity: string;
        evolveFood: number;
        evolvePokePoints: number;
        evolutionId?: string;
      } = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        shinyImage: formData.shinyImage,
        rarity: formData.rarity,
        evolveFood: formData.evolveFood,
        evolvePokePoints: formData.evolvePokePoints,
      };

      if (haveEvolution) {
        bodyData = {
          ...bodyData,
          evolutionId: formData.evolutionId,
        };
      }

      const res = await fetchWithAuth("/pokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      if (res?.status === 200 || res?.status === 201) {
        setFormData({
          name: "",
          description: "",
          image: "",
          shinyImage: "",
          rarity: "0",
          evolveFood: 0,
          evolvePokePoints: 0,
          evolutionId: "",
        });
        setIsShiny(false);
        setHaveEvolution(false);
        setSelectedEvolution(defaultPokemon);
        setFormData(defaultFormData);
      } else {
        console.error("Erro ao criar Pokémon");
      }
    } catch (error) {
      console.error("Erro ao criar Pokémon", error);
    }
  };

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
          <label className="block">
            Evolve Food:
            <input
              type="number"
              name="evolveFood"
              value={formData.evolveFood}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <label className="block">
            Evolve PokePoints:
            <input
              type="number"
              name="evolvePokePoints"
              value={formData.evolvePokePoints}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <label className="block items-center">
            Shiny:
            <input
              type="checkbox"
              checked={isShiny}
              onChange={handleShinyChange}
              className="form-checkbox ml-2"
            />
          </label>
          <label className="block items-center">
            Have Evolution:
            <input
              type="checkbox"
              checked={haveEvolution}
              onChange={handleEvolutionChange}
              className="form-checkbox ml-2"
            />
          </label>

          {haveEvolution && (
            <div>
              <label className="block">
                Select Evolution:
                <select
                  name="evolutionId"
                  value={formData.evolutionId}
                  onChange={handleEvolutionSelectChange}
                  className="form-select"
                >
                  {pokemons.map((pokemon) => (
                    <option key={pokemon.id} value={pokemon.id}>
                      {pokemon.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-between items-center mx-auto w-3/4">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50 mt-4"
                >
                  Página Anterior
                </button>
                <span className="text-black mt-4">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50 mt-4"
                >
                  Próxima Página
                </button>
              </div>
            </div>
          )}

          {isFormValid() && (
            <button
              type="button"
              onClick={handleCreatePokemon}
              className="form-button bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Create Pokémon
            </button>
          )}
        </form>
      </div>
      <div className="preview-container w-1/3 p-6 flex items-center justify-center flex-col">
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
          backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
          titleText={formData.name}
          subText={formData.description}
          isShiny={isShiny}
          fix={false}
          flip={true}
          flipOneTime={false}
        />
        {haveEvolution && (
          <div className="mt-4">
            <PokemonCard
              rarity={
                rarityOptions[
                  Number(selectedEvolution.rarity)
                ].label.toLowerCase() as
                  | "normal"
                  | "rare"
                  | "super-rare"
                  | "epic"
                  | "mythic"
                  | "legendary"
                  | "shine"
              }
              frontImage={
                isShiny ? selectedEvolution.shinyImage : selectedEvolution.image
              }
              backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
              titleText={selectedEvolution.name}
              subText={selectedEvolution.description}
              isShiny={isShiny}
              fix={false}
              flip={true}
              flipOneTime={false}
            />
          </div>
        )}
      </div>
    </main>
  );
}
