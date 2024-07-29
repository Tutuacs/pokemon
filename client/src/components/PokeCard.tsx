"use client";

import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { usePathname } from "next/navigation";
import "./cardShine.css";

interface PokemonCardProps {
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
      setTimeout(() => setIsFlipping(false), 100); // Adjusted to match animation duration
      toggleNavbar(); // Toggle navbar visibility
    }
  };

  const toggleNavbar = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('visible');
    }
  };

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar && pathname === "/roll/stellar") {
      navbar.classList.remove('visible');
    }
  }, []);

  if (invert) {
    const aux = frontImage;
    frontImage = backImage;
    backImage = aux;
  }

  return (
    <>
      <style jsx>{`
        /* Container Styles */
        .box-panel {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 35px 0;
        }

        /* Card Container Styles */
        .card-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        /* Card Glow Styles */

        .card-container.glow::before {
          opacity: 1;
        }
        .card-container.shine::before {
          background: none;
        }

        /* Flip Box and Card Styles */
        .common-flip-style,
        .card {
          width: 250px;
          height: 350px;
          cursor: pointer;
          position: relative;
        }

        .common-box-style {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: absolute;
          width: 96%;
          height: 96%;
          transition: transform 0.6s ease-in-out;
          border-radius: 10px;
          overflow: hidden;
        }

        .card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: white;
          transition: transform 0.6s ease-in-out;
          border-radius: 10px;
          overflow: hidden;
        }

        .flip-box,
        .card {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        /* Flip Box Styles */
        .flip-box {
          transition: transform 0.2s;
        }

        .flip-box.flipped .box-front {
          transform: rotateY(-180deg);
        }

        .flip-box.flipped .box-back {
          transform: rotateY(0deg);
        }

        /* Box Front and Back Styles */
        .box-back {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .box-front {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotateY(0deg);
          z-index: 2;
          background-position: center center;
          background-size: cover;
          padding: 5px;
          background-repeat: no-repeat;
        }

        .box-back {
          transform: rotateY(180deg);
          z-index: 1;
        }

        /* Define a pulse animation for the box-shadow */
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

        /* Apply the animation to each rarity class */
        .normal {
          padding: 0px;
          box-shadow: 1px 1px 20px rgba(255, 255, 255, 1);
          animation: pulse 1.5s infinite;
        }

        .rare {
          padding: 0px;
          box-shadow: 1px 1px 20px rgba(0, 255, 0, 1);
          animation: pulse-green 1.5s infinite;
        }

        .super-rare {
          padding: 0px;
          box-shadow: 1px 1px 20px rgb(95, 207, 245);
          animation: pulse-lightblue 1.5s infinite;
        }

        .epic {
          padding: 0px;
          box-shadow: 1px 1px 20px rgba(128, 0, 128, 1);
          animation: pulse-purple 1.5s infinite;
        }

        .legendary {
          padding: 0px;
          box-shadow: 1px 1px 20px rgba(255, 255, 0);
          animation: pulse-yellow 1.5s infinite;
        }

        .mythic {
          padding: 0px;
          box-shadow: 1px 1px 20px rgba(255, 0, 0);
          animation: pulse-red 1.5s infinite;
        }

        @keyframes rotateText {
          0% {
            opacity: 0;
            transform: rotateY(180deg);
          }
          50% {
            opacity: 1;
            transform: rotateY(0deg);
          }
          100% {
            opacity: 0;
            transform: rotateY(-180deg);
          }
        }

        /* Apply the rotation animation to text */
        .card-text {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          font-size: 1.5rem;
          backface-visibility: hidden;
          transition: opacity 0.6s ease-in-out;
        }

        /* Hide text when card is flipped */
        .card-text.hidden {
          opacity: 0;
        }

        @keyframes shadowAnimation {
          0% {
            box-shadow: 1px 1px 20px;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
        }

        .card:nth-of-type(1):before,
        .card:nth-of-type(1):after {
          display: none;
        }

        .card:nth-of-type(2) {
          background: none;
        }

        .card:nth-of-type(2):before {
          display: none;
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
      `}</style>
    <CardContainer className={`box-panel inter ${isShiny ? "shine" : ""}`}>
      <CardBody className="card-wrapper flex flex-col justify-between">
        <CardItem className="cursor-pointer" onClick={handleCardClick}>
          <div
            className={`flip-box ${isFlipping ? "flipping" : ""} ${
              flipped ? "flipped" : ""
            } mx-1 my-1`}
          >
            <div
              className={`box-front common-box-style ${isShiny ? `shine`: rarity} bg-gray-800 text-white`}
              data-rarity={rarity}
              style={{
                width: `${isShiny ? width + 10 : width}px`,
                height: `${isShiny ? height + 10 : height}px`,
              }}
            >
              <img
              className=""
                src={backImage}
                alt="The back of a Pokemon Card"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div
              className={`box-back card ${isShiny ? `${rarity} shine`: rarity}  `}
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              <img
                src={frontImage}
                alt="Pokemon image not-found"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
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
            <CardItem translateZ={50} className="text-xl font-bold text-white">
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
    </>
  );
};

export default PokemonCard;
