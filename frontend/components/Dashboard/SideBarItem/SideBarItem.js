import React from 'react';
import SideBarItemStyle from './SideBarItemStyle';
import Link from '../../helpers/link';

import MaterialIcon from '@material/react-material-icon';

function SideBarItem(props) {
        const {item} = props;

        return (
            <SideBarItemStyle>
                <Link href={item.link}>
                    <a >
                       <MaterialIcon icon={item.icon} className="materialIcons"/>
                        <span>{item.title}</span>
                    </a>
                </Link>
            </SideBarItemStyle>
        );
}

export default SideBarItem;
