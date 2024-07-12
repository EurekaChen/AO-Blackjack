<script lang="ts">
	import { Indicator } from '$lib/store/Indicator';
	function ok() {
		$Indicator.isShow = false;
	}	

</script>

{#if $Indicator.isShow}
	<div class="text-center {$Indicator.class}">
		<div style="font-size:36px">{$Indicator.icon}{$Indicator.text}</div>
		{#if $Indicator.amount!=0}
		<div style="font-size:28px">{$Indicator.amount} EGC</div>
		{:else}
		<div style="font-size:28px"> </div>
		{/if}
		<button on:click={ok} class="btn btn-outline-primary">OK</button>
	</div>
{/if}

<style>

	.tie {
		position: absolute;
		color: #ff9800;
		left: 350px;
		top: 180px;
		background-color: #0d47a1;
		width: 300px;
		height: 150px;
		border-radius: 30px;
		border: 5px #ff9800 solid;	
		animation: winGlow 1s ease-in-out infinite alternate;
	}

	.win {
		position: absolute;
		color: #ff9800;
		left: 350px;
		top: 180px;
		background-color: #0d47a1;
		width: 300px;
		height: 150px;
		border-radius: 30px;
		border: 5px #ff9800 solid;
		animation: winGlow 1s ease-in-out infinite alternate;
	}

	@keyframes winGlow {
		from {
			box-shadow:
				0 0 5px #e3f2fd,
				0 0 10px #e3f2fd,
				0 0 15px #e3f2fd,
				0 0 20px #ff9800,
				0 0 35px #ff9800,
				0 0 40px #ff9800,
				0 0 50px #ff9800,
				0 0 75px #ff9800;
		}
		to {
			box-shadow:
				0 0 10px #e3f2fd,
				0 0 20px #e3f2fd,
				0 0 30px #e3f2fd,
				0 0 40px #ff9800,
				0 0 70px #ff9800,
				0 0 80px #ff9800,
				0 0 100px #ff9800,
				0 0 150px #ff9800;
		}
	}

	.lose {
		position: absolute;
		left: 350px;
		top: 180px;
		color: #90caf9;
		background-color: #0d47a1;
		width: 300px;
		height: 150px;
		border-radius: 30px;
		border: 5px #64b5f6 solid;
		animation: loseGlow 1s ease-in-out infinite alternate;
	}

	@keyframes loseGlow {
		from {
			box-shadow:
				0 0 5px #e3f2fd,
				0 0 10px #e3f2fd,
				0 0 15px #e3f2fd,
				0 0 20px #1565c0,
				0 0 35px #1565c0,
				0 0 40px #1565c0,
				0 0 50px #1565c0,
				0 0 75px #1565c0;
		}
		to {
			box-shadow:
				0 0 10px #e3f2fd,
				0 0 20px #e3f2fd,
				0 0 30px #e3f2fd,
				0 0 40px #1565c0,
				0 0 70px #1565c0,
				0 0 80px #1565c0,
				0 0 100px #1565c0,
				0 0 150px #1565c0;
		}
	}
</style>
