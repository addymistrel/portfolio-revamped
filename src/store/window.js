import {
    INITIAL_Z_INDEX,
    WINDOW_CONFIG
} from '#constants';
import {
    create
} from 'zustand'
import {
    immer
} from 'zustand/middleware/immer';

const useWindowStore = create(immer((set, get) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    currentWindowVal: (windowKey) => get().windows[windowKey],

    openWindow: (windowKey, data = null) => set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex;
        win.data = data === null ? win.data : data;
        state.nextZIndex++;
    }),

    closeWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = false;
        win.isMinimized = false;
        win.isMaximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
    }),

    focusWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
    }),

    minimizeWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.isMinimized = true;
    }),

    restoreWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
    }),

    toggleMaximizeWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.isMaximized = !win.isMaximized;
    }),
})));

export default useWindowStore;