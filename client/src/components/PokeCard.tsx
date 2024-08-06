"use client";

import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { usePathname } from "next/navigation";
import "./cardShine.css";

export interface PokemonCardProps {
  frontImage: string;
  backImage: string;
  titleText?: string;
  subText?: string;
  invert?: boolean;
  isShiny?: boolean;
  width?: number; // Optional prop to control width
  height?: number; // Optional prop to control height
  rarity:
    | "normal"
    | "rare"
    | "super-rare"
    | "epic"
    | "mythic"
    | "legendary"
    | "shine";
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  frontImage,
  backImage,
  width = 250,
  height = 350,
  rarity,
  invert = false,
  isShiny = false,
  titleText = "",
  subText = "",
}) => {
  const [flipped, setFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const pathname = usePathname();

  const handleCardClick = () => {
    if (invert) return;
    if (!isFlipping) {
      setIsFlipping(true);
      setFlipped(!flipped);
      setTimeout(() => setIsFlipping(false), 600); // Ajustado para coincidir com a duração da animação
      toggleNavbar(); // Alterna a visibilidade da navbar
    }
  };

  const toggleNavbar = () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("visible");
    }
  };

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar && pathname === "/roll/stellar") {
      navbar.classList.remove("visible");
    }
  }, [pathname]);

  if (invert) {
    const aux = frontImage;
    frontImage = backImage;
    backImage = aux;
  }

  return (
    <>
      <style jsx>{`
        .card {
          background-color: transparent;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          box-shadow: 0 0 10px var(--shadow-color, rgba(0, 0, 0, 0.5));
          margin: 2px 2px;
          display: inline-block;
          vertical-align: middle;
          border-radius: 10px;
        }

        .card:before,
        .card:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background-image: linear-gradient(
            115deg,
            transparent 0%,
            rgb(0, 231, 255) 30%,
            rgb(255, 0, 231) 70%,
            transparent 100%
          );
          background-position: 0% 0%;
          background-repeat: no-repeat;
          background-size: 300% 300%;
          mix-blend-mode: color-dodge;
          opacity: 0;
          z-index: 1;
          transform: translate3d(0, 0, 0);
          animation: holoGradient 15s ease infinite;
        }

        .card::before {
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          transition: transform 0.3s ease, opacity 0.3s ease;
          pointer-events: none;
          opacity: 0;
        }

        @keyframes holoGradient {
          3% {
            opacity: 0;
          }
          5% {
            background-position: 0% 0%;
          }
          7% {
            opacity: 0.5;
          }
          9% {
            background-position: 100% 100%;
          }
          11% {
            opacity: 0;
          }
          50% {
            opacity: 0;
            background-position: 100% 100%;
          }
          55% {
            opacity: 0.3;
          }
          70% {
            opacity: 0;
            background-position: 0% 0%;
          }
        }

        .card-container {
          perspective: 1000px;
          position: relative;
        }

        .flip-box {
          width: ${width}px;
          height: ${height}px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-in-out;
        }

        .flipped {
          transform: rotateY(180deg);
        }

        .box-front,
        .box-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 10px;
          overflow: hidden;
        }

        .box-front {
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          z-index: 2;
          transform: rotateY(0deg);
        }

        .box-back {
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          z-index: 1;
          transform: rotateY(180deg);
        }

        @keyframes pulse {
          0% {
            box-shadow: 1px 1px 20px rgba(255, 255, 255, 1);
          }
          50% {
            box-shadow: 1px 1px 30px rgba(255, 255, 255, 0.9);
          }
          100% {
            box-shadow: 1px 1px 20px rgba(255, 255, 255, 1);
          }
        }

        @keyframes pulse-green {
          0% {
            box-shadow: 1px 1px 20px rgba(0, 255, 0, 1);
          }
          50% {
            box-shadow: 1px 1px 30px rgba(0, 255, 0, 0.9);
          }
          100% {
            box-shadow: 1px 1px 20px rgba(0, 255, 0, 1);
          }
        }

        @keyframes pulse-lightblue {
          0% {
            box-shadow: 1px 1px 20px rgba(95, 207, 245, 1);
          }
          50% {
            box-shadow: 1px 1px 30px rgba(95, 207, 245, 0.9);
          }
          100% {
            box-shadow: 1px 1px 20px rgba(95, 207, 245, 1);
          }
        }

        @keyframes pulse-purple {
          0% {
            box-shadow: 1px 1px 20px rgba(128, 0, 128, 1);
          }
          50% {
            box-shadow: 1px 1px 30px rgba(128, 0, 128, 0.9);
          }
          100% {
            box-shadow: 1px 1px 20px rgba(128, 0, 128, 1);
          }
        }

        @keyframes pulse-yellow {
          0% {
            box-shadow: 1px 1px 20px rgba(255, 255, 0, 1);
          }
          50% {
            box-shadow: 1px 1px 30px rgba(255, 255, 0, 0.9);
          }
          100% {
            box-shadow: 1px 1px 20px rgba(255, 255, 0, 1);
          }
        }

        @keyframes pulse-red {
          0% {
            box-shadow: 1px 1px 20px rgba(255, 0, 0, 1);
          }
          50% {
            box-shadow: 1px 1px 30px rgba(255, 0, 0, 0.9);
          }
          100% {
            box-shadow: 1px 1px 20px rgba(255, 0, 0, 1);
          }
        }

        .normal {
          box-shadow: 1px 1px 20px rgba(255, 255, 255, 1);
          animation: pulse 1.5s infinite;
        }

        .rare {
          box-shadow: 1px 1px 20px rgba(0, 255, 0, 1);
          animation: pulse-green 1.5s infinite;
        }

        .super-rare {
          box-shadow: 1px 1px 20px rgba(95, 207, 245, 1);
          animation: pulse-lightblue 1.5s infinite;
        }

        .epic {
          box-shadow: 1px 1px 20px rgba(128, 0, 128, 1);
          animation: pulse-purple 1.5s infinite;
        }

        .legendary {
          box-shadow: 1px 1px 20px rgba(255, 255, 0, 1);
          animation: pulse-yellow 1.5s infinite;
        }

        .mythic {
          box-shadow: 1px 1px 20px rgba(255, 0, 0, 1);
          animation: pulse-red 1.5s infinite;
        }
      `}</style>
      <div className="flex justify-center items-center">
        <CardContainer className={`box-panel inter`}>
          <CardBody className="card-wrapper flex flex-col justify-between">
            <CardItem className="cursor-pointer" onClick={handleCardClick}>
              <div
                className={`flip-box ${isFlipping ? "flipping" : ""} ${
                  flipped ? "flipped" : ""
                } mx-1 my-1`}
              >
                <div
                  className={`box-front common-box-style ${
                    isShiny ? `shine` : rarity
                  } text-white`}
                  data-rarity={rarity}
                  style={{
                    width: `${isShiny ? width + 10 : width}px`,
                    height: `${isShiny ? height + 10 : height}px`,
                    backgroundColor:
                      "radial-gradient(circle at top right, rgba(121, 68, 154, 0.13), transparent), radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent)",
                  }}
                >
                  <img
                    className={`${isShiny ? "m-1" : ""}`}
                    src={backImage}
                    alt="The back of a Pokemon Card"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      borderRadius: "10px",
                    }}
                  />
                  parte de tras/pokebola
                </div>
                <div
                  className={`box-back card ${
                    isShiny ? `${rarity}` : rarity
                  }  `}
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundImage: `${isShiny ? frontImage : ""}`,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      backgroundImage: `url(${frontImage})`,
                      backgroundSize: "cover",
                      mixBlendMode: "color-dodge",
                    }}
                  >
                  <div
                    className={`${isShiny ? "sparkles": ""}`}
                    style={{
                      width: "110%",
                      height: "110%",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                </div>
              </div>
            </CardItem>
            <div
              onClick={handleCardClick}
              className={`flex flex-col justify-between h-full w-full cursor-pointer ${
                titleText && subText ? "" : "hidden"
              }`}
            >
              <CardBody
                className={`flex flex-col justify-between h-full w-full cursor-pointer ${
                  titleText && subText ? "" : "hidden"
                }`}
              >
                <CardItem
                  translateZ={50}
                  className="text-xl font-bold text-white"
                >
                  {flipped || invert ? titleText : ""}
                </CardItem>
                <CardItem
                  translateZ={40}
                  className="text-xl font-bold text-white mt-auto flip-box"
                >
                  {flipped || invert ? subText : ""}
                </CardItem>
              </CardBody>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </>
  );
};

export default PokemonCard;
