import styled, {keyframes} from 'styled-components';
import { fadeInDownBig} from 'react-animations';

const fadeOutDownAnimation = keyframes`${fadeInDownBig}`;

const showMarker = styled.div`
    animation: ${props => props.isUpdate ? 'none' : `0.4s ${fadeOutDownAnimation}`};
`;

export default showMarker;