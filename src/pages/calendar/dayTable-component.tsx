import { useEffect, useState } from 'react';
import { WeedDate } from '@/domain/models/weedDate.model';
import JointIcon from '@/assets/joint.svg';

interface DayTableProps {
	weedDay: WeedDate;
	onOpen: () => void;
}
export default function DayTable({ weedDay, onOpen }: DayTableProps) {
	return (
		<td onClick={onOpen}>
			<div className='flex flex-col gap-1'>
				<div className='mr-auto mt-auto'>{`${weedDay.date.getDate()}`}</div>
				<div className='flex flex-row gap-1'>
					<img className='w-4' src={JointIcon} />
					<p className='shadowedText font-sans'>{weedDay.blunts}</p>
				</div>
			</div>
		</td>
	);
}
