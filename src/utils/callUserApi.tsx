import { ERRORS } from "@/hooks/useForm";
import isObjectEmpty from "@/utils/isObjectEmpty";

async function callUserApi(errors: ERRORS) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                isObjectEmpty(errors) ? resolve("success") : reject("fetch reject");
            }, 3000);
        });
}

export default callUserApi;