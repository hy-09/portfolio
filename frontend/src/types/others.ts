import { Color } from "@material-ui/lab";

export type RouteType = {
    name?: string;
    path: string,
    exact: boolean,
    children: JSX.Element,
}

export type Modal = {
    open: boolean;
    title?: string;
    content: any;
}

export type Notify = {
    open: boolean;
    message: string;
    type: Color | undefined;
}