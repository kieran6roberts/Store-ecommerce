import { INPUTS } from "@/hooks/useForm";
import isObjectEmpty from "@/utils/isObjectEmpty";

async function callUserApi(errors: INPUTS): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                isObjectEmpty(errors) ? resolve("success") : reject("fetch reject");
            }, 3000);
        });
}

export default callUserApi;