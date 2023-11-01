"use client";

import React from "react";
import { signal } from "@preact/signals-react";
const count = signal(10);
setInterval(() => {
  count.value = Math.random();
}, 500);
export const Lol = () => {
  return <p>{count?.value}</p>;
};
