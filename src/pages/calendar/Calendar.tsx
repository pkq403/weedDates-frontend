import { useCallback, useEffect, useMemo, useState } from 'react';
import DayTd from './DayTd';
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
import { WeedDate, WeedDates } from '@/domain/models/weedDate.model';
import { WeedDatesService } from '@/domain/services/weeddates.service';
import { onlyStringDate } from '@/domain/utils/common.utils';

const isDateInMonth = (datee: Date, month?: number): boolean =>
	datee.getMonth() === month;

export default function Calendar() {
	const [reload, setReload] = useState(false);
	const [realDate, setRealDate] = useState<Date | undefined>(undefined);
	const [datee, setDatee] = useState<Date | undefined>(undefined);
	const [activeMonth, setActiveMonth] = useState<number | undefined>(undefined);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [weedDates, setWeedDates] = useState<WeedDates | undefined>(undefined);

	const updateWeedDates = useCallback((datee: Date) => {
		WeedDatesService.getMyWeedDates(datee).then(setWeedDates);
	}, []);

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
		setRealDate(firstMonthDate);
		updateWeedDates(firstMonthDate);
		let firstMonthfirstDay = firstMonthDate.getDay();
		if (firstMonthfirstDay == 0) firstMonthfirstDay = 1;
		if (firstMonthfirstDay != 1) firstMonthfirstDay -= 1;
		setActiveMonth(baseDate.getMonth());
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
			let nextMonth = datee.getMonth() + slide + 1;
			if (datee.getDate() == 1 && datee.getDay() == 1) nextMonth -= 1;
			setActiveMonth(nextMonth);
			updateDate(new Date(datee.getFullYear(), nextMonth, 1));
		},
		[datee]
	);

	useEffect(() => {
		updateDate(new Date());
	}, []);

	useEffect(() => {
		if (reload && realDate) {
			setReload(false);
			updateDate(realDate);
		}
	}, [reload]);
	
	return (
		<div className='flex flex-col gap-2 p-0 sm:p-5'>
			<div className='flex flex-row justify-between'>
				<span className='lg:text-5xl md:text-3xl sm:text-base font-semibold font-sans text-brokenwhite-500'>
					{realMonthIndex !== null &&
						datee &&
						`${MONTHS[realMonthIndex]} ${datee.getFullYear() + (realMonthIndex === 0 ? 1 : 0)}`}
				</span>
				<ButtonGroup className='shadow-md'>
					<Button
						onPress={() => {
							slideAMonth(-1);
						}}
						className='bg-primary min-w-2 sm:min-w-[10vh] h-6 sm:h-10 rounded-l-md  text-white font-sans font-semibold'>
						<ChevronLeftIcon />
					</Button>
					<Divider orientation='vertical' />
					<Button
						onPress={() => {
							slideAMonth(1);
						}}
						className='bg-primary rounded-r-md min-w-2 sm:min-w-[10vh] h-6 sm:h-10 text-white font-sans font-semibold'>
						<ChevronRightIcon />
					</Button>
				</ButtonGroup>
			</div>
			<table className='w-full h-full bg-white'>
				<thead>
					<tr>
						{WEEKDAYS.map((weekday) => (
							<th first-letter={weekday.slice(0, 2)} key={weekday}>
								<span>{weekday}</span>
							</th>
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
										dayDate.setHours(1);
										// Todo obtener el weedDate haciendo un get al hashMap de weedDates
										const wDay: WeedDate = { date: dayDate, blunts: 0 };
										if (weedDates) {
											wDay.blunts =
												weedDates[onlyStringDate(dayDate)]?.blunts || 0;
										}
										return (
											<DayTd
												key={dayDate.getTime()}
												weedDay={wDay}
												onOpen={onOpen}
												active={isDateInMonth(dayDate, activeMonth)}
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
				setFatherReload={() => {setReload(true)}}
			/>
		</div>
	);
}
