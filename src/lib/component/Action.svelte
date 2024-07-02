<script lang="ts">
	import { Game } from '$lib/store/Game';

</script>
<style>
	.text{
		margin-top:-4px;text-align:center;font-weight: bolder;
	}
</style>

<div id="double" style="position:absolute;left:580px;top:480px;">
	<object data="/img/action/double.svg" title="hit" style="width:60;height:60;" />
 	<div class="text" style="color:#ff9800">加 倍</div>
</div>


<div id="deal" style="position:absolute;left:680px;top:458px;">
	<object data="/img/action/hit.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div class="text" style="color:#90caf9">发 牌</div>
</div>

<div style="position:absolute;left:780px;top:426px;">
	<object data="/img/action/clear.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div class="text" style="color:#cccccc">清 除</div>
</div>


