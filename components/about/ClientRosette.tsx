"use client";

import dynamic from "next/dynamic";

/**
 * The shared <Rosette> places its dots with Math.cos/sin, whose last decimal
 * can differ between Node and the browser (a hydration warning). It draws
 * itself in on scroll anyway, so render it on the client only.
 */
export const ClientRosette = dynamic(() => import("@/components/art/Rosette").then((mod) => mod.Rosette), {
  ssr: false,
});
