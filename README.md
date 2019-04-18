# react-mousechase
Pretty UI React Components which involve 'chasing' the user's mouse position.

[Demo Online](https://englishtom.github.io/#/react-mousechase/)

## Installation

react-mousechase is available on NPM as **react-mousechase**:

```
npm install react-mousechase
```

## MouseChaseBackground

```jsx
import React from 'react';
import {
    MouseChaseBackground,
} from 'react-mousechase';

const App = () => (
        <div className="overflow-hidden">
            <MouseChaseBackground invert={true} friction={0.05} disabled={false} disabledOnMouseout={true}>
                <div className="image-cover one"></div>
            </MouseChaseBackground>
        </div>
)

export default App;
```

## MouseChaseIcon

```jsx
import React from 'react';
import {
    MouseChaseIcon,
} from 'react-mousechase';

const App = () => (
    <MouseChaseIcon 
        icon={icon} 
        onClick={() => alert('You clicked the icon!')}
        friction={0.1}
        disabled={false}
    >
        <div className="image-cover two"></div>
    </MouseChaseIcon>
)

export default App;
```
