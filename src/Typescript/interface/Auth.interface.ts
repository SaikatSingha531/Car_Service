export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  token:string | boolean;
  role:string | null;
}
