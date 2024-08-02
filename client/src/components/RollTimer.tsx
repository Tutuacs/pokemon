"use client";

import { useEffect, useState } from "react";

interface RollTimerProps {
  normalRolls: number;
  lastChargeNormalRoll: Date;
}

export default function RollTimer({
  normalRolls,
  lastChargeNormalRoll,
}: RollTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [rolls, setRolls] = useState(normalRolls);
  const [lastCharge, setLastCharge] = useState(new Date(lastChargeNormalRoll));

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = Date.now();
      const diff = now - lastCharge.getTime();
      const diffHours = diff / (1000 * 60 * 60);

      if (rolls < 5) {
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
          const newRolls = Math.min(5, rolls + rollsToAdd);
          setRolls(newRolls);

          if (newRolls > rolls) {
            const newLastCharge = new Date(
              now - ((diffHours % 4) * 60 * 60 * 1000)
            );
            setLastCharge(newLastCharge);
          }
        }
      } else {
        setTimeLeft(null);
      }
    };

    updateTimeLeft();

    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [rolls, lastCharge]);

  return (
    <div className="p-2 border border-white rounded-lg">
      Normal Rolls: ({rolls}/5)
      {rolls < 5 && timeLeft !== null && (
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
