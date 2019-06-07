import Button from '../UIKIT/iButton';
import {ThemeProvider} from 'styled-components';
import {brandTheme} from '../Login';

function BuyCredit() {
    return  <ThemeProvider theme={brandTheme}>
                <Button>Buy Credits</Button>
        </ThemeProvider>
}

export default BuyCredit;