import { writable } from 'svelte/store';

const isDev = process.env.NODE_ENV === 'development';
export const debugMode = writable(isDev);

export function log(...args) {
    debugMode.subscribe(value => {
        if (value) {
            console.log(...args);
        }
    })();
}