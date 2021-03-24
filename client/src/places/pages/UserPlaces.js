
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
{
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrappers in the world',
    imageUrl : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Fempirestatebldg&psig=AOvVaw0JYb7HOJ90oFjz06E2rfuK&ust=1616669229958000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiE1argyO8CFQAAAAAdAAAAABAD',
    address: "20 W 34th St, New York, NY 10001",
    location: {
        lat: 40.7484405,
        lng: -73.9878584
    }, creator: 'u1'
}, 
{
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrappers in the world',
    imageUrl : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Fempirestatebldg&psig=AOvVaw0JYb7HOJ90oFjz06E2rfuK&ust=1616669229958000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiE1argyO8CFQAAAAAdAAAAABAD',
    address: "20 W 34th St, New York, NY 10001",
    location: {
        lat: 40.7484405,
        lng: -73.9878584
    }, creator: 'u2'
}
]
const UserPlaces = () =>  {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId )
    return <PlaceList  items={loadedPlaces}/>
}

export default UserPlaces;