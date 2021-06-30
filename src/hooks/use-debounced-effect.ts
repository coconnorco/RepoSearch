import {useEffect} from "react";

/**
 * Used to debounce an effect
 * @param effect the function(effect) that will be debounced
 * @param deps the dependencies of the effect
 * @param delay the debounce time of the effect
 */
export const useDebouncedEffect = (effect, deps, delay) => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);
    }, [...deps || [], delay]);
}
