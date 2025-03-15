export interface User {
  nome: string;
  sobrenome: string;
  endereco: string;
  telefone: string;
  email: string;
  password: string;
  nif: string;
  tipoUsuario: string;
  matricula?: string | null;
  especialidade?: string | null;
  status?: boolean;
}
