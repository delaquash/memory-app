
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';


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
const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const identifiedPlace= DUMMY_PLACES.find(p => p.id === placeId)

    const [formState, inputHandler] =useForm({
        title: {
            value: identifiedPlace.title,
            isValid: true
        }, 
        description: {
            value: identifiedPlace.description,
            isValid: true
        },
    }, true)

const placeUpdateSubmitHandler = e => {
    e.preventDefault()
    console.log(formState.inputs);
}

    
    if(!identifiedPlace){
        return (
            <div className="center">
                <h2>Could not find place</h2>
            </div>
        )
    }

    return <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                    value={formState.inputs.title.value}
                    valid={formState.inputs.title.isValid}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description with a minimum of 5 characters"
                    onInput={inputHandler}
                    value={formState.inputs.description.value}
                    valid={formState.inputs.description.isValid}
                /> 
                <Button type="submit" disabled={!formState.isValid}>
                    UPDATE PLACE
                </Button>
           </form>
          
}

export default UpdatePlace;