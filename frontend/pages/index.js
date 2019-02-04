import Map from '../components/MapGL'

const Home = props => (
  <div>
    <Map id={props.query.id} />
  </div>
);

export default Home;
