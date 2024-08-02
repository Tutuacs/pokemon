import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Navbar from "@/components/Navbar";
import "../../components/navbar.css";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  let role = -1;

  let profile: {
    id: string;
    email: string;
    role: number;
    name: string;
    normalRolls: number;
    lastChargeNormalRoll: Date;
    food: number;
    gold: number;
    pokePoints: number;
    pokeStars: number;
    pokemons: number;
  } = {
    id: "0c8dfa6d-8dd1-46da-a680-86ad6ba02b85",
    email: "admin@admin.com",
    role: 0,
    name: "admin",
    normalRolls: 5,
    lastChargeNormalRoll: new Date("2024-08-02T17:05:03.691Z"),
    food: 0,
    gold: 0,
    pokePoints: 0,
    pokeStars: 0,
    pokemons: 0,
  };
  if (session) {
    role = session!.profile.role!;
    profile = session!.profile;
  }

  const type = role;
  const logged = type !== -1;

  return (
    <>
      <main>
        <Navbar type={type} logged={logged} profile={profile} />
        <div className="mt-28">{children}</div>
      </main>
    </>
  );
}
