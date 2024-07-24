import React from "react";
import Link from "next/link";
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
    imageUrl: "",
  };

  return (
    <main className="sm:grid-rows-3 gap-0 h-full bg-gray-800">
      <PokemonCard
        rarity="mythic"
        frontImage="https://cdn.pixabay.com/photo/2020/08/29/16/08/pikachu-5527377_960_720.jpg"
        backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
      />
      <PokemonCard
        rarity="legendary"
        titleText="Pokemon Title"
        subText="Pokemon Subtitle"
        frontImage="https://images.pokemontcg.io/swsh12pt5/160_hires.png"
        backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
      />
      <PokemonCard
        rarity="shine"
        frontImage="https://render.fineartamerica.com/images/rendered/default/greeting-card/images/artworkimages/medium/3/charizard-pokemon-gold-jo-kiwi.jpg?&targetx=0&targety=0&imagewidth=500&imageheight=700&modelwidth=500&modelheight=700&backgroundcolor=C49B3F&orientation=1"
        backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
      />
    </main>
  );
}
