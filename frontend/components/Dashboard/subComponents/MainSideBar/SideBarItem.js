import React, {Component} from 'react';
import SideBarItemStyle from '../../styles/SideBarItemStyle';
// import Link from 'next/link';
import Link from '../../../helpers/link';
import MaterialIcon from '@material/react-material-icon';

class SideBarItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <SideBarItemStyle>
                <Link activeClassName="active" href={item.link}>
                    <a >
                       <MaterialIcon icon={item.icon} className="materialIcons"/>
                        <span>{item.title}</span>
                    </a>
                </Link>
            </SideBarItemStyle>
        );
    }
}

export default SideBarItem;