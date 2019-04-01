import styled from 'styled-components';
import Link from 'next/link';
import EditIcon from '../Icons/Edit';

const EditButtonStyle = styled.a`
font-size: 14px;
font-family: 'Roboto';
margin: 8px;
padding: 8px;
display: flex;
justify-content: center;
align-items: center;
width: auto;
height: 30px;
background: #fff;
border: 1px solid #ccc;
border-radius: 6px;
color: #777;
transition: all 0.3s ease;
cursor: pointer;

&:hover {
  border-color: #1790FF;
  color: #1790FF;
}

&:hover svg {
  fill: #1790FF;
}

span {
    margin-right: 8px;
  }

  svg {
      fill: #777;
      transition: all 0.3s ease;
  }


`;


const EditButton = (props) => {
    const {pathname, id } = props;
    return (<Link
        href={{
        pathname: pathname,
        query: {
            id
        }
    }}>
        <EditButtonStyle>
            <span>Edit
            </span>{< EditIcon />}</EditButtonStyle>
    </Link>)
};


export default EditButton;