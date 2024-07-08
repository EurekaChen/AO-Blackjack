<script lang="ts">	
	import { ChipRank } from "$lib/store/Setting";
	export let amount;

	let reverseChipRank = $ChipRank.slice().reverse();//原数组不变
	let chipLength=reverseChipRank.length;
	let reverseChipRankCount = new Array(chipLength).fill(0);
    let amt = amount;

	console.log("amt,amount:",amt,amount)
	for (let index = 0; index < chipLength; index++) {
		let chip:number = reverseChipRank[index];
		//筹码个数		
		reverseChipRankCount[index] = Math.floor(amt / chip);
		amt -= reverseChipRankCount[index] * reverseChipRank[index];
	}	

	let chipImgArr = [];
	let position = 0;
	for (let i = 0; i < chipLength; i++) {
		for (let j = 1; j <= reverseChipRankCount[i]; j++) {
			position += 1;
			chipImgArr.push({ img: reverseChipRank[i].toString(), position: position });
		}
	}	
</script>

<style>
	.chip {
		position: absolute;
		width: 45px;
		left: 0px;
	}
	.amount {
		text-align: center;
		width: 50px;
		color: #64b5f6;
		height: 20px;
		position: absolute;
	}
</style>

<div style="position:relative;width:50px;">
	{#each chipImgArr as chipImg}
		<img
			class="chip"
			src="/img/chip/{chipImg.img}.png"
			alt="{chipImg.img}"
			style="top:{-30 - chipImg.position * 6}px;"
		/>
	{/each}
	<div class="amount">
		{#if amount>0}
		{amount}
		{/if}
	</div>
</div>



