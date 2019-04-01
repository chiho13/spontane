import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import LocationItemStyles from './styles/LocationItemStyles';
import Cross from './Icons/Cross';
import {DraggableCore} from 'react-draggable';
import Router from 'next/router';

const snappedPositions = {
    closed: 0,
    orignalHeight: 180
};

export default class Location extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    state = {
        height: window.innerWidth < 1000
            ? snappedPositions.orignalHeight
            : 'auto',
        touchStartPos: 0,
        draggable: false,
        expanded: false,
        openedHeight: window.innerHeight
    }

    closeLocation = () => {
        this.closeLocationDetail()
    }

    dragStart = () => {
        if (!this.state.draggable) 
            return;
        this.setState({touchStartPos: this.state.height})
    }

    calcHeight = (height) => {
        this.setState({height})
    }

    expandLocation = (e, {deltaY}) => {
        if (!this.state.draggable) 
            return;
        const height = this.state.height - deltaY;
        this.calcHeight(height)
    }

    dragEnd = () => {
        if (!this.state.draggable) 
            return;
        const dragLength = this.state.height - this.state.touchStartPos
        const {closeLocation} = this.props;

        if (dragLength > 40) {
            this.setState({height: this.state.openedHeight, expanded: true});
        } else if (dragLength < -40) {
            this.setState({expanded: false});
            if (this.state.height > snappedPositions.orignalHeight) {
                this.setState({height: snappedPositions.orignalHeight});
            } else {
                closeLocation();
                this.setState({height: snappedPositions.closed});
                Router.push('/tour/location');
            }
        } else {
            this.calcHeight(this.state.touchStartPos)
        }
    }

    setHeight = () => {
        const locationHeight = document
            .querySelector('.locationItem')
            .clientHeight
        this.setState({height: locationHeight});
    }

    onOrientationChange() {
        const SELF = this;
        window.onorientationchange = function () {
            setTimeout(function () {
                SELF.state.expanded && SELF.calcHeight(window.innerHeight);
                SELF.setState({openedHeight: window.innerHeight});
            }, 200)
        }
    }

    componentDidMount() {
        window.innerWidth < 1000 && this.setHeight()
        window.innerWidth < 1000 && this.setState({draggable: true});
        console.log(window.innerWidth);
    }

    render() {
        const {location, closeLocation, isOpened} = this.props;
        this.onOrientationChange();
        return (
            <DraggableCore
                axis="y"
                onStart={this.dragStart}
                onStop={this.dragEnd}
                onDrag={this.expandLocation}>
                <LocationItemStyles
                    isExpanded={this.state.expanded}
                    isOpened={isOpened}
                    className="locationItem"
                    style={{
                    height: this.state.height
                }}>
                    <div className="dragNib"></div>
                    <Link href={{
                        pathname: '/tour/location'
                    }}>
                        <a className="closeLocation_icon" onClick={closeLocation}><Cross/></a>
                    </Link>
                    <div className="location_content">
                        <h3>{location.city}, {location.country}</h3>
                        <p>
                            {location.description}
                        </p>
                    </div>
                </LocationItemStyles>
            </DraggableCore>
        );
    }
}
