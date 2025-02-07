import { useCallback } from "react";

/**
 * Hook that returns a function to enable and disable scrolling in the body element.
 * @returns `(lockScroll: boolean) => void`
 */
export const useBodyScrollLock = () => {
  return useCallback((lock: boolean) => {
    const el = document.body;
    if (lock) {
      el.classList.add("overflow-hidden");
    } else {
      el.classList.remove("overflow-hidden");
    }
  }, []);
};
