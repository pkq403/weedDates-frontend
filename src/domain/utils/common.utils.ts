export const createId = (prefix: string = '', suffix: string = '') => {
	const rand = Math.random().toString(36).slice(2);

	return `${prefix}${rand}${suffix}`;
};
// TODO: inspect how this work
export function* createIdGenerator(): Generator<
	string,
	string,
	[string | undefined, string | undefined]
> {
	const acc = new Map<string, boolean>();
	let _id: string | undefined,
		args: [string | undefined, string | undefined] = [undefined, undefined];
	while (true) {
		while (acc.has((_id = createId(args?.[0], args?.[1])))) {
			_id = createId(args?.[0], args?.[1]);
		}

		acc.set(_id, false);
		args = yield _id;
	}
}

export const onlyStringDate = (datee: Date): string => {
	return datee.toISOString().split('T')[0];
};
