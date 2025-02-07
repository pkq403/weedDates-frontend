import {
	createContext,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { noop } from '@/domain/utils/noop';
import { useSafeContext } from '@/domain/hooks/useSafeContext';
import { DivProps } from './common-types';
import { create } from 'zustand';
import { useDefaultId } from '@/domain/hooks/useId';
import { useBodyScrollLock } from '@/domain/hooks/useBodyScrollLock';
import { useHandleEscKey } from '@/domain/hooks/useHandleEscKey';
import { Transition } from './transition.component';

type IModalContext = {
	open: boolean;
	id: string;
	dismissable: boolean;
	onClose: VoidFunction;
};
const ModalContext = createContext<IModalContext>({
	open: false,
	id: '',
	dismissable: false,
	onClose: noop,
});

const useModalContext = () => useSafeContext(ModalContext);

interface ModalProps extends DivProps {
	open: boolean;
	dismissable?: boolean;
	className?: string;
	focusTrapActive?: boolean;
	id?: string;
	onClose: VoidFunction;
}

/**
 * Modal wrapper component. Manages open and close
 * @param props
 * @returns
 */
const Root = forwardRef(
	(
		{
			open,
			dismissable,
			className,
			focusTrapActive,
			id,
			onClose,
			children,
			...divProps
		}: ModalProps,
		ref: any
	) => {
		const _id = useDefaultId(id, 'modal_');
		const locker = useBodyScrollLock();

		useEffect(() => {
			locker(open);
		}, [open]);

		const guardedClose = useCallback(() => {
			if (dismissable) onClose();
		}, [dismissable, onClose]);

		useHandleEscKey(open, guardedClose);

		const ctx = useMemo(
			() => ({
				id: _id,
				open: open,
				dismissable: dismissable ?? false,
				onClose: guardedClose,
			}),
			[open, dismissable, guardedClose]
		);
		return (
			<ModalContext.Provider value={ctx}>
				<Transition.Fade></Transition.Fade>
			</ModalContext.Provider>
		);
	}
);
// TOBE WRITTEN