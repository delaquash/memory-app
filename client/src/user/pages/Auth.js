import { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';
import { AuthContext } from '../../shared/context/auth-context';


import './Auth.css';

const Auth = ()=> {
    const auth = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true)
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        }, 
        password: {
            value: '',
            isValid: false        }
    }, false)

    const switchModeHandler = ()=>{
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)

        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            } , false)
        }
        setIsLogin(prevMode => !prevMode);
    }
    const authSubmitHandler = async e=>{
        e.preventDefault()
        if(isLogin){

        } else{
            try {
                    const res= await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'CONTENT-TYPE': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email:formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                })   
                const responseData = await res.json();
                console.log(responseData)
            } catch (err) {
                console.log(err)
            }
        
    }
    auth.login()
}
    return (
        <Card className="authentication">
            <h2>Login Required</h2>

            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLogin && <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Your name"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter your name"
                    onInput={inputHandler}
                />}
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
                    {isLogin  ? 'LOGIN':'SIGN UP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLogin? 'SIGN UP': 'LOGIN'}
            </Button>
        </Card>
    )
}

export default Auth;