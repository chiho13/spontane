import {ThemeProvider} from 'styled-components';
import Link from 'next/link';
import MaterialIcon from '@material/react-material-icon';
import IconButtonStyle from './IconButtonStyle';

const theme = {
    iconColor: '#777777',
    iconColorHover: '#ff4c4c'
};

const DeleteButton = (props) => {
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
                    <MaterialIcon icon="delete" className="materialIcon"/></IconButtonStyle>
            </ThemeProvider>
        </Link>
    )
};

export default DeleteButton;