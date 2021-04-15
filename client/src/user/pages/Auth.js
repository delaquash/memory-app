

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';

import './Auth.css';

const Auth = ()=> {
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        }, 
        password: {
            value: '',
            isValid: false        }
    }, false)

    const authSubmitHandler =e=>{
        e.preventDefault()
        console.log(formState.inputs)
    }
    return (
        <Card className="authentication">
            <h2>Login Required</h2>

            <hr />
            <form onSubmit={authSubmitHandler}>
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                  <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password, atleast 5 characters"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    LOG IN
                </Button>
            </form>
        </Card>
    )
}

export default Auth;