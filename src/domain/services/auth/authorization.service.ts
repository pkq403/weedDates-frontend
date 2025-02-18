import { Token } from '@/domain/models/auth.model';
import { Api } from '@/domain/core/constants';

export class AuthorizationService {
	static hasToken(): boolean {
		return !!AuthorizationService.safeGetAuthorization();
	}

	static safeGetAuthorization(): Token | undefined {
		try {
			return AuthorizationService.getAuthorization();
		} catch (err) {
			throw new Error('Authorization not found!');
		}
	}

	static getAuthorization(): Token {
		try {
			const auth = localStorage.getItem('auth:token');
			return JSON.parse(auth || '') as Token;
		} catch (err) {
			throw new Error(
				'AuthorizationService :: Unable to retrieve authorization!'
			);
		}
	}

	static saveAuthorization(token: Token) {
		localStorage.setItem('auth:token', JSON.stringify(token));
	}

	static removeAuthorization() {
		localStorage.removeItem('auth:token');
	}

	/**
	 * @param param email / password object
	 * @returns
	 */
	static login({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): Promise<Token> {
		const data = new URLSearchParams({ username, password });
		return fetch(Api.baseURL + Api.login, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data.toString(),
		})
			.then((r) => {
				return r.json();
			})
			.then((token) => {
				AuthorizationService.saveAuthorization({
					...token,
				});
				return token;
			});
	}
	static register({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): Promise<boolean> {
		return fetch(Api.baseURL + Api.register, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username, password})
		}).then(r => r.status === 201 ? true : false)
		.catch(_ => false);
	}
}
