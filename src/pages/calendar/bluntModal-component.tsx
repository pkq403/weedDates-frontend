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

export function BluntModal({
	isOpen,
	onOpenChange,
	onSubmit,
}: {
	isOpen: boolean;
	onOpenChange: () => void;
	onSubmit: () => void;
}) {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
									onChange={() => {}}
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
