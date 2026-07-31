import toast from "react-hot-toast";
import { MESSAGES } from "../constants/messages";

export function useNotify() {

    function success(message = MESSAGES.SAVE_SUCCESS) {
        toast.success(message);
    }

    function error(message = MESSAGES.UNKNOWN_ERROR) {
        toast.error(message);
    }

    return {

        success,

        error

    };

}