import { createIdGenerator } from '@/domain/utils/common.utils';

const appIdGenerator = createIdGenerator();
appIdGenerator.next();

export { appIdGenerator};