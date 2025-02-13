import { WeedDate, WeedDates } from '../models/weedDate.model';
import { Api } from '../core/constants';
import { AuthorizationService } from './auth/authorization.service';
import { onlyStringDate } from '../utils/common.utils';
export class WeedDatesService {
	static getMyWeedDates(datee: Date): Promise<WeedDates> {
		const authorizationObject = AuthorizationService.safeGetAuthorization();
		return fetch(
			Api.baseURL +
				Api.myWeedDates +
				'?' +
				new URLSearchParams({
					date: onlyStringDate(datee),
				}),
			{
				headers: {
					Authorization: `Bearer ${authorizationObject?.access_token}`,
					'Content-Type': 'application/json',
				},
			}
		)
			.then((r) => r.json())
			.then((wdA: any[]) => {
				const wDates: WeedDates = {};
				wdA.forEach(
					(wd) =>
						(wDates[wd.date] = { date: new Date(wd.date), blunts: wd.blunts })
				);
				return wDates;
			});
	}

	static postWeedDate(datee: Date, blunts: number): void {
		const authorizationObject = AuthorizationService.safeGetAuthorization();
		fetch(Api.baseURL + Api.postWeedDate, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${authorizationObject?.access_token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				date: onlyStringDate(datee),
				blunts: blunts,
			}),
		});
	}
}
