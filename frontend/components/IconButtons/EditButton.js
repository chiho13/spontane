import {ThemeProvider} from 'styled-components';
import Link from 'next/link';
import MaterialIcon from '@material/react-material-icon';
import IconButtonStyle from './IconButtonStyle';

const theme = {
    iconColor: '#777777',
    iconColorHover: '#444444'
}

const EditButton = (props) => {
    const {pathname, id, latitude, longitude} = props;
    return (
        <ThemeProvider theme={theme}>
                <IconButtonStyle>
                <Link
                href={{
                pathname: pathname,
                query: {
                    id,
                    latitude,
                    longitude
                }
            }}>
                    <a>
                        <MaterialIcon icon="edit" className="materialIcon"/>
                    </a>
                    </Link>
                </IconButtonStyle>
         
        </ThemeProvider>
    )
};

export default EditButton;