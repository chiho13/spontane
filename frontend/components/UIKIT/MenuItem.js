import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

const iMenuItem = styled(MenuItem)`
  && {
      font-size: 14px;
      font-family: 'nunito';

      i {
          font-size: 16px;
          margin-right: 8px;
      }
  }
`;

export default iMenuItem;