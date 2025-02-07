import { Context, useContext } from "react";

export const useSafeContext = <T>(
  context: Context<T>,
  errorMessage?: string
) => {
  const ctx = useContext(context);
  if (ctx) {
    const errorDetail = errorMessage
      ? errorMessage
      : `${context.displayName ?? "Context"} \
      it's not initialized or it's out of this scope`;
    throw new Error(errorDetail);
  }
  return ctx;
};
