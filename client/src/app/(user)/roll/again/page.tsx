"use client";

import { useRouter } from "next/navigation";

export default function RollAgain() {
    const route = useRouter();

    route.push("/roll/stellar");

    return null;
}