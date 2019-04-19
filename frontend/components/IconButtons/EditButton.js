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
            <Link
                href={{
                pathname: pathname,
                query: {
                    id,
                    latitude,
                    longitude
                }
            }}>

                <IconButtonStyle>
                    <a>
                        <MaterialIcon icon="edit" className="materialIcon"/>
                    </a>
                </IconButtonStyle>
            </Link>
        </ThemeProvider>
    )
};

export default EditButton;