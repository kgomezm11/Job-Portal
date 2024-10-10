import Cookies from 'js-cookie';

// check if the user has applied for a specific job
export const checkIfApplied = async (jobId, userId) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/checkIfApplied?jobId=${jobId}&userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error in checking if applied (service) => ', error);
        return { success: false }; // Asegúrate de retornar un valor por defecto en caso de error
    }
}
