import { useState, useEffect } from 'react';
import { DropdownCoords } from '../select-types';

export const useDropdownCoords = (
    ref: React.RefObject<any>,
): DropdownCoords => {
    const [dropdownCoords, setDropdownCoords] = useState<DropdownCoords>({});

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            const box = ref.current?.getBoundingClientRect();

            if (box) {
                setDropdownCoords({
                    left: box.left,
                    top: ref.current.offsetTop + box.height,
                    width: box.width,
                })
            }
        });

        resizeObserver.observe(ref.current);

        return () => resizeObserver.disconnect();
    }, [setDropdownCoords]);

    return dropdownCoords;
}
