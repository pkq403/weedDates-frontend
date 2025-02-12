import { WeedDate, WeedDates } from '../models/weedDate.model';
import { Api } from '../core/constants';
import { AuthorizationService } from './auth/authorization.service';
export class WeedDatesService {
	static getMyWeedDates(datee: Date): Promise<WeedDates> {
		const authorizationObject = AuthorizationService.safeGetAuthorization();

		return fetch(
			Api.baseURL +
				Api.myWeedDates +
				'?' +
				new URLSearchParams({
					'month-date': datee.toISOString().split('T')[0],
				}),
			{
				headers: {
					Authentication: ` Bearer ${authorizationObject?.access_token}`,
					'Content-Type': 'application/json',
				},
			}
		)
			.then((r) => r.json())
			.then((wdA: WeedDate[]) => {
				const wDates: WeedDates = {};
                console.log('arrives -> ', wdA[0].date.toISOString())
				wdA.forEach((wd) => (wDates[wd.date.toISOString()] = { ...wd }));
				return wDates;
			});
	}
}
