"use client";

import Link from "next/link";
import { useNavbarContext } from "./NavBarProviders";

export default function BannerCardButton() {
  const { profile } = useNavbarContext();

  const profileOK = profile ? (profile.normalRolls > 0 ? true : false) : false;

  return (
    <main>
      <div className="flex justify-end p-4">
        <Link
          href={profileOK ? "/roll/stellar" : ""}
          className="custom-button text-white rounded-lg button"
        >
          <span>Roletar pokemon</span>
        </Link>
      </div>
    </main>
  );
}
