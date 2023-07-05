import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();

    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert("no user associate with this email")
                    break;
                case 'auth/wrong-password':
                    alert("incorrect email or password")
                    break;
                default:
                    console.log(error);
            }
            console.log(error);
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div className="sign-in-container ">
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange} />
                <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange} />
                <div className="buttons-container" >
                    <Button type="submit" >SIGN IN</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle} >Google sing in</Button>
                </div>
            </form>
        </div>
    );
}
export default SignInForm;
