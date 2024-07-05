<script lang="ts">
	import { bjProcess } from "$lib";
	import { dryrun } from "@permaweb/aoconnect";


    async function GetPlayers() {
		let getPlayersMsg = await dryrun({
						process: bjProcess,
						tags: [{ name: 'Action', value: 'Eval' }],
						data: "Players"
					});

		console.log(getPlayersMsg);
		
	}

</script>
<div style="position:relative;">
	管理
	<button on:click={GetPlayers}>获取玩家信息</button>
</div>