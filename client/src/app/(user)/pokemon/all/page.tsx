"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokeCard";
import useFetch from "@/utils/useFetch";
import { useNavbarContext } from "@/components/NavBarProviders";
import Link from "next/link";

// Defina a interface para o tipo de dados do Pokémon do usuário
type UserPokemon = {
  id: string;
  name: string;
  description: string;
  shinyImage: string;
  image: string;
  food: number;
  rarity: number;
};

type Response = {
  pokemon: UserPokemon[];
  count: number;
};

const rarityOptions = [
  { value: 0, label: "Normal" },
  { value: 1, label: "Rare" },
  { value: 2, label: "Super Rare" },
  { value: 3, label: "Epic" },
  { value: 4, label: "Mythic" },
  { value: 5, label: "Legendary" },
  { value: 6, label: "Shine" },
];

export default function PokemonCollectionPage() {
  const [userPokemons, setUserPokemons] = useState<UserPokemon[]>([]);
  const [flip, setFlip] = useState(true);
  const [page, setPage] = useState(1);
  const { fetchWithAuth } = useFetch("Pokémons carregados com sucesso!");
  const { profile } = useNavbarContext();

  useEffect(() => {
    const fetchUserPokemons = async () => {
      try {
        const res = await fetchWithAuth(`/pokemon/page/${page}`);

        if (res?.status === 200) {
          const response: Response = res.data;
          const pokemon: UserPokemon[] = response.pokemon;
          console.log("responseInside", response);
          setUserPokemons(pokemon);
        }
        console.log("response", res);
      } catch (error) {
        console.error("Failed to fetch user pokemons", error);
      }
    };

    fetchUserPokemons();
  }, [page]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(profile.pokemons / 10);

  // Handle the next page button click
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Handle the previous page button click
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="mx-auto h-20 p-4 min-h-10 mt-10 text-center justify-center w-3/4 bg-slate-800 text-white text-2xl font-bold rounded-lg">
        Coleção de Pokémons
      </div>
      <section className="mx-auto flex min-h-[800px] w-3/4 mb-1 p-4">
        <div className="flex flex-wrap">
          {userPokemons.length > 0 ? (
            userPokemons.map((userPokemon) => (
              <Link
                href={`/pokemon/${userPokemon.id}`}
                className="mx-auto"
                key={userPokemon.id}
              >
                <PokemonCard
                  rarity={
                    rarityOptions[
                      Number(userPokemon.rarity)
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
                    false
                      ? userPokemon.shinyImage
                      : userPokemon.image
                  }
                  flip={flip}
                  fix={true}
                  txt={true}
                  backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
                  titleText={userPokemon.name}
                  subText={userPokemon.description || ""}
                  isShiny={false}
                />
              </Link>
            ))
          ) : (
            <p className="text-center p-4 col-span-4">
              Nenhum Pokémon encontrado.
            </p>
          )}
        </div>
      </section>
      <div className="flex justify-between items-center mx-auto w-3/4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Página Anterior
        </button>
        <span className="text-white">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima Página
        </button>
      </div>
    </main>
  );
}
