import { writable } from 'svelte/store';

//考虑放到PlayerState一起！取消该文件！
const initialDealer = {
	//暂时现在的EGC都属于我的。
	balance: 100000000,

    //一开始虽然显示两张，但一张未知，等于没有。等能显示的时候再发入。
	hand: []
};

export const Dealer = writable(initialDealer);
