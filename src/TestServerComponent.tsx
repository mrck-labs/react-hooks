import React from 'react';
import { Button } from '@/src/Button';

const TestServerComponent = () => {
    return (
        <div>
            <h1>Test Server Component</h1>
            <p>Lorem ipsum dolor sit amet</p>
            <Button
                content='Click me'
                handleClick={() => console.log('Clicked')}
            />
        </div>
    );
};

export { TestServerComponent };
