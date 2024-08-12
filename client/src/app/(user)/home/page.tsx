"use client";

import Link from "next/link";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import { useNavbarContext } from "@/components/NavBarProviders";
import { RARITY, RARITY_MAP } from "@/common/rarity.enum";
import "./rarity.css";
import { ROLE } from "@/common/role.enums";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type Pokemon = {
  id: number;
  name: string;
  rarity: number; // RARITY tipo foi alterado para número
  createdAt: string;
};

type Roll = {
  Pokemon: Pokemon;
  id: string;
  shiny: boolean;
  createdAt: string;
};

type Response = {
  rolls: Roll[];
  newPokemons: Pokemon[] | undefined;
  newUsers: User[] | undefined;
};

export default function AdminDashboard() {
  const [newUsers, setNewUsers] = useState<User[]>([]);
  const [newPokemons, setNewPokemons] = useState<Pokemon[]>([]);
  const [newRolls, setNewRolls] = useState<Roll[]>([]);
  const { fetchWithAuth } = useFetch();
  const { profile } = useNavbarContext();

  const fetchHomeBuilder = async () => {
    if (profile.role !== -1) {
      const response = await fetchWithAuth("/profile/home/builder");
      if (response!.status === 200 || response!.status === 201) {
        const data: Response = await response!.data;
        setNewPokemons(data.newPokemons!);
        if (profile.role === ROLE.ADMIN) {
          setNewUsers(data.newUsers!);
        }
        if (profile.role !== ROLE.DEFAULT) {
          setNewRolls(data.rolls);
        }
      }
    }
  };

  useEffect(() => {
    fetchHomeBuilder();
  }, []);

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="mx-auto mt-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {profile.role !== ROLE.DEFAULT && (
            <div className="mt-4">
              <div
                className="bg-slate-700 text-white p-4 text-center shadow rounded-t-lg"
                style={{ background: "rgba(40, 40, 40, 0.95)" }}
              >
                <h3 className="text-xl font-bold mb-2">Novos Usuários</h3>
              </div>
              <div className="bg-white p-4 shadow rounded-b-lg max-h-[800px] overflow-y-auto">
                {newUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mt-4"
                  >
                    <div>
                      <h2 className="text-xl font-bold">{user.name}</h2>
                      <p>Data: {formatDate(user.createdAt)}</p>
                    </div>
                    <div className="flex items-center">
                      <Link
                        href={`/profile/${user.id}`}
                        className="p-2 text-md bg-blue-600 rounded-lg hover:bg-blue-500 text-white"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <div
              className="bg-slate-700 text-white p-4 text-center shadow rounded-t-lg"
              style={{ background: "rgba(40, 40, 40, 0.95)" }}
            >
              <h3 className="text-xl font-bold mb-2">Novos Pokemons</h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg max-h-[800px] overflow-y-auto">
              {newPokemons.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className={`flex justify-between items-center bg-gray-200 p-4 rounded-lg mt-4 ${
                    RARITY_MAP[pokemon.rarity as RARITY]
                  }`}
                >
                  <div>
                    <h2 className="text-xl font-bold">{pokemon.name}</h2>
                    <p>Data: {formatDate(pokemon.createdAt)}</p>
                    <p>{pokemon.rarity}</p>
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={`/pokemon/${pokemon.id}`}
                      className="p-2 text-md bg-blue-600 rounded-lg hover:bg-blue-500 text-white"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {profile.role !== ROLE.DEFAULT && (
            <div className="mt-4">
              <div
                className="bg-slate-700 text-white p-4 text-center shadow rounded-t-lg"
                style={{ background: "rgba(40, 40, 40, 0.95)" }}
              >
                <h3 className="text-xl font-bold mb-2">Últimos Rolls</h3>
              </div>
              <div className="bg-white p-4 shadow rounded-b-lg max-h-[800px] overflow-y-auto">
                {newRolls.map((roll) => (
                  <div
                    key={roll.id}
                    className={`flex justify-between items-center bg-gray-200 p-4 rounded-lg mt-4 ${
                      RARITY_MAP[roll.Pokemon.rarity as RARITY]
                    }`}
                  >
                    <div>
                      <h2 className="text-xl font-bold">{roll.Pokemon.name}</h2>
                      <p>Data: {formatDate(roll.createdAt)}</p>
                      {roll.shiny && (
                        <p className="animate-pulse text-black">Shiny</p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 text-md bg-blue-600 rounded-lg hover:bg-blue-500 text-white">
                        Ver Detalhes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
