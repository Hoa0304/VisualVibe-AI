export interface User {
    email: string;
    userName?: string;
    password: string;
}

export interface UserState {
    currentUser: string | null;
    loading: boolean;
    error: string | false; 
}

export interface RootState {
    user: {
      loading: boolean;
      error: string | false;
    };
}
  