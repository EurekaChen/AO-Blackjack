import { writable } from 'svelte/store';
import { connect } from '@permaweb/aoconnect';

export const ChipRank = writable([
	0.01, 0.05, 0.1, 0.25, 0.5, 1, 5, 25, 100, 500, 1000, 5000, 25000, 100000
]);

export const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect({
	MU_URL: 'https://ao-mu-1.onrender.com',
	CU_URL: "https://ao-cu-1.onrender.com",   
    GATEWAY_URL: "https://ar-io.dev/",

});
