"use client";
import Typewriter from "typewriter-effect";

export default function TypeEffect() {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("Your Ultimate DEX Aggregator")
          .pauseFor(1000)
          .typeString(" on Mode Network")
          .start();
      }}
    />
  );
}
