import { useContext } from "react";
import { LivrosContext } from "./LivrosProvider";

export function useLivros() {
  const ctx = useContext(LivrosContext);
  if (!ctx) throw new Error("useLivros must be used inside LivrosProvider");
  return ctx;
}
