import { INPUTS } from "@/hooks/useForm";

function formValidation(inputs: INPUTS): INPUTS {
    const errors: INPUTS = {};
    const emailExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/u;
    const passwordExp = /^(?=.*\d)()(?=.*[A-Z]).{8,24}$/u;
    
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
        if (typeof inputs.addressLine1 !== "string") {
            errors.addressLine1 = "AddressLine1 must be of type text";
        }
    }

    if ("addressLine2" in inputs) {
        if (typeof inputs.addressLine2 !== "string") {
            errors.addressLine2 = "AddressLine2 must be of type text";
        }
    }

    if ("state" in inputs) {
        if (typeof inputs.state !== "string") {
            errors.state = "State/province must be of type text";
        }
    }

    if ("postcode" in inputs) {
        if (typeof inputs.postcode !== "string") {
            errors.postcode = "Postcode must be of type text";
        }
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
            errors.confirm = "Password is required!";
        } else if (inputs.password !== inputs.confirm) {
            errors.confirm = "Passwords do not match!";
        }
    }
    
    return errors;
}

export default formValidation;