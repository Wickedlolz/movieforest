const baseUrl: string = `https://api.themoviedb.org/3`;

async function request(url: string): Promise<any> {
    try {
        const response = await fetch(baseUrl + url);

        if (response.ok === false) {
            throw new Error(response.statusText);
        }

        const result = await response.json();

        return result;
    } catch (error: any) {
        throw error;
    }
}

export default request;
