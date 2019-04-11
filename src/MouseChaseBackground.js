import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class MouseChaseBackground extends Component {

    state = {
        lFollowX: 0,
        lFollowY: 0,
        x: 0,
        y: 0,
        over: false
    }

    componentDidMount = () => {
        this._isMounted = true;
        const node = ReactDOM.findDOMNode(this).parentNode;

        window.addEventListener("mousemove", this.handleMouse);
        node.addEventListener('mouseleave', this.handleMouseLeave);
        node.addEventListener('mouseenter', this.handleMouseEnter);

        this.node = node;
        this.moveBackground();
    }

    componentWillUnmount = () => {
        this._isMounted = false;
        window.cancelAnimationFrame(this.moveBackground);
        this.node.removeEventListener('mouseleave', this.handleMouseLeave);
        this.node.removeEventListener('mouseenter', this.handleMouseEnter);
    }

    moveBackground = () => {		
        let {
            x, 
            y,
            lFollowX,
            lFollowY
        } = this.state;

        const {friction} = this.props;

        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;

        if(this._isMounted) { 
            this.setState({x, y});

            window.requestAnimationFrame(this.moveBackground);
        }
    }

    handleMouse = (e) => {
        let lMouseX, lMouseY;
        let lFollowX, lFollowY;
        const {over} = this.state;
        const {disabled, disabledOnMouseout} = this.props;

        if(disabled || (!over && disabledOnMouseout)) {
            lMouseX = 0;
            lMouseY = 0;
        } else {
            lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
            lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
        }

        lFollowX = (20 * lMouseX) / 100;
        lFollowY = (10 * lMouseY) / 100;

        this.setState({lFollowX, lFollowY});
    }

    handleMouseEnter = (e) => {
        this.setState({over: true});
    }

    handleMouseLeave = (e) => {
        this.setState({over: false});
    }

    render = () => {
        const { 
            children, 
            invert 
        } = this.props;

        const {
            x, 
            y,
            over
        } = this.state;

        const bgStyle = {
            transform: 'translate(' + (x * (invert ? 1 : -1)) + 'px, ' + (y * (invert ? 1 : -1)) + 'px) scale(1.2)',
        }

        const addProps = { 
            style: bgStyle
        }

        var childrenWithProps = React.Children.map(children, child => React.cloneElement(child, addProps));

        return <div className="mousechase-wrapper mousechase-background">{childrenWithProps}</div>
    }
}

MouseChaseBackground.propTypes = {
    disabled:           PropTypes.bool,
    disabledOnMouseout: PropTypes.bool,
    friction:           PropTypes.number.isRequired,
    invert:             PropTypes.bool,
};

MouseChaseBackground.defaultProps = {
    disabled: false,
    disabledOnMouseout: true,
    invert: true,
    friction: 0.05
};

export default MouseChaseBackground;
