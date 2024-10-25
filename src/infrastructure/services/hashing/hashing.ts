export interface HashingService {
  hash: (value: string) => Promise<string>;
  compare: (hashed: string, value: string) => Promise<boolean>;
}
