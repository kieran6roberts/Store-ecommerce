import { ICheckoutInputs } from "@/components/Forms/CheckoutForm/CheckoutForm";

export interface IUsersValidation {
    email?: string;
    name?: string;
    address?: string;
    addressLine2?: string;
    city?: string;
    country?: string;
    postcode?: string;
    phone?: string;
}

export const usersValidation = (inputs: ICheckoutInputs): IUsersValidation => {
    const errors: IUsersValidation = {};
    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const numberCheck = /^[0-9]+$/;
    
    if (!inputs.email.trim() || typeof inputs.email !== "string") {
        errors.email = "Valid email is required!";
    } else if (!emailCheck.test(inputs.email)) {
        errors.email = "Invalid email address! Please enter a valid address";
      }

    if (!inputs.name.trim() || typeof inputs.name !== "string") {
        errors.name = "Name is required!";
    }
    
    if (!inputs.address.trim() || typeof inputs.address !== "string") {
        errors.address = "Address is required!";
    }
    
    if (typeof inputs.addressLine2 !== "string") {
        errors.addressLine2 = "Please enter a valid address!";
    }

    if (!inputs.city.trim() || typeof inputs.city !== "string") {
        errors.city = "City is required!";
    }

    if (!inputs.country.trim() || typeof inputs.country !== "string") {
        errors.country = "Country is required!";
    }

    if (!inputs.postcode.trim() || typeof inputs.postcode !== "string") {
        errors.postcode = "Postcode is required!";
    }

    if (!inputs.phone.trim() || typeof inputs.phone !== "string") {
        errors.phone = "Phone number is required!";
    } else if (!numberCheck.test(inputs.phone)) {
        errors.phone = "Invalid phone number! Please enter a valid phone number";
    }

    return errors;
};