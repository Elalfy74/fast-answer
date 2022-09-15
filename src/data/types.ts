export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed' | 'finished';

export type User = {
  UserName?: string;
  FirstName: string;
  LastName?: string;
  Email: string;
  Bio?: string;
  UniversityLevel?: string;
  PhotoUrl?: string;
  College?: string;
  Major?: string;
  Birthdate?: string;
  // As My fake Data is already a string
  PhoneNumber?: string;
};
