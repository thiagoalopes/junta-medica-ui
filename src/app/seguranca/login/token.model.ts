export interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  data: {
    id: number,
		nome: string,
		email: string,
		cpf: string,
		matricula: string,
		celular: string,
		isbloqueado: boolean,
    permissoes: []
  }
}
