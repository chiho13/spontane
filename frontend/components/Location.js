import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import LocationItemStyles from './styles/LocationItemStyles';
import Cross from './Icons/Cross';
import Draggable, {DraggableCore} from 'react-draggable';

const snappedPositions = {
  opened: 'calc(100vh - 100px)',
  halfway: '160px'
}

export default class Location extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    state = {
        height:  'auto',
        touchStartPos: 0,
    }

    closeLocation = () => {
        this.closeLocationDetail()
    }
    expandLocation = (e, {deltaY}) => {
      // console.log("deltaY", deltaY, this.state.height);
      const clientY = window.innerHeight - e.touches[0].clientY;
      this.setState({height: this.state.height - deltaY});
    }

    dragStart = () => {
      this.setState({touchStartPos: this.state.height});
    }

    dragEnd = () => {
      const dragLength = this.state.height - this.state.touchStartPos;

      if(dragLength > 20) {
        this.setState({height: 'calc(100vh - 100px)'});
        
        setTimeout(() => {
          this.setHeight()
        }, 200)
      }
    }

    setHeight = () => {
      const locationHeight = document.querySelector('.locationItem').clientHeight
      this.setState({height: locationHeight});
    }

    componentDidMount() {
      this.setHeight()
    }

    render() {
        const {location, closeLocation, isOpened} = this.props;

        return (
            <DraggableCore axis="y" onStart={this.dragStart} onStop={this.dragEnd} onDrag={window.innerWidth < 1000 && this.expandLocation}>
                <LocationItemStyles
                    isOpened={isOpened}
                    className="locationItem" style={{height: this.state.height}}>
                    <Link href={{
                        pathname: '/'
                    }}>
                        <a className="closeLocation_icon" onClick={closeLocation}><Cross/></a>
                    </Link>
                    <h3>{location.city}, {location.country}</h3>
                    <p>
                        {location.description}
                    </p>
                    <div className="buttonList">
                        <Link
                            href={{
                            pathname: 'update',
                            query: {
                                id: location.id
                            }
                        }}>
                            <a>Edit ✏️</a>
                        </Link>
                    </div>
                </LocationItemStyles>
            </DraggableCore>
        );
    }
}
