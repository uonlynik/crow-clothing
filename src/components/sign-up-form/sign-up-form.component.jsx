import { useState } from "react";

const SignUpForm = () => {

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPasswprd: ''
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => { }}>

                <label>Display Name</label>
                <input type="text" required name="displayName" value={displayName} onChange={handleChange}></input>

                <label>Email</label>
                <input type="email" required name="email" value={email} onChange={handleChange}></input>

                <label>Password</label>
                <input type="password" required name="password" value={password} onChange={handleChange}></input>

                <label>Confirm Password</label>
                <input type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange}></input>

            </form>
        </div>
    );
}
export default SignUpForm;