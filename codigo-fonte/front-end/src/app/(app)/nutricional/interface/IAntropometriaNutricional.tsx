export interface IAntropometriaNutricional {
  id: number;
  uid: string;
  triagem: "NRS2002" | "MNA";
  triagem_obs: string;
  escore: string;
  triagem_classificacao: string;
  perda_peso: string;
  peso_atual: string;
  peso_estimado: string;
  peso_seco: string;
  pp_kg: string;
  pp: string;
  pp_tempo: string;
  pp_classificacao: "M" | "G";
  altura_atual: string;
  altura_estimada: string;
  altura_aj: string;
  imc: string;
  imc_classificacao: string;
  circ_braco: string;
  braco_lado: "E" | "D";
  circ_braco_percentil: string;
  circ_braco_classificacao: string; //mudar tipagem back
  circ_panturrilha: string;
  circ_panturrilha_percentil: string;
  circ_panturrilha_classificacao: string; //mudar tipagem back
  circ_abdominal: string;
  criado_em: Date;
  atualizado_em: Date;
  id_ficha_nutricional: number;
}