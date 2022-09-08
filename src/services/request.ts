const baseUrl: string = `https://api.themoviedb.org/3`;

async function request(method: string, url: string): Promise<any> {
    const options = {
        method,
    };

    try {
        const response = await fetch(baseUrl + url, options);

        if (response.ok === false) {
            throw new Error(response.statusText);
        }

        const result = await response.json();

        return result;
    } catch (error: any) {
        throw error;
    }
}

export const get = request.bind(null, 'GET');
