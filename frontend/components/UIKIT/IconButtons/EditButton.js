import {ThemeProvider} from 'styled-components';
import Link from 'next/link';
import MaterialIcon from '@material/react-material-icon';
import IconButtonStyle from './IconButtonStyle';

const theme = {
    iconColor: '#777777',
    iconColorHover: '#444444'
}

const EditButton = (props) => {
    const {pathname, id} = props;
    return (
        <Link
            href={{
            pathname: pathname,
            query: {
                id
            }
        }}>
            <ThemeProvider theme={theme}>
                <IconButtonStyle>
                    <MaterialIcon icon="edit" className="materialIcon"/></IconButtonStyle>
            </ThemeProvider>
        </Link>
    )
};

export default EditButton;