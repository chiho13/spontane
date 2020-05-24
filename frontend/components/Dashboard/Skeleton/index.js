import styled, {keyframes, css} from 'styled-components'

const placeHolderShimmer = keyframes`
0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    background-position: -468px 0
}
to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    background-position: 468px 0
}

`;

const SkeletonStyle = styled.div`
position: relative;
transition: all .3s ease-in-out;
-webkit-backface-visibility: hidden;
opacity: 1;

.animated-background {
    will-change: transform;
    animation: ${placeHolderShimmer} 1.2s linear infinite forwards;
    -webkit-backface-visibility: hidden;
    background: #e1e1e1;
    background: linear-gradient(100deg, #eee 8%, #fafafa 18%, #eee 33%);
    background-size: 800px 104px;
    height: 100px;
    margin-top: 4px;
    position: relative;
}

.card {
    width: 100%;
    height: 100px;
    display: block
}
`;


function Skeleton({count}) {
    const elements = [];

    for (let i = 0; i < count; i++) {
        elements.push( <div key={i} className="animated-background"> </div>)
    }
    return <SkeletonStyle>
                {elements}
        </SkeletonStyle>
}

export default Skeleton;

Skeleton.defaultProps = {
    count: 1,
};