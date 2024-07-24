"use client";

import React, { useState } from "react";
import "../app/styles.css";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

interface PokemonCardProps {
  frontImage: string;
  backImage: string;
  titleText?: string;
  subText?: string;
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
  titleText = "",
  subText = "",
}) => {
  const [flipped, setFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardClick = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setFlipped(!flipped);
      setTimeout(() => setIsFlipping(false), 100); // Adjusted to match animation duration
    }
  };

  const isShiny = rarity === "shine";

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
              className={`box-front common-box-style ${rarity} bg-gray-800 text-white`}
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
              className={`box-back card ${rarity}`}
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
              {flipped ? titleText : ""}
            </CardItem>
            <CardItem
              translateZ={40}
              className="text-xl font-bold text-white mt-auto flip-box"
            >
              {flipped ? subText : ""}
            </CardItem>
          </CardBody>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default PokemonCard;
