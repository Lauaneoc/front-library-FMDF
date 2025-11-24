import { useContext } from "react";
import { StudentContext } from "./StudentProvider";

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used inside StudentProvider");
  return ctx;
}
