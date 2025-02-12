import { useCallback, useEffect, useMemo, useState } from 'react';
import Day from './DayTableField';
import { Button, ButtonGroup } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const DAYSPERWEEK = 7;
const MAXWEEKSPERMONTH = 6;
const WEEKDAYS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
import '@/pages/calendar/calendar.css';
import { useDisclosure } from '@heroui/react';
import { BluntModal } from './BluntModal';
import { Api } from '@/domain/core/constants';

export default function Calendar() {
	const [datee, setDatee] = useState<Date | undefined>(undefined);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	useEffect(() => {
		updateDate(new Date());
	}, []);

	useEffect(() => {
		// Hacer fetching de los datos del mes con el token del usuario y la fecha de inicio y fin
	}, [datee]);

	const realMonthIndex = useMemo(() => {
		if (!datee) return null;
		return (datee.getMonth() + 1) % 12;
	}, [datee]);

	const updateDate = useCallback((baseDate: Date) => {
		const firstMonthDate = new Date(
			baseDate.getFullYear(),
			baseDate.getMonth(),
			1
		);

		let firstMonthfirstDay = firstMonthDate.getDay();
		if (firstMonthfirstDay == 0) firstMonthfirstDay = 1;
		if (firstMonthfirstDay != 1) firstMonthfirstDay -= 1;

		setDatee(
			new Date(
				baseDate.getFullYear(),
				baseDate.getMonth(),
				firstMonthDate.getDate() - firstMonthfirstDay
			)
		);
	}, []);

	const slideAMonth = useCallback(
		(slide: number) => {
			if (!datee) return;
			let monthShift = datee.getMonth() + slide + 1;
			if (datee.getDate() == 1 && datee.getDay() == 1) monthShift -= 1;
			updateDate(new Date(datee.getFullYear(), monthShift, 1));
		},
		[datee]
	);

	return (
		<div className='flex flex-col gap-2 p-5'>
			<div className='flex flex-row justify-between'>
				<span className='text-3xl font-semibold font-sans text-brokenwhite-500'>
					{realMonthIndex !== null &&
						datee &&
						`${MONTHS[realMonthIndex]} ${datee.getFullYear() + (realMonthIndex === 0 ? 1 : 0)}`}
				</span>
				<ButtonGroup className='shadow-md'>
					<Button
						onPress={() => {
							slideAMonth(-1);
						}}
						className='bg-primary rounded-l-md text-white font-sans font-semibold'
						size='sm'>
						<ChevronLeftIcon />
					</Button>
					<Divider orientation='vertical' />
					<Button
						onPress={() => {
							slideAMonth(1);
						}}
						className='bg-primary rounded-r-md text-white font-sans font-semibold'
						size='sm'>
						<ChevronRightIcon />
					</Button>
				</ButtonGroup>
			</div>
			<table className='w-full h-full bg-white'>
				<thead>
					<tr>
						{WEEKDAYS.map((weekday) => (
							<th key={weekday}>{weekday}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{datee &&
						Array.from(Array(MAXWEEKSPERMONTH).keys()).map((week: any) => {
							return (
								<tr key={week} className='text-center'>
									{Array.from(Array(DAYSPERWEEK).keys()).map((day: any) => {
										let dayDate = new Date(datee);
										dayDate.setDate(datee.getDate() + (week * 7 + day));
										// Todo obtener el weedDate haciendo un get al hashMap de weedDates
										const wDay = undefined;
										return (
											<Day
												key={dayDate.getTime()}
												weedDay={wDay}
												onOpen={onOpen}
											/>
										);
									})}
								</tr>
							);
						})}
				</tbody>
			</table>
			<BluntModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onSubmit={() => {}}
			/>
		</div>
	);
}
