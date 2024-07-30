import PokemonCard from "@/components/PokeCard";

export default function Home() {
  return (
    <main>
      <div className="">
          <PokemonCard
            rarity="mythic"
            frontImage="https://cdn.pixabay.com/photo/2020/08/29/16/08/pikachu-5527377_960_720.jpg"
            backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
          />
        <PokemonCard
          rarity="legendary"
          titleText="Pokemon Title"
          subText="Pokemon Subtitle"
          invert={true}
          frontImage="https://images.pokemontcg.io/swsh12pt5/160_hires.png"
          backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
        />
        <PokemonCard
          rarity="legendary"
          frontImage="https://render.fineartamerica.com/images/rendered/default/greeting-card/images/artworkimages/medium/3/charizard-pokemon-gold-jo-kiwi.jpg?&targetx=0&targety=0&imagewidth=500&imageheight=700&modelwidth=500&modelheight=700&backgroundcolor=C49B3F&orientation=1"
          backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
          isShiny={true}
        />
      </div>
    </main>
  );
}
