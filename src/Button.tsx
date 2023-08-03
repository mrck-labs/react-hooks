import React from 'react';

interface ButtonProps {
    handleClick: () => void;
    content: string;
}

const Button = (props: ButtonProps) => {
    const { handleClick, content } = props;
    return <button onClick={handleClick}>{content}</button>;
};

export { Button };
