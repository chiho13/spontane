import Map from '../components/AllLocations'

const Locations = props => (
  <div>
    <Map id={props.query.id} lat={props.query.lat} lon={props.query.lon}/>
  </div>
);

export default Locations;
