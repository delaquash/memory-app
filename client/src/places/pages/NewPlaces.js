
// import { useCallback, useReducer } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';
import './PlaceForm.css';




 const NewPlaces = () => {
     const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
        value: '',
        isValid: false
    },
    address: {
        value: '',
        isValid: false
    }
     }, false)
   
     
const placeSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs)
}
     
    return (
        <form className="place-form" onSubmit={placeSubmitHandler}> 
            <Input 
                id="title" 
                element="input" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid title."
                onInput={inputHandler}
            />
             <Input 
                id="description" 
                element="textarea" 
                label="Description" 
                validators={[ VALIDATOR_MINLENGTH(5)]} 
                errorText="Please enter a valid description and atleast 5 characters."
                onInput={inputHandler}
            />
             <Input 
                id="address" 
                element="input" 
                label="Address" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid address."
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
                ADD NEW PLACE
            </Button>
        </form>
    )
}

export default NewPlaces;