"use client";

import React, { useState } from 'react';
import './form.css';
import PokemonCard from '@/components/PokeCard';

export default function PokemonIdPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/charizard-watercolor-jo-kiwi.jpg',
    shinyImage: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/mega-charizard-x-jo-kiwi.jpg',
    rarity: '4',
    evolveFood: 0,
    evolvePokePoints: 0,
  });

  const [isShiny, setIsShiny] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShinyChange = () => {
    setIsShiny(!isShiny);
  };

  const rarityOptions: { value: number; label: "normal" | "rare" | "super-rare" | "epic" | "mythic" | "legendary" | "shine" }[] = [
    { value: 0, label: 'normal' },
    { value: 1, label: 'rare' },
    { value: 2, label: 'super-rare' },
    { value: 3, label: 'epic' },
    { value: 4, label: 'mythic' },
    { value: 5, label: 'legendary' },
  ];

  return (
    <main className="create-pokemon-page flex">
      <div className="form-container w-2/3 p-6 bg-white rounded-lg shadow-lg">
        <form className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Create Pokemon</h2>
          <label className="block">
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="block">
            Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" />
          </label>
          <label className="block">
            Image URL:
            <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="block">
            Shiny Image URL:
            <input type="text" name="shinyImage" value={formData.shinyImage} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="block">
            Rarity:
            <select name="rarity" value={formData.rarity} onChange={handleInputChange} className="form-select">
              {rarityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            Evolve Food:
            <input type="number" name="evolveFood" value={formData.evolveFood} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="block">
            Evolve PokePoints:
            <input type="number" name="evolvePokePoints" value={formData.evolvePokePoints} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="block items-center">
            Shiny:
            <input type="checkbox" checked={isShiny} onChange={handleShinyChange} className="form-checkbox ml-2" />
          </label>
        </form>
      </div>
      <div className="preview-container w-1/3 p-6 flex items-center justify-center">
        <PokemonCard
          rarity={rarityOptions[Number(formData.rarity)].label.toLowerCase() as "normal" | "rare" | "super-rare" | "epic" | "mythic" | "legendary" | "shine"}
          frontImage={isShiny ? formData.shinyImage : formData.image}
          backImage="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
          titleText={formData.name}
          subText={formData.description}
          isShiny={isShiny}
        />
      </div>
    </main>
  );
};