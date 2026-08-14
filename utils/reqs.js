// Importa a função de criar aviso
import { createWarn } from "./warn.js";

// Função responsável por pegar os usuários do banco
async function getStudents(client) {
    // Todas elas tem um try...catch que tenta pegar os dados e executa um código quando dá erro
    try {
        // Pega a resposta e o erro (caso tenho) da tabela students, selecionando tudo e ordenando de forma decrescente usando a data de criação
        const {data, error} = await client.from('students').select('*').order('created_at', {ascending: false});

        // Se der erro...
        if (error) {
            // Joga ele para o catch
            throw error;
        } else { // Se der certo...
            // Retorna os dados
            return data;
        }
    } catch (error) { // Em caso de erro...
        // Exibe o aviso na página
        createWarn('Erro ao exibir alunos', error.message);

        // Mostra os resultados no console e retorna null
        console.log(`[GET STUDENTS] Error while trying to get students:`);
        console.error(error);
        return null;
    }    
}

// Função responsável por adicionar os usuários do banco
async function postStudents(client, student) {
    try {
        // Pega a resposta e o erro (caso tenho) da tabela students, inserindo um aluno e selecionando o mesmo após isto
        const {data, error} = await client.from('students').insert(student).select();

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        createWarn('Erro ao criar alunos', error.message);

        console.log(`[POST STUDENTS] Error while trying to post student(s):`);
        console.error(error);
        return null;
    } 
}

// Função responsável por adicionar os usuários do banco
async function deleteStudent(client, id) {
    try {
        // Pega a resposta e o erro (caso tenho) da tabela students, deletando um aluno usando o seu ID
        const {data, error} = await client.from('students').delete().eq('id', id);

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        createWarn('Erro ao excluir alunos', error.message);

        console.log(`[DELETE STUDENTS] Error while trying to delete student:`);
        console.error(error);
        return null;
    }  
}

// Função responsável por adicionar os usuários do banco
async function updateStudent(client, field, value, id) {
    try {
        // Configura um payload (body) com os dados necessários
        const payload = {}
        payload[field] = value

        // Pega a resposta e o erro (caso tenho) da tabela students, atualizando um aluno usando o seu ID e o body. Depois seleciona o aluno modificado
        const { data, error } = await client.from('students').update(payload).eq('id', id).select();

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        createWarn('Erro ao atualizar alunos', error.message);

        console.log(`[DELETE STUDENTS] Error while trying to delete student:`);
        console.error(error);
        return null;
    }  
}

// Exporta todas as funções para serem usadas foram daqui
export {
    getStudents,
    postStudents,
    deleteStudent,
    updateStudent
}