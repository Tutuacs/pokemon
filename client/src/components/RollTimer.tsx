// RollTimer.tsx
"use client";

import { useEffect, useState } from "react";
import { NavbarProfileProps, useNavbarContext } from "./NavBarProviders";

export default function RollTimer() {
  const { profile, setProfile } = useNavbarContext();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = Date.now();
      const diff = now - new Date(profile.lastChargeNormalRoll).getTime();
      const diffHours = diff / (1000 * 60 * 60);

      if (profile.normalRolls < 5) {
        const hoursLeft = Math.floor(4 - (diffHours % 4));
        const minutesLeft = Math.floor(
          60 - ((diff / (1000 * 60)) % 60)
        );
        const secondsLeft = Math.floor(
          60 - ((diff / 1000) % 60)
        );
        
        setTimeLeft(hoursLeft * 3600 + minutesLeft * 60 + secondsLeft);

        if (diffHours >= 4) {
          const rollsToAdd = Math.floor(diffHours / 4);
          const newRolls = Math.min(5, profile.normalRolls + rollsToAdd);

          if (newRolls > profile.normalRolls) {
            const newLastCharge = new Date(
              now - ((diffHours % 4) * 60 * 60 * 1000)
            );

            const newProfile: NavbarProfileProps = { ...profile };

            setProfile(newProfile);
          }
        }
      } else {
        setTimeLeft(null);
      }
    };

    updateTimeLeft();

    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [profile.normalRolls, profile.lastChargeNormalRoll]);

  return (
    <div className="p-2 border border-white rounded-lg">
      Normal Rolls: ({profile.normalRolls}/5)
      {profile.normalRolls < 5 && timeLeft !== null && (
        <span>
          {" - "}
          {Math.floor(timeLeft / 3600)}:
          {Math.floor((timeLeft % 3600) / 60)
            .toString()
            .padStart(2, "0")}
          :{(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
