import { createWarn } from "../index/script.js";

async function getStudents(client) {
    try {
        const {data, error} = await client.from('students').select('*').order('created_at', {ascending: false});

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        createWarn('Erro ao criar alunos', error.message)

        console.log(`[GET STUDENTS] Error while trying to get students:`);
        console.error(error);
        return null;
    }    
}

async function postStudents(client, student) {
    try {
        const {data, error} = await client.from('students').insert(student).select();

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        console.log(`[POST STUDENTS] Error while trying to post student(s):`);
        console.error(error);
        return null;
    } 
}

async function deleteStudent(client, id) {
    try {
        const {data, error} = await client.from('students').delete().eq('id', id);

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        console.log(`[DELETE STUDENTS] Error while trying to delete student:`);
        console.error(error);
        return null;
    }  
}

async function updateStudent(client, field, value, id) {
    try {
        const payload = {}
        payload[field] = value

        const { data, error } = await client.from('students').update(payload).eq('id', id).select();

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        console.log(`[DELETE STUDENTS] Error while trying to delete student:`);
        console.error(error);
        return null;
    }  
}

export {
    getStudents,
    postStudents,
    deleteStudent,
    updateStudent
}