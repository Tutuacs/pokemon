"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokeCard";
import Link from "next/link";
import useFetch from "@/utils/useFetch";
import { useNavbarContext } from "@/components/NavBarProviders";
import { ROLE } from "@/common/role.enums";

// Defina a interface para o tipo de dados do Pokémon do usuário
type Pokemon = {
  id: string;
  name: string;
  description: string;
  shinyImage: string;
  image: string;
  food: number;
  rarity: number;
};

type Response = {
  pokemons: Pokemon[];
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
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { fetchWithAuth } = useFetch();
  const { profile } = useNavbarContext();

  // const profileOK = profile ? (profile.normalRolls > 0 ? true : false) : false;
  const profileAdmin = profile ? (profile.role === ROLE.ADMIN ? false : true) : true;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetchWithAuth(`/pokemon/page/${page}`);

        if (res?.status === 200) {
          const response: Response = res.data;
          const pokemon: Pokemon[] = response.pokemons;
          setTotalPages(Math.ceil(response.count / 10));
          setPokemons(pokemon);
        }
      } catch (error) {
        console.error("Failed to fetch user pokemons", error);
      }
    };

    fetchPokemons();
  }, [page]);

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
      {profile?.role === ROLE.ADMIN && (
        <div>
          <Link
            href="/pokemon/new"
            className="bg-green-500 text-white  p-4 fixed top-40 right-10 rounded-lg"
          >
            Create new Pokemon
          </Link>
        </div>
      )}
      <div className="mx-auto h-20 p-4 min-h-10 mt-10 text-center justify-center w-3/4 bg-slate-800 text-white text-2xl font-bold rounded-lg">
        Coleção de Pokémons
      </div>
      <section className="mx-auto flex min-h-[800px] w-3/4 mb-1 p-4">
        {pokemons.length > 0 ? (
          <div className="flex flex-wrap">
            {pokemons.map((pokemon) => (
              <Link
                href={ profileAdmin ? `/pokemon/details/${pokemon.id}`: `/pokemon/update/${pokemon.id}`}
                className="mx-auto"
                key={pokemon.id}
              >
                <PokemonCard
                  rarity={
                    rarityOptions[
                      Number(pokemon.rarity)
                    ].label.toLowerCase() as
                      | "normal"
                      | "rare"
                      | "super-rare"
                      | "epic"
                      | "mythic"
                      | "legendary"
                      | "shine"
                  }
                  frontImage={false ? pokemon.shinyImage : pokemon.image}
                  flip={true}
                  fix={true}
                  txt={true}
                  backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
                  titleText={pokemon.name}
                  subText={pokemon.description || ""}
                  isShiny={false}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-5xl animate-pulse p-4 w-full my-auto">
            Nenhum Pokemon encontrado.
          </p>
        )}
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
