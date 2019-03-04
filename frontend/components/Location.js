import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import LocationItemStyles from './styles/LocationItemStyles';
import Cross from './Icons/Cross';
import Draggable, {DraggableCore} from 'react-draggable';
import Router from 'next/router';

const snappedPositions = {
  opened: 'calc(100vh - 100px)',
  closed: 0
}

const componentHeight = {
  height: '160'
}

export default class Location extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    state = {
        height:  'auto',
        touchStartPos: 0,
        draggable: false
    }

    closeLocation = () => {
        this.closeLocationDetail()
    }
 
    dragStart = (e) => {
      if(!this.state.draggable) return;
      this.setState({touchStartPos: e.currentTarget.clientHeight})
    }

    calcHeight = (height) => {
      this.setState({
        height
      })
    }

    expandLocation = (e, {deltaY}) => {
      if(!this.state.draggable) return;
      const height = this.state.height - deltaY;
      console.log(componentHeight.height);
      this.calcHeight(height)
    }

    dragEnd = () => {
      if(!this.state.draggable) return;
      const dragLength = this.state.height - this.state.touchStartPos
      const {closeLocation} = this.props;
      
      if(dragLength > 40) {
        this.setState({height: snappedPositions.opened});
        setTimeout(() => {
          this.setHeight();
        }, 200)
      }  else if (dragLength < -40) {
        closeLocation();
        this.setState({height: snappedPositions.closed});
        Router.push('/');
      } else {
        this.calcHeight(this.state.touchStartPos)
      }
    }

    setHeight = () => {
      const locationHeight = document.querySelector('.locationItem').clientHeight
      this.setState({height: locationHeight});
    }

    componentDidMount() {
      this.setHeight()
      window.innerWidth < 1000 && this.setState({draggable: true});
    }

    render() {
        const {location, closeLocation, isOpened} = this.props;

        return (
            <DraggableCore axis="y" onStart={this.dragStart} onStop={this.dragEnd} onDrag={this.expandLocation}>
                <LocationItemStyles
                    isOpened={isOpened}
                    className="locationItem" style={{height: this.state.height}}>
                    <div className="dragNib"></div>
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
