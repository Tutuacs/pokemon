"use client";

import React, { useState } from "react";
import "../app/styles.css";
import { CardBody, CardContainer } from "./ui/3d-card";

interface PokemonCardProps {
  frontImage: string;
  backImage: string;
  width?: number; // Optional prop to control width
  height?: number; // Optional prop to control height
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  frontImage,
  backImage,
  width = 250, // Default width
  height = 350, // Default height
}) => {
  const [flipped, setFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardClick = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setFlipped(!flipped);
      setTimeout(() => setIsFlipping(false), 1000); // Duration of the flip animation
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const tiltX = ((clientX - centerX) / width) * 10; // Adjust tilt factor
    const tiltY = ((clientY - centerY) / height) * -10; // Adjust tilt factor

    const card = currentTarget.querySelector(".flip-box") as HTMLElement;

    if (card) {
      card.style.setProperty("--tilt-x", tiltX.toFixed(2));
      card.style.setProperty("--tilt-y", tiltY.toFixed(2));
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.querySelector(".flip-box") as HTMLElement;

    if (card) {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    }
  };

  return (
    <CardContainer className="box-panel mb-20 inter">
      <CardBody className="widget-container card-wrapper">
        <div
          className={`flip-box ${isFlipping ? "flipping" : ""} ${
            flipped ? "flipped" : ""
          } tilt`}
          onClick={handleCardClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="box-front common-box-style card"
            data-rarity="rare holo"
            style={{
              backgroundImage: `url(${backImage})`,
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            <div className="box-content-wrapper">
              {/* Conteúdo adicional para a frente do cartão pode ser adicionado aqui */}
            </div>
          </div>
          <div
            className="box-back common-box-style card"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <img
              src={frontImage}
              alt="The back of a Pokemon Card"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default PokemonCard;
