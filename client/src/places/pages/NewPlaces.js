
import { useCallback } from 'react';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validator';
import './NewPlace.css';


 const NewPlaces = () => {
     const titleInputHandler =useCallback ((id, value, isValid) => {

     }, [])

     const descriptionInputHandler = useCallback((id, value, isValid) => {}, [])
    return (
        <form className="place-form"> 
            <Input 
                type="text" 
                element="input" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid title."
                onInput={titleInputHandler}
            />
             <Input 
                type="text" 
                element="textarea" 
                label="Description" 
                validators={[ VALIDATOR_MINLENGTH(5)]} 
                errorText="Please enter a valid description and atleast 5 characters."
                onInput={titleInputHandler}
            />
        </form>
    )
}

export default NewPlaces;