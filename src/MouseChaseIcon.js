// react
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//util
import classNames from 'classnames';

class MouseChaseIcon extends Component {

    icon = React.createRef();

    state = {
        lFollowX: 0,
        lFollowY: 0,
        x: 0,
        y: 0,
        over: false
    }

    componentDidMount = () => {
        this._isMounted = true;
        const node = ReactDOM.findDOMNode(this);

        let x, y, lFollowX, lFollowY;

        x = lFollowX = node.clientWidth / 2;
        y = lFollowY = (node.clientHeight / 2) + node.offsetTop;

        this.setState({
            x,
            y,
            lFollowX,
            lFollowY
        });

        window.addEventListener("mousemove", this.handleMouse);
        node.addEventListener("mouseenter", this.handleMouseEnter);
        node.addEventListener("mouseleave", this.handleMouseLeave);

        this.node = node;
        this.handleMouse();
        this.moveIcon();
    }

    componentWillUnmount = () => {
        window.cancelAnimationFrame(this.moveIcon);
        window.removeEventListener("mousemove", this.handleMouse);
        this.node.removeEventListener("mouseenter", this.handleMouseEnter);
        this.node.removeEventListener("mouseleave", this.handleMouseLeave);
    }

    handleMouse = (e) => {
        let lMouseX, lMouseY;
        let lFollowX, lFollowY;
        const offset = this.node.getBoundingClientRect();
        const {over}     = this.state;
        const {disabled} = this.props;

        if(!over || disabled) {
            lMouseX = this.node.clientWidth / 2;
            lMouseY = this.node.clientHeight / 2;
        } else {
            lMouseX = e.pageX - offset.left;
            lMouseY = e.clientY - offset.top;
        }

        lFollowX = lMouseX - (this.icon.current.clientWidth / 2);
        lFollowY = lMouseY - (this.icon.current.clientHeight / 2);

        this.setState({lFollowX, lFollowY});
    }

    moveIcon = () => {
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

            window.requestAnimationFrame(this.moveIcon);
        }
    }

    handleMouseEnter = (e) => {
        this.setState({over: true});
    }

    handleMouseLeave = (e) => {
        this.setState({over: false});
        setTimeout(this.handleMouse, 0);
    }

    render = () => {

        const {
            className,
            icon,
            children,
            onClick
        } = this.props;

        const {
            x,
            y,
            over
        } = this.state;

        const style = {
            position: 'absolute',
            top: '0',
            left: '0',
            transform: 'translate(' + x + 'px, ' + y + 'px)',
            cursor: 'pointer'
        };

        return (
            <div className={classNames("mousechase-wrapper mousechase-icon", {[className]: (className !== undefined)})} style={{position: 'relative', overflow: 'hidden'}}>
                {children}
                <div onClick={onClick} style={style} ref={this.icon} className={classNames('mousechase-icon__icon', {'mousechase-icon__icon--active': over})}>{icon}</div>
            </div>
        )

    }

}

MouseChaseIcon.propTypes = {
    disabled: PropTypes.bool,
    friction: PropTypes.number.isRequired,
    icon:     PropTypes.node.isRequired,
    onClick:  PropTypes.func.isRequired,
};

MouseChaseIcon.defaultProps = {
    disabled: false,
    friction: 0.1
};

export default MouseChaseIcon;
