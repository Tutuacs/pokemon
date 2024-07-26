import Navbar from "@/components/Navbar";
import PokemonCard from "@/components/PokeCard";
import StellarAnimation from "@/components/StellarAnimation";

export default function  StellarPage() {
  return (
    <main>
      <StellarAnimation>
        <PokemonCard
          rarity="legendary"
          frontImage="https://render.fineartamerica.com/images/rendered/default/greeting-card/images/artworkimages/medium/3/charizard-pokemon-gold-jo-kiwi.jpg?&targetx=0&targety=0&imagewidth=500&imageheight=700&modelwidth=500&modelheight=700&backgroundcolor=C49B3F&orientation=1"
          backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
          isShiny={true}
        />
      </StellarAnimation>
    </main>
  );
}
