import { forwardRef } from 'react';

import Tippy, { TippyProps } from '@tippyjs/react';

import { cn } from '@/domain/core/cn';
import "tippy.js/dist/tippy.css";
interface TooltipProps extends TippyProps {}

const Tooltip = forwardRef((props: TooltipProps, ref: any) => {
	const { className, ...rest } = props;

	return (
		<Tippy
			{...rest}
			ref={ref}
			className={cn(
				'tippy-tooltip',
				'rounded border border-neutral-200 bg-neutral-50 px-2 py-1 shadow-xl',
				className
			)}
			arrow
			animation='scale'
		/>
	);
});

Tooltip.displayName = 'Tooltip';

export { Tooltip };
