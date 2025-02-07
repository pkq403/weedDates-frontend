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
			return undefined;
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
		password,
		username,
	}: {
		password: string;
		username: string;
	}): Promise<Token> {
		return fetch(Api.baseURL + Api.login, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		})
			.then((r) => r.json())
			.then((token) => {
				AuthorizationService.saveAuthorization({
					...token,
					expires_in: 60_000,
				});
				return token;
			});
	}
}