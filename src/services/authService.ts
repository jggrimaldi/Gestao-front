import api from "./api";
import {
  DentistLoginRequest,
  DentistRequest,
  AuthResponse,
  DentistResponse,
  TokenResponse,
} from "../types";

const TOKEN_KEY = "auth_token";
const DENTIST_KEY = "current_dentist";

export const authService = {
  // Login
  login: async (data: DentistLoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    const { token, dentist } = response.data;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(DENTIST_KEY, JSON.stringify(dentist));

    return {
      token,
      dentist,
    };
  },

  // Cadastro
  register: async (data: DentistRequest): Promise<AuthResponse> => {
    // Primeiro cadastra o dentista
    const dentistResponse = await api.post<DentistResponse>("/dentista", data);
    const dentist = dentistResponse.data;

    // Depois faz login automaticamente
    const loginResponse = await api.post<TokenResponse>("/auth/login", {
      email: data.email,
      password: data.password,
    });
    const token = loginResponse.data.token;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(DENTIST_KEY, JSON.stringify(dentist));

    return {
      token,
      dentist,
    };
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(DENTIST_KEY);
  },

  // Obter dentista atual
  getCurrentDentist: (): DentistResponse | null => {
    const dentistStr = localStorage.getItem(DENTIST_KEY);
    return dentistStr ? JSON.parse(dentistStr) : null;
  },

  // Obter token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Verificar se está logado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
