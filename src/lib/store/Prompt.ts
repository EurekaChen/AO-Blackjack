import { writable } from 'svelte/store';
export const Prompt = writable(["操作提示"]);

export function AddPrompt(item:string) {
    Prompt.update(items => [...items, item]);
  }