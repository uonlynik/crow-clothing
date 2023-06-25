import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import './sign-up-form.style.scss';
import Button from "../button/button.component";
const SignUpForm = () => {

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        } catch (error) {
            console.error("user creation encountered an error", error);
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div className="sign-up-continer">
            <h2>Don't have an account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text" required name="displayName" value={displayName} onChange={handleChange} />

                <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange} />


                <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange} />


                <FormInput label="Confirm Password" type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange} />

                <Button type="submit" >sign up</Button>
            </form>
        </div>
    );
}
export default SignUpForm;