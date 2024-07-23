import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import PokemonCard from "@/components/PokeCard";
// import "./styles.css";

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }

  const data = {
    number: 1,
    imageUrl: "https://images.pokemontcg.io/swsh12pt5/160_hires.png",
  };

  return (
    <main>
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <PokemonCard
          frontImage="https://images.pokemontcg.io/swsh12pt5/160_hires.png"
          backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
        />
      </div>
    </main>
  );
}
