import React, {Component} from 'react';

import {
    MouseChaseBackground,
    MouseChaseIcon
} from '../src';

import icon from './icon-play.svg';

class App extends Component {

    state = {
        BackgroundState: {
            invert: true,
            friction: 0.05,
            disabled: false,
            disabledOnMouseout: true
        },
        IconState: {
            friction: 0.1,
            disabled: false
        }
    }

    render() {

        const {BackgroundState, IconState} = this.state;

        return (
            <div>
                <div>
                    <h2>MouseChaseBackground</h2>
                    <div className="overflow-hidden">
                        <MouseChaseBackground {...BackgroundState} >
                            <div className="image-cover one"></div>
                        </MouseChaseBackground>
                    </div>
                </div>
                <div>
                    <h2>MouseChaseIcon</h2>
                    <MouseChaseIcon 
                        icon={icon} 
                        onClick={() => alert('You clicked the icon!')}
                        {...IconState}
                    >
                        <div className="image-cover two"></div>
                    </MouseChaseIcon>
                </div>
            </div>
        )
    }

}

export default App;
