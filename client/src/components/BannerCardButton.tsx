"use client";

import { useNavbarContext } from "./NavBarProviders";
import { redirect } from "next/navigation";

export default function BannerCardButton() {
  const { profile } = useNavbarContext();

<<<<<<< HEAD
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
      <div className="flex justify-end p-4">
        <button
          onClick={onClick}
=======
  return (
    <main>
      <div className="flex justify-end p-4">
        <Link
          href={profile ? (profile.normalRolls > 0 ? "/roll/stellar" : "" ) : ""}
>>>>>>> dc26536c466b1e436e117000b09e8b4fa8ce7abf
          className="custom-button text-white rounded-lg button"
        >
          <span>Roletar pokemon</span>
        </button>
      </div>
    </main>
  );
}
