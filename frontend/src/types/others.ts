import { Color } from "@material-ui/lab";

export type RouteType = {
    path: string,
    title?: string,
    icon?: JSX.Element,
    exact: boolean,
    children: JSX.Element,
    routes?: Array<RouteType>,
}

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