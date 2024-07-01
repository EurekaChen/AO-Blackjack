<script lang="ts">
	export let amount;

	//设计思路：从大到小算出每种筹码的个数
	//从大到小列筹码
	//let chipArray = [10000000, 2500000, 500000, 100000, 50000, 10000, 2500, 500, 100, 50, 25, 10, 5, 1];
	//我当前筹码是这些：
	let chipArray = [25000, 5000, 1000, 500, 100, 25, 5];
	let chipCountArray = [0, 0, 0, 0, 0, 0, 0];

	let amt = amount;
	for (let index = 0; index < chipArray.length; index++) {
		let chip = chipArray[index];
		//筹码个数
		chipCountArray[index] = Math.floor(amt / chip);
		amt -= chipCountArray[index] * chipArray[index];
	}	

	let chipImgArr = [];
	let position = 0;
	for (let i = 0; i < 7; i++) {
		for (let j = 1; j <= chipCountArray[i]; j++) {
			position += 1;
			chipImgArr.push({ img: chipArray[i], position: position });
		}
	}
</script>

<div style="position:relative;width:50px;">
	{#each chipImgArr as chipImg}
		<img
			class="chip"
			src="/img/chip/{chipImg.img}.png"
			alt={chipImg.img.toString()}
			style="top:{-30 - chipImg.position * 6}px;"
		/>
	{/each}
	<div class="amount">
		{amount}
	</div>
</div>

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
