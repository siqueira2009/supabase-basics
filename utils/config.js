// Cria variáveis com a URL e a chave anônima do Supabase

// IMPORTANTE: ESSES VALORES DEVERIAM ESTAR EM UM .env, MAS POR MOTIVOS INSTITUCIONAIS ESTÃO HARDCODED
// EU ENTENDO QUE ISTO É UMA PÉSSIMA PRÁTICA!!
const SUPABASE_URL = "https://kjqgvlonlkodstytmdev.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6Yv5Jp_RYe5Yhf8v_ynJKg_CDrYkQ0j";

// Função que cria uma conexão com o Supabase
export async function createConnection() {
    // Cria e retorna um objeto que faz requisições HTTP
    // Usam os valores no header
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    return client;
}