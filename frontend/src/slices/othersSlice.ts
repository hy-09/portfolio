import { createSlice } from '@reduxjs/toolkit';
import { Backdrop, Dialog, Modal, Notify } from '../types/others';

type InitialState = {
    isLoading: boolean;
    modal: Modal;
    notify: Notify;
    backdrop: Backdrop;
}

const initialState: InitialState = {
    isLoading: false,
    modal: {
        open: false,
        title: '',
        content: ''
    },
    notify: {
        open: false,
        message: '',
        type: undefined,
    },
    backdrop: {
        open: false,
    },
};

export const othersSlice = createSlice({
    name: 'others',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        endLoading(state) {
            state.isLoading = false
        },
        handleOpenModal(state, action) {
            state.modal = {
                ...action.payload,
                open: true,
            }
        },
        handleCloseModal(state) {
            state.modal = initialState.modal
        },
        handleOpenNotify(state, action) {
            state.notify = {
                open: true,
                message: action.payload.message,
                type: action.payload.type,
            }
        },
        handleCloseNotify(state) {
            state.notify = initialState.notify
        },
        handleOpenBackdrop(state) {
            state.backdrop = {
                open: true,
            }
        },
        handleCloseBackdrop(state) {
            state.backdrop = initialState.backdrop
        },
        handleOpenNotifyAndBackdrop(state, action) {
            state.notify = {
                open: true,
                message: action.payload.message,
                type: action.payload.type,
                onCloseMethod: 'closeNotifyAndBackdrop'
            }
            state.backdrop = {
                open: true,
                onCloseMethod: 'closeNotifyAndBackdrop'
            }
        },
        handleCloseNotifyAndBackdrop(state) {
            state.notify = initialState.notify
            state.backdrop = initialState.backdrop
        },
        resetOthersState(state) {
            state.modal = initialState.modal
            state.notify = initialState.notify
            state.backdrop = initialState.backdrop
        }
    },
});

export const { 
    startLoading, 
    endLoading,  
    handleOpenModal,
    handleCloseModal,
    handleOpenNotify,
    handleCloseNotify,
    resetOthersState,
    handleOpenBackdrop,
    handleCloseBackdrop,
    handleOpenNotifyAndBackdrop,
    handleCloseNotifyAndBackdrop,
} = othersSlice.actions;

export default othersSlice.reducer;
