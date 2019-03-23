import React, {Component} from 'react';
import SideBarItemStyle from '../../styles/SideBarItemStyle';
import Link from 'next/link';

class SideBarItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <SideBarItemStyle>
                <Link href={item.link}>
                    <a>
                        <i className="materials-icons"><item.icon /></i>
                        <span>{item.title}</span>
                    </a>
                </Link>
            </SideBarItemStyle>
        );
    }
}

export default SideBarItem;