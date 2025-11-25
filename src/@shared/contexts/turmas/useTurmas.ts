import { useContext } from "react";
import { TurmasContext } from "./TurmasProvider";

export function useTurmas() {
  const ctx = useContext(TurmasContext);
  if (!ctx) throw new Error("useTurmas must be used inside TurmasProvider");
  return ctx;
}
