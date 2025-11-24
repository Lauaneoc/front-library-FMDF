export interface UseCaseError {
  status: number;
  message: string;
  errors: Record<string, string[]>;
}
