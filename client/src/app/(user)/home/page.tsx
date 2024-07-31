import Link from "next/link";
import PokemonCard from "@/components/PokeCard";

// Dados mock (substituir por dados reais)
const newUsers = [
  { id: 1, name: "Ash Ketchum", date: "2024-07-01" },
  { id: 2, name: "Misty Waterflower", date: "2024-06-30" },
  // Adicionar mais usuários conforme necessário
];

const newPokemons = [
  {
    id: 1,
    name: "Pikachu",
    date: "2024-07-01",
    description: "",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png",
    rarity: 2,
    isShiny: false,
  },
  {
    id: 2,
    name: "Charizard",
    date: "2024-06-30",
    description: "",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    shinyImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/6.png",
    rarity: 4,
    isShiny: true,
  },
  // Adicionar mais Pokémons conforme necessário
];

const newRolls = [
  { id: 1, title: "Roll 1", date: "2024-07-05", result: "Pikachu" },
  { id: 2, title: "Roll 2", date: "2024-07-04", result: "Charmander" },
  // Adicionar mais rolls conforme necessário
];

export default function AdminDashboard() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="mx-auto mt-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          <div>
            <div className="bg-slate-700 text-white p-4 text-center shadow rounded-t-lg"
            style={{background: "rgba(40, 40, 40, 0.95)"}}>
              <h3 className="text-xl font-bold mb-2">Novos Usuários</h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg max-h-[800px] overflow-y-auto">
              {newUsers.map((user) => (
                <div key={user.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mt-4">
                  <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p>Data: {user.date}</p>
                  </div>
                  <div className="flex items-center">
                    <Link href={`/profile/${user.id}`} className="p-2 text-md bg-blue-600 rounded-lg hover:bg-blue-500 text-white">Ver Detalhes</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-slate-700 text-white p-4 text-center shadow rounded-t-lg"
            style={{background: "rgba(40, 40, 40, 0.95)"}}>
              <h3 className="text-xl font-bold mb-2">Novos Pokémons</h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg max-h-[800px] overflow-y-auto">
              {newPokemons.map((pokemon) => (
                <div key={pokemon.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mt-4">
                  <div>
                    <h2 className="text-xl font-bold">{pokemon.name}</h2>
                    <p>Data: {pokemon.date}</p>
                    <p>{pokemon.description}</p>
                  </div>
                  <div className="flex items-center">
                    <Link href={`/pokemon/${pokemon.id}`} className="p-2 text-md bg-blue-600 rounded-lg hover:bg-blue-500 text-white">Ver Detalhes</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-slate-700 text-white p-4 text-center shadow rounded-t-lg"
            style={{background: "rgba(40, 40, 40, 0.95)"}}>
              <h3 className="text-xl font-bold mb-2">Últimos Rolls</h3>
            </div>
            <div className="bg-white p-4 shadow rounded-b-lg max-h-[800px] overflow-y-auto">
              {newRolls.map((roll) => (
                <div key={roll.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mt-4">
                  <div>
                    <h2 className="text-xl font-bold">{roll.title}</h2>
                    <p>Data: {roll.date}</p>
                    <p>Resultado: {roll.result}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 text-md bg-blue-600 rounded-lg hover:bg-blue-500 text-white">Ver Detalhes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
