import { useContext } from "react";
import { ExemplaresContext } from "./ExemplaresProvider";

export function useExemplares() {
  const ctx = useContext(ExemplaresContext);
  if (!ctx) throw new Error("useExemplares must be used inside ExemplaresProvider");
  return ctx;
}
