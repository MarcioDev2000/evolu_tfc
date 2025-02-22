export interface Chat {
  id?: number;
  id_da_proposta?: number;
  id_da_proposta_dados?: {
    id_da_proposta?: number;
    comprador_id?: number;
    comprador_nome?: string;
    despachante_id?: number;
    despachante_nome?: string;
  };
  mensagem: string;
  id_do_comprador?: number; // Adicionado
  id_do_despachante?: number; // Adicionado
}
