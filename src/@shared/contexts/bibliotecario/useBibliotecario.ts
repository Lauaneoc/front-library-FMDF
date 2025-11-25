import { useContext } from "react";
import { BibliotecarioContext } from "./BibliotecarioProvider";

export function useBibliotecario() {
  const ctx = useContext(BibliotecarioContext);
  if (!ctx) throw new Error("useBibliotecario must be used inside BibliotecarioProvider");
  return ctx;
}
