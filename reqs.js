async function getStudents(client) {
    try {
        const {data, error} = await client.from('students').select('*').order('created_at', {ascending: false});

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
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

export {
    getStudents,
    postStudents
}