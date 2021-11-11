import { createSlice } from '@reduxjs/toolkit';
import { Backdrop, Modal, Notify } from '../types/others';

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
    }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const othersSlice = createSlice({
    name: 'others',
    initialState,
  // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        endLoading(state) {
            state.isLoading = false
        },
        handleOpenModal(state, action) {
            state.modal = {
                open: true,
                title: action.payload.title,
                content: action.payload.content
            }
        },
        handleCloseModal(state) {
            state.modal = {
                open: false,
                title: '',
                content: ''
            }
        },
        handleOpenNotify(state, action) {
            state.notify = {
                open: true,
                message: action.payload.message,
                type: action.payload.type,
            }
        },
        handleCloseNotify(state) {
            state.notify = {
                open: false,
                message: '',
                type: undefined,
            }
        },
        handleOpenBackdrop(state) {
            state.backdrop = {
                open: true,
            }
        },
        handleCloseBackdrop(state) {
            state.backdrop = {
                open: false,
            }
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
            state.notify = {
                open: false,
                message: '',
                type: undefined,
            }
            state.backdrop = {
                open: false,
            }
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default othersSlice.reducer;
