import { MESSAGES } from "../constants/messages";

export function useConfirm() {

    function confirm(
        message = MESSAGES.CONFIRM_DELETE
    ) {

        return window.confirm(message);

    }

    return {

        confirm

    };

}