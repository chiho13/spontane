import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import LocationItemStyles from './styles/LocationItemStyles';
import Cross from './Icons/Cross';
import ReactDOM from "react-dom";
import Draggable, {DraggableCore} from 'react-draggable';

const measureElement = element => {
  const DOMNode = ReactDOM.findDOMNode(element);
  return {
    width: DOMNode.offsetWidth,
    height: DOMNode.offsetHeight,
  };
}

export default class Location extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    state = {
        height:  'auto'
    }

    closeLocation = () => {
        this.closeLocationDetail()
    }
    expandLocation = (e, {deltaY}) => {
        console.log("deltaY", deltaY, this.state.height);
        this.setState({height: this.state.height - deltaY});
    }

    componentDidMount() {
      const locationHeight = document.querySelector('.locationItem').clientHeight
      this.setState({height: locationHeight});
    }

    render() {
        const {location, closeLocation, isOpened} = this.props;

        return (
            <DraggableCore axis="y" onDrag={this.expandLocation}>
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
