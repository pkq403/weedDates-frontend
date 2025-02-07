import React from 'react';

import { appIdGenerator } from '@/domain/core/id';

/**
 * Hook to create a unique pseudo-random id. DO NOT USE for backend comunication.
 * Useful for html elements
 * @param prefix Id prefix
 * @param suffix Id sufix
 * @returns return an ID which do not change between renders but it do if prefix or suffix changes
 */
export const useId = (prefix: string = '', suffix: string = '') => {
	return React.useMemo(
		() => appIdGenerator.next([prefix, suffix]),
		[prefix, suffix]
	);
};

/**
 * Hook to create a unique pseudo-random id. DO NOT USE for backend comunication.
 * Useful for html elements
 * @param prefix Id prefix
 * @param suffix Id sufix
 * @returns returns a fixed ID which do not change between renders nor if prefix or suffix changes
 */
export const useFixedId = (prefix: string = '', suffix: string = '') => {
	return React.useRef(appIdGenerator.next([prefix, suffix]).value).current;
};

/**
 * Hook to create a unique pseudo-random id if defaultId is not present.
 * @param prefix Id prefix
 * @param suffix Id sufix
 * @returns returns a fixed ID which do not change between renders nor if prefix or suffix changes
 */
export const useDefaultId = (
	defaultId: string | undefined,
	prefix: string = '',
	suffix: string = ''
) => {
	return React.useRef(defaultId ?? appIdGenerator.next([prefix, suffix]).value)
		.current;
};
