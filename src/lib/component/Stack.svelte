<script lang="ts">
	export let amount;
	
	//设计思路：从大到小算出每种筹码的个数
	//从大到小列筹码
	//let chipArray = [10000000, 2500000, 500000, 100000, 50000, 10000, 2500, 500, 100, 50, 25, 10, 5, 1];
	//我当前筹码是这些：
	let chipArray = [25000, 5000, 1000, 500, 100, 25, 10, 5];
	let chipCountArray = [0, 0, 0, 0, 0, 0, 0, 0];

	for (let index = 0; index < chipArray.length; index++) {
		let chip = chipArray[index];
		//大筹码个数
		chipCountArray[index] = Math.floor(amount / chip);
		amount -= chipCountArray[index] * chipArray[index];
	}

	let chipIndex = 0;
</script>

<div>
	{#each chipArray as chip,i}
		{i}
        {chip}
		{#each Array(chipCountArray[chipIndex]).fill() as _, j}
			<img
				src="/img/chip/{chip}.png"
				alt={chip.toString()}
				style="width:46px;position:absolute;"
			/>
		{/each}
	{/each}
	<div style="color:#64b5f6;height:20px; position:absolute;">
		{amount}
	</div>
</div>
