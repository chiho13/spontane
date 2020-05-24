import React from 'react';
import Menu from '@material-ui/core/Menu';
import Icon from '@material/react-material-icon';
import EditButton from './IconButtons/EditButton';
import DeleteButton from './IconButtons/DeleteButton';
import styled from 'styled-components';

const EditMoreStyle = styled.div`

    display: none;

    @media (min-width: 700px) {
        display: block;
      }

    .moreHoriz_icon {
        padding: 4px;
        border-radius: 50%;
        background-color: #ffffff;
        transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;

        &:hover {
            background-color: #eeeeee;
        }
    }
`;

class EditMore extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {location, pathname } = this.props;

    return (
      <EditMoreStyle>
        <Icon
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          icon="more_horiz"
          className="moreHoriz_icon"
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
                        <EditButton
                            id={location.id} 
                            latitude={location.geoLocation.latitude}
                            longitude={location.geoLocation.longitude}
                            pathname={`/admin/map/update`}
                          />
                        <DeleteButton
                            id={location.id}
                            
                            />
        </Menu>
      </EditMoreStyle>
    );
  }
}

export default EditMore;
