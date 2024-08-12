import Link from "next/link";

export default function ProfileItem({ profile }: { profile: { id: string; name: string; email: string; _count: {Pokemon: number}} }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg mt-4 mx-4">
      <div>
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p>Email: {profile.email}</p>
        <p>Pokemons: {profile._count.Pokemon}</p>
      </div>
      <div className="flex items-center">
        <Link href={`/profile/${profile.id}`} className="p-2 text-md bg-blue-600 rounded-lg hover:bg-blue-500 text-white">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
