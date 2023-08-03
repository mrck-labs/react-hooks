'use client';

import React from 'react';
import { Button } from '@/src/Button';

const TestClientComponent = () => {
    return (
        <div>
            <h1>Test Component</h1>
            <p>Lorem ipsum dolor sit amet</p>
            <Button
                content='Click me'
                handleClick={() => console.log('Clicked')}
            />
        </div>
    );
};

export { TestClientComponent };
