import { ERRORS } from "@/hooks/useForm";

function formValidation(inputs: ERRORS): ERRORS {
    const errors: ERRORS = {};
    const emailExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/u;
    const passwordExp = /^(?=.*\d)()(?=.*[A-Z]).{8,24}$/u;

    console.log(inputs);
    
    if ("name" in inputs) {
        if (!inputs.name || typeof inputs.name !== "string") {
            errors.name = "Name is required!";
        }
    }
    if ("email" in inputs) {
        if (!inputs.email || typeof inputs.email !== "string") {
            errors.email = "Email is required!";
        } else if (!emailExp.test(inputs.email)) {
            errors.email = "Invalid email address!";
        }
    }
    if ("addressLine1" in inputs) {
        
    }
    if ("addressLine2" in inputs) {

    }
    if ("state" in inputs) {

    }
    if ("postcode" in inputs) {

    }

    if ("password" in inputs) {
        if (!inputs.password || typeof inputs.password !== "string") {
            errors.password = "Password is required!";
          } else if (!passwordExp.test(inputs.password)) {
            errors.password = "Password must be between 8 and 24 characters long containing at least 1 number and 1 uppercase character!";
          }
    }
    if ("confirm" in inputs) {
        if (!inputs.confirm || typeof inputs.confirm !== "string") {
            errors.confirm = "Password required!";
        } else if (inputs.password !== inputs.confirm) {
            errors.confirm = "Passwords do not match!";
        }
    }

    console.log(errors);
    return errors;
}

export default formValidation;