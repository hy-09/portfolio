import { Color } from "@material-ui/lab";

export type Modal = {
    open: boolean;
    title: string;
    content: any;
}

export type Notify = {
    open: boolean;
    message: string;
    type: Color | undefined;
}