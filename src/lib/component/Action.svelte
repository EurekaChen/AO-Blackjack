<script lang="ts">
	import { Game } from '$lib/store/Game';

</script>
<style>
	.text{
		margin-top:-10px;border:1px solid green;text-align:center;font-weight: bolder;
	}
</style>

<div style="position:absolute;left:580px;top:480px;">
	<object data="/img/action/double.svg" title="hit" style="width:60;height:60;" />
 	<div class="text" style="color:#ff9800">加倍</div>
</div>


<div style="position:absolute;left:680px;top:455px;">
	<object data="/img/action/hit.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div style="border:1px solid green;text-align:center;color:white">停牌</div>
</div>

