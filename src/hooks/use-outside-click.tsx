import { useCallback, useEffect } from 'react';

export const useOutsideClick = (
    excludedRefs: React.RefObject<any>[],
    onOutsideClick: () => void,
): void => {
    const handleClickOutside = useCallback((event: Event) => {
        const isExludedRefsContainsTarget = excludedRefs && excludedRefs.find(ref =>
            ref.current && ref.current.contains(event.target)
        );

        if (!isExludedRefsContainsTarget) {
            onOutsideClick();
        }
    }, [excludedRefs, onOutsideClick]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
}
