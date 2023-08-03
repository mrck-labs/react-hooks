import { useRef } from 'react';

const useIsFirstRender = () => {
    console.log('Test');
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
};

export { useIsFirstRender };
