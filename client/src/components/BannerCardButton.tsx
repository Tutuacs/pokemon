"use client";

import { useNavbarContext } from "./NavBarProviders";
import { useRouter } from "next/navigation";

export default function BannerCardButton() {
  const { profile } = useNavbarContext();
  const router = useRouter();

  const onClick = () => {
    console.log("profile", profile);
    if (profile) {
      console.log("profileRolls", profile.normalRolls);
      if (profile.normalRolls > 0) {
        router.prefetch("/roll/stellar");
        // wait 1 second before redirecting
        setTimeout(() => {
          router.push("/roll/stellar");
        }, 500);
      }else {
        alert("You don't have enough rolls to roll a pokemon");
      }
    }else {
      alert("You don't have enough rolls to roll a pokemon");
    }
  };

  return (
    <main>
      <div className="flex justify-end p-4">
        <button
          onClick={onClick}
          className="custom-button text-white rounded-lg button "
          >
          Roletar pokemon
        </button>
      </div>
    </main>
  );
}
