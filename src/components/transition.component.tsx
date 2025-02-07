import { CSSTransition } from 'react-transition-group';
import {
	CSSTransitionClassNames,
	CSSTransitionProps,
} from 'react-transition-group/CSSTransition';

import { noop } from 'framer-motion';
import { cn } from '@/domain/core/cn';
import { PropsWithChildren } from 'react';

type TransitionProps = Omit<CSSTransitionProps<any>, 'addEndListener'> &
	PropsWithChildren & { classNames: CSSTransitionClassNames };

const Transition = ({
	duration = 300,
	mountOnEnter = true,
	unmountOnExit = true,
	...props
}: PropsWithChildren<TransitionProps>) => {
	return (
		<CSSTransition
			mountOnEnter={mountOnEnter}
			unmountOnExit={unmountOnExit}
			timeout={duration}
			addEndListener={noop}
			{...props}
		/>
	);
};

const Fade = ({
	classNames,
	timeout,
	...props
}: Omit<TransitionProps, 'classNames'>) => {
	return (
		<Transition
			{...props}
			timeout={timeout ?? 300}
			classNames={{
				enter: cn('opacity-0'),
				enterActive: cn('transition-opacity duration-300 opacity-100'),
				enterDone: cn('opacity-100'),
				exit: cn('opacity-100'),
				exitActive: cn('transition-opacity duration-300 opacity-0'),
				exitDone: cn('opacity-0'),
			}}
		/>
	);
};

const Appear = ({
	classNames,
	timeout,
	...props
}: Omit<TransitionProps, 'classNames'>) => {
	return (
		<Transition
			{...props}
			timeout={timeout ?? 300}
			classNames={{
				enter: cn('opacity-0 -translate-y-8'),
				enterActive: cn(
					'transition-all duration-300 opacity-100 translate-y-0'
				),
				enterDone: cn('opacity-100 translate-y-0'),
				exit: cn('opacity-100 translate-y-0'),
				exitActive: cn('transition-all duration-300 opacity-0 translate-y-8'),
				exitDone: cn('opacity-0 translate-y-8'),
			}}
		/>
	);
};

Transition.Fade = Fade;
Transition.Appear = Appear;
Transition.displayName = 'Transition';

export { Transition };
