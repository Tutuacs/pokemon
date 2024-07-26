"use client";

import React, { useState, useEffect } from "react";
import "../app/card.css";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { usePathname } from "next/navigation";

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
  );
};

export default PokemonCard;
