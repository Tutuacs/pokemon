import PokemonCard from "@/components/PokeCard";

export default function Home() {

  return (
    <main>
      <div className="">
          <PokemonCard
            rarity="mythic"
            frontImage="https://cdn.pixabay.com/photo/2020/08/29/16/08/pikachu-5527377_960_720.jpg"
            backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
            flipOneTime={false}
          />
      </div>
    </main>
  );
}
