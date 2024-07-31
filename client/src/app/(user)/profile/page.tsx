import ProfileItem from "@/components/ProfileItem";

const users = [
  { pokemons: 5, id: 1, name: "Ash Ketchum", email: "ash@example.com" },
  {
    pokemons: 16,
    id: 2,
    name: "Misty Waterflower",
    email: "misty@example.com",
  },
  { pokemons: 2, id: 3, name: "Brock Harrison", email: "brock@example.com" },
  { pokemons: 0, id: 4, name: "Gary Oak", email: "gary@example.com" },
];

export default function AdminUsersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div>
        <div className="mx-auto h-20 p-4 min-h-10 mt-10 text-center justify-center w-2/4 text-white text-2xl font-bold rounded-t-lg"
        style={{background: "rgba(40, 40, 40, 0.95)"}}>
          Gerenciar Usuários
        </div>
        <section className="mx-auto bg-white flex min-h-[800px] w-2/4 rounded-b-lg mb-10">
          <div className="m-4 w-full bg-gray-200 rounded-lg flex flex-col max-h-[800px] overflow-y-auto">
            {users.map((user) => (
              <ProfileItem key={user.id} profile={user} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
