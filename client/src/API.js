const API_URL ='https://localhost:1337';

export async function listLogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return(response.json());
}