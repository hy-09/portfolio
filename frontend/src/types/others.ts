import { Color } from "@material-ui/lab";
import { ReactNode } from "react";

export type RouteType = {
    name?: string;
    path: string,
    exact: boolean,
    children: ReactNode,
}

export type Modal = {
    open: boolean;
    title?: string;
    content: string | JSX.Element;
    maxWidth?: string;
}

export type Notify = {
    open: boolean;
    message: string;
    type: Color | undefined;
    onCloseMethod?: 'closeOnlyNotify' | 'closeNotifyAndBackdrop'
}

export type Backdrop = {
    open: boolean;
    onCloseMethod?: 'closeOnlyBackdrop' | 'closeNotifyAndBackdrop'
}

export type Dialog = {
    open: boolean;
    title: string;
    content: JSX.Element | null;
}
