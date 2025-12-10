export function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function maskExemplarId(value: string) {
  return `EX${String(value).padStart(3, "0")}`;
}

export function maskTurmaId(value: string) {
  return `TUR${String(value).padStart(3, "0")}`;
}

export function maskLocacaoId(value: string) {
  return `LOC${String(value).padStart(3, "0")}`;
}
