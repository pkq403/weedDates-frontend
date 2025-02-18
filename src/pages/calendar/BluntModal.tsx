import { Input } from '@heroui/input';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from '@heroui/react';
import JointIcon from '@/assets/joint.svg';
import { useCallback } from 'react';
import { useBluntDateStore } from '@/domain/store/dateBluntsStore';
import { WeedDatesService } from '@/domain/services/weeddates.service';

export function BluntModal({
	isOpen,
	onOpenChange,
	setFatherReload = () => {}
}: {
	isOpen: boolean;
	onOpenChange: () => void;
	setFatherReload: () => void;
}) {
	const { date, blunts } = useBluntDateStore();
	const setBlunts = useBluntDateStore(s => s.setBlunts);
	const onSubmit = useCallback(() => {
		if (date !== undefined && blunts !== undefined) {
			WeedDatesService.postWeedDate(date, blunts);
			setFatherReload();
		}
	}, [date, blunts]);

	return (
		<Modal size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent className='bg-primary'>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Blunt Counter
						</ModalHeader>
						<ModalBody>
							<div className='flex flex-row gap-4 justify-end'>
								<img className='w-4' src={JointIcon} />
								<Input
									size='sm'
									label='blunts'
									type='number'
									defaultValue={blunts?.toString()}
									onValueChange={(s: string) => setBlunts(Number(s))}
								/>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								className='text-red-900 border-red-900'
								variant='bordered'
								onPress={onClose}>
								Close
							</Button>
							<Button
								className='text-black border-black'
								variant='bordered'
								onPress={() => {
									onSubmit();
									onClose();
								}}>
								Send
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
