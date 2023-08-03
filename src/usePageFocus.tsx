import { useEffect, useState } from 'react';

const usePageFocus = () => {
    const [isFocused, setIsFocused] = useState(document.hasFocus());

    const handleFocus = () => {
        setIsFocused(document.hasFocus());
    };

    useEffect(() => {
        window.addEventListener('blur', handleFocus);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleFocus);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return isFocused;
};

export { usePageFocus };
