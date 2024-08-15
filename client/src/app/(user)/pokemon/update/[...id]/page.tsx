"use client";

import React, { useState, useEffect } from "react";
import PokemonCard from "@/components/PokeCard";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import "./form.css"
import { Link } from "lucide-react";

type Pokemon = {
  id: number;
  name: string;
  description: string;
  evolutionId: string | null;
  image: string;
  shinyImage: string;
  rarity: number;
};

type Response = {
  page: number;
  pokemons: Pokemon[];
  count: number;
};

type Props = {
  params: {
    id: string;
  };
};

export default function UpdatePokemonPage({ params }: Props) {
  const defaultPokemon: Pokemon = {
    id: 1,
    name: "",
    description: "",
    image: "",
    shinyImage: "",
    rarity: 0,
    evolutionId: null,
  };

  const defaultFormData = {
    name: "",
    description: "",
    image: "",
    shinyImage: "",
    rarity: "0",
    evolveFood: 0,
    evolvePokePoints: 0,
    evolutionId: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [fetched, setFetched] = useState(false);
  const [selectedEvolution, setSelectedEvolution] =
    useState<Pokemon>(defaultPokemon);
  const [pokemonEvolution, setPokemonEvolution] = useState<Pokemon | null>(
    null
  );
  const { fetchWithAuth } = useFetch();

  const [isShiny, setIsShiny] = useState(false);
  const [haveEvolution, setHaveEvolution] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchInitialData();
  }, [fetched]);

  useEffect(() => {
    if (haveEvolution) {
      fetchEvolutionPokemons();
    }
  }, [page, haveEvolution]);

  const fetchInitialData = async () => {
    try {
      const response = await fetchWithAuth(`/pokemon/${params.id}`);
      if (response?.status === 200) {
        const pokemon = response.data;
        setFormData({
          ...pokemon,
          evolveFood: pokemon.evolveFood || 0,
          evolvePokePoints: pokemon.evolvePokePoints || 0,
          rarity: String(pokemon.rarity),
        });
        setHaveEvolution(pokemon.Evolution !== null); // Verificando se o Pokémon tem evolução
        setSelectedEvolution(pokemon); // Definindo a evolução selecionada como o Pokémon atual
        setPokemonEvolution(pokemon.Evolution || null); // Definindo a evolução retornada na resposta
        if (pokemon.Evolution) {
          setSelectedEvolution({ ...pokemon.Evolution });
        }
        setFetched(true);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do Pokémon", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
    const selected =
      pokemons.find((pokemon) => pokemon.id === Number(selectedId)) ||
      pokemonEvolution;
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
      formData.rarity !== "" &&
      formData.evolveFood > 0 &&
      formData.evolvePokePoints > 0
    );
  };

  const route = useRouter();

  const fetchEvolutionPokemons = async () => {
    try {
      const res = await fetchWithAuth(`/pokemon/page/${page}`);
      if (res?.status === 200) {
        const response: Response = res.data;
        const pokemons: Pokemon[] = response.pokemons;
        const exist = pokemons.find(
          (pokemon) => pokemon.id === Number(params.id)
        );
        if (exist) {
          pokemons.splice(pokemons.indexOf(exist), 1);
        }
        setPokemons(pokemons);
        setTotalPages(Math.ceil(response.count / 10));
      }
    } catch (error) {
      console.error("Failed to fetch evolution pokemons", error);
    }
  };

  const handleUpdatePokemon = async () => {
    try {
      let bodyData: {
        name: string;
        description: string;
        image: string;
        shinyImage: string;
        rarity: string;
        evolveFood: number;
        evolvePokePoints: number;
        evolutionId?: string | null;
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
      } else {
        bodyData = {
          ...bodyData,
          evolutionId: null,
        };
      }

      const res = await fetchWithAuth(`/pokemon/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      if (res?.status === 200 || res?.status === 201) {
        setIsShiny(false);
        setHaveEvolution(false);
        setSelectedEvolution(defaultPokemon);
        route.push("/pokemon/all");
      } else {
        console.error("Erro ao atualizar Pokémon");
      }
    } catch (error) {
      console.error("Erro ao atualizar Pokémon", error);
    }
  };

  return (
    <main className="h-screen">
        <div>
          <Link
            href={`/pokemon/details/${params.id}`}
            className="bg-indigo-600 text-white  p-4 fixed top-40 right-10 rounded-lg"
          >
            View Details
          </Link>
        </div>
      <div className="update-pokemon-page flex ">
        <div className="col-span-2 w-1/3 p-6 bg-white rounded-lg shadow-lg preview-container">
          <form className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Atualizar Pokémon</h2>
            <label className="block">
              Nome:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="block">
              Descrição:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
              />
            </label>
            <label className="block">
              URL da Imagem:
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="block">
              URL da Imagem Shiny:
              <input
                type="text"
                name="shinyImage"
                value={formData.shinyImage}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="block">
              Raridade:
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
              Comida para Evoluir:
              <input
                type="number"
                name="evolveFood"
                value={formData.evolveFood}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="block">
              PokePoints para Evoluir:
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
            <label className="block">
              <input
                type="checkbox"
                checked={haveEvolution}
                onChange={handleEvolutionChange}
                className="form-checkbox"
              />
              <span className="ml-2">Tem Evolução</span>
            </label>
            {haveEvolution && (
              <div>
                <label className="block">
                  Evolução:
                  <select
                    name="evolutionId"
                    value={formData.evolutionId}
                    onChange={handleEvolutionSelectChange}
                    className="form-select"
                  >
                    <option value="">Selecione uma evolução</option>
                    {pokemonEvolution && (
                      <option
                        value={pokemonEvolution.id}
                        style={{ color: "red" }}
                      >
                        {pokemonEvolution.name} (Atual)
                      </option>
                    )}
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
                    Prev
                  </button>
                  <span className="text-black mt-4">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50 mt-4"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={handleUpdatePokemon}
              className={`bg-orange-500 text-white mb-0 hover:bg-orange-400 px-4 py-2 rounded ${
                !isFormValid() ? "opacity-50" : ""
              }`}
              disabled={!isFormValid()}
            >
              Atualizar Pokémon
            </button>
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
            backImage="https://utfs.io/f/04c1aab2-8510-46a6-9044-35a767385d5e-427qdm.jpg"
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
                  isShiny
                    ? selectedEvolution.shinyImage
                    : selectedEvolution.image
                }
                backImage="https://utfs.io/f/04c1aab2-8510-46a6-9044-35a767385d5e-427qdm.jpg"
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
      </div>
    </main>
  );
}
