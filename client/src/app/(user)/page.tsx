import PokemonCard from "@/components/PokeCard";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen">
        <div className="flex flex-col">
          <div className="grid grid-cols-5 w-full justify-center mt-20 mb-40">
            <span className="col-span-1" />
            <div className="col-span-2 text-white mr-20">
              <div className="text-6xl">PokéRolls</div>
              <br />
              <p className="text-xl text-wrap">
                Seja bem vindo ao PokeRolls, um site onde você pode colecionar
                seus pokémons favoritos com seus amigos. Atualmente estamos em
                desenvolvimento, sugestões e críticas construtivas sempre serão
                bem vindas.
              </p>
              <br />
              <div className="text-4xl text-green-400">Como começar</div>
              <br />
              <p className="text-xl text-wrap">
                Ao se cadastrar, você receberá um pacote de 30 Rolls gratuitos e
                uma chance aumentada em pokemons lendários. Clicando em
                normalRolls será possivel abrir pacotes nos banners existentes,
                seus Rolls carregam a cada 4 horas com um limite atual de 5.
              </p>
              <br />
              <div className="text-4xl text-amber-400">Drop rating</div>
              <br />
              <p className="text-xl text-wrap">
                Acessando seu perfil você terá acesso a todos os drop-rates do
                seu usuário, podendo ver a chance de captura de cada raridade.
                Pokemons mais raros após atingirem 100% podem ser capturados em
                até 11 tentativas
              </p>
              <br />
              <div className="text-4xl text-fuchsia-400">Limitações atuais</div>
              <br />
              <p className="text-xl text-wrap">
                Atualmente não suportamos aparelhos móveis, estou trabalhando
                para que o site seja acessível em qualquer dispositivo
                futuramente. A quantidade de pokemons existentes é limitada, mas
                estou trabalhando para adicionar mais pokemons a cada semana.
              </p>
              <br />
              <div className="text-4xl text-red-400">Acesso a informações</div>
              <br />
              <p className="text-xl text-wrap">
                Entrando na Home, você poderá ver os pokemons adicionados
                recentemente, seus ultimos pokemons capturados e você pode ter
                acesso ao seu perfil. Estou disponível no discord para qualquer
                dúvida ou sugestão. (Não criei um servidor, este é meu discord
                privado)
              </p>
              <br />
              <p className="text-xl text-wrap">
                Atualmente preciso de administradores para criar pokemons. é
                possivel usar a API para seu projeto front-end pessoal, para
                isso e mais entre em contato através do discord.
              </p>
              <br />
              <div className="flex">
                <p>
                  <a
                    className="animate-pulse bg-white text-black p-1 rounded-lg"
                    href="https://discord.com/invite/zHuMxdcq"
                  >
                    Discord:
                  </a>{" "}
                  Tutuacs / tutuacs{" "}
                </p>
              </div>
              <br />
              <div>
                <div className="text-4xl text-teal-400">
                  Futuras atualizações
                </div>
                <br />
                <ul className="list-disc pl-5">
                  <li>
                    Evolução de pokemons (Será possivel evoluir pokemons
                    mantendo seu nível shiny)
                  </li>
                  <li>
                    Shop (adicionar uma loja para compra de ítens como comida,
                    Rolls, PokePoints...) <br />{" "}
                    <span className="text-teal-200">
                      Compras com moedas do jogo sem dinheiro real
                    </span>
                  </li>
                  <li>Opção de login com contas Google</li>
                  <li>Banners de temporada e mais banners fixos</li>
                  <li>Trade options (Troca de pokemons com outros usuários)</li>
                </ul>
              </div>
            </div>
            <div className="justify-start">
              <PokemonCard
                rarity="legendary"
                frontImage="https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/dragonite-watercolor-jo-kiwi.jpg"
                backImage="https://utfs.io/f/04c1aab2-8510-46a6-9044-35a767385d5e-427qdm.jpg"
                flipOneTime={false}
                isShiny={true}
              />
            </div>
            <span className="col-span-1" />
          </div>
        </div>
      </div>
    </main>
  );
}
