import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Reusable Function with different methods to make API requests
// Uses generic Type <T> to return different kind of data
async function makeRequest<T>(
	method: HttpMethod,
	url: string,
	data?: any
): Promise<T> {
	try {
		const config: AxiosRequestConfig = { method, url };

		if (data && (method === 'POST' || method === 'PUT')) {
			config.data = data;
		}

		const response: AxiosResponse<T> = await axios(config);
		return response.data;
	} catch (error) {
		throw new Error('Request failed');
	}
}

export default makeRequest;
