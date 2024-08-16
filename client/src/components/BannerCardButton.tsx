"use client";

import { useNavbarContext } from "./NavBarProviders";
import { redirect } from "next/navigation";

export default function BannerCardButton() {
  const { profile } = useNavbarContext();

  const onClick = () => {
    if (profile) {
      if (profile.normalRolls > 0) {
        redirect("/roll/stellar");
      }
    }
    alert("You don't have enough rolls to roll a pokemon");
  };

  return (
    <main>
        <button
          onClick={onClick}
          className="custom-button text-white rounded-lg button flex justify-end p-4"
          >
          Roletar pokemon
        </button>
    </main>
  );
}
