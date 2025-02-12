import { WeedDate } from '../models/weedDate.model';
import { Api } from '../core/constants';
import { AuthorizationService } from './auth/authorization.service';
export class WeedDatesService {
	static getMyWeedDates(datee: Date): Promise<WeedDate[]> {
		const authorizationObject = AuthorizationService.safeGetAuthorization();

		return fetch(Api.baseURL + Api.myWeedDates + '?' + new URLSearchParams({
            "month-date": datee.toISOString().split('T')[0]
        }), {
			headers: {
				'Authentication': ` Bearer ${authorizationObject?.access_token}`,
                'Content-Type': 'application/json'
			}
		}).then(r => {
            console.log(JSON.stringify(r))
            // TODO: pasar del json a un objeto con clave valor ("fecha", weedDate)
            // Hacer eso aqui y devolver el objeto en lugar del json
            return r.json();
        });
	}
}
