import { NotificationProps } from "./notification";

export default class NotificationError extends Error {
    constructor(public errors: NotificationProps[]) {
        super(errors.map((err) => `${err.context}: ${err.message}`).join(", "));
    }
}