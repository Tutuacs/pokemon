"use client";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import { useNavbarContext } from "./NavBarProviders";
import { useRouter } from "next/navigation";

export default function FreePokemonButton(pokemon: {
  id: string;
  rarity: number;
  name: string;
  isShiny: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {fetchWithAuth} = useFetch();
  const {profile, setProfile} = useNavbarContext();
  const route = useRouter();

  const pokePoints = 100 * (pokemon.rarity + 1) * (pokemon.isShiny ? 2 : 1);
  const food = 200 * (pokemon.rarity + 1) * (pokemon.isShiny ? 2 : 1);

  const openModal = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Previna o submit do formulário, se necessário
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const freePokemon = async () => {
    const response = await fetchWithAuth(`/user-pokemon/${pokemon.id}`, {
        method: "DELETE",
        });
    if (response?.status === 200) {
        setProfile({
            ...profile,
            pokePoints: profile.pokePoints + pokePoints,
            pokeStars: profile.pokeStars + ((pokemon.rarity + 1) * (pokemon.isShiny ? 2 : 1)),
            food: profile.food + food,
            pokemons: profile.pokemons - 1,
        });
    }
  }

  const handleConfirm = () => {
    freePokemon()
    closeModal();
    route.push("/pokemon/collection");
  };

  return (
    <div className="relative">
      <button
        className="p-4 bg-red-600 rounded-lg text-white"
        onClick={openModal}
      >
        Free Pokemon
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Parece que voce esta pensando em libertar este pokemon da sua
              colecao
            </h2>
            <p>Libertando este pokemon voce recebe:</p>
            <br />
            <p>
              PokePoints:{" "}
              {<span className="text-green-500 font-bold">{pokePoints}</span>}
            </p>
            <p>
              PokeStars:{" "}
              {
                <span className="text-green-500 font-bold">
                  {(pokemon.rarity + 1) * (pokemon.isShiny ? 2 : 1)}
                </span>
              }
            </p>
            <p>
              Food: {<span className="text-green-500 font-bold">{food}</span>}
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
