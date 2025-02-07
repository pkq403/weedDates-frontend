import { useEffect } from "react"

/**
 * Handle `esc` key press. Useful for closing modals, tooltips, etc...
 * @param show Enable or disable handler
 * @param handler Callback function
 */
export const useHandleEscKey = (show: boolean, handler: VoidFunction) => {
    useEffect(() => {
        const _handler = (evt: KeyboardEvent) => {
            if (show && evt.key === 'Escape') {
                handler();
                evt.preventDefault();
                evt.stopPropagation();
            }
        };

        if (show) document.addEventListener('keydown', _handler);
        return () => {
            document.removeEventListener('keydown',  _handler);
        };
    }, [show, handler]);
}