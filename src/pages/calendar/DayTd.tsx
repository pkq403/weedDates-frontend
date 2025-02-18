import { useCallback, useEffect, useState } from 'react';
import { useBluntDateStore } from '@/domain/store/dateBluntsStore';
import { WeedDate } from '@/domain/models/weedDate.model';
import JointIcon from '@/assets/joint.svg';
import { cn } from '@/domain/core/cn';

interface DayTableProps {
	weedDay: WeedDate;
	active: boolean;
	onOpen: () => void;
}
export default function DayTd({
	weedDay,
	active = true,
	onOpen,
}: DayTableProps) {
	const { setDate, setBlunts } = useBluntDateStore();
	const customOnClick = useCallback(() => {
		setDate(weedDay.date);
		setBlunts(weedDay.blunts);
		onOpen();
	}, [weedDay]);
	return (
		<td
			className={cn(active ? 'bg-primary-200' : 'bg-slate-400')}
			onClick={active ? customOnClick : () => {}}>
			<div className='flex flex-col px-1 gap-1 h-full w-full'>
				<div className='flex justify-self-start'>{`${weedDay.date.getDate()}`}</div>

				{active && (
					<div className='flex flex-row gap-1 sm:gap-5 self-center'>
						<img className='w-4' src={JointIcon} />
						<p className='shadowedText font-sans'>{weedDay?.blunts}</p>
					</div>
				)}
			</div>
		</td>
	);
}
