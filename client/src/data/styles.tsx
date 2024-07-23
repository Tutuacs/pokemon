export const tailwindClasses = {
  root: {
    "--color1": "rgb(0, 231, 255)",
    "--color2": "rgb(255, 0, 231)",
    "--back": "url(https://cdn2.bulbagarden.net/upload/1/17/Cardback.jpg)",
    "--mewtwo1": "#efb2fb",
    "--mewtwo2": "#acc6f8",
    "--mewtwofront": "url(https://assets.codepen.io/13471/mewtwo-gx.webp)",
  },
  card: "relative overflow-hidden m-5 rounded-[5%_/_3.5%] shadow-[0_55px_35px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out bg-[#040712] bg-cover bg-no-repeat bg-center",
  cardHover:
    "shadow-[0_0_13px_4px_rgba(255,255,255,0.3),_0_55px_35px_-20px_rgba(0,0,0,0.5)]",
  mewtwo: {
    "--color1": "var(--mewtwo1)",
    "--color2": "var(--mewtwo2)",
    "--front": "var(--mewtwofront)",
  },
  cardBefore:
    "absolute left-0 right-0 top-0 bottom-0 bg-no-repeat opacity-50 mix-blend-color-dodge transition-all duration-300 ease-in-out",
  cardAfter:
    'absolute left-0 right-0 top-0 bottom-0 bg-no-repeat opacity-75 mix-blend-color-dodge transition-all duration-300 ease-in-out bg-[url("https://assets.codepen.io/13471/sparkles.gif"),_url(https://assets.codepen.io/13471/holo.png),_linear-gradient(125deg,#ff008450_15%,#fca40040_30%,#ffff0030_40%,#00ff8a20_60%,#00cfff40_70%,#cc4cfa50_85%)] bg-center bg-[160%]',
  active: "transition-shadow duration-100 ease-out",
  animated: "animation-none",
};

export const keyframes = {
  holoSparkle: {
    "0%, 100%":
      "opacity: 0.75; background-position: 50% 50%; filter: brightness(1.2) contrast(1.25);",
    "5%, 8%":
      "opacity: 1; background-position: 40% 40%; filter: brightness(.8) contrast(1.2);",
    "13%, 16%":
      "opacity: .5; background-position: 50% 50%; filter: brightness(1.2) contrast(.8);",
    "35%, 38%":
      "opacity: 1; background-position: 60% 60%; filter: brightness(1) contrast(1);",
    "55%":
      "opacity: .33; background-position: 45% 45%; filter: brightness(1.2) contrast(1.25);",
  },
  holoGradient: {
    "0%, 100%":
      "opacity: 0.5; background-position: 50% 50%; filter: brightness(.5) contrast(1);",
    "5%, 9%":
      "background-position: 100% 100%; opacity: 1; filter: brightness(.75) contrast(1.25);",
    "13%, 17%": "background-position: 0% 0%; opacity: .88;",
    "35%, 39%":
      "background-position: 100% 100%; opacity: 1; filter: brightness(.5) contrast(1);",
    "55%":
      "background-position: 0% 0%; opacity: 1; filter: brightness(.75) contrast(1.25);",
  },
  holoCard: {
    "0%, 100%": "transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);",
    "5%, 8%": "transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);",
    "13%, 16%": "transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);",
    "35%, 38%": "transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);",
    "55%": "transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);",
  },
};
