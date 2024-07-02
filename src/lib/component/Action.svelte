<script lang="ts">
	import { Game } from '$lib/store/Game';

</script>

<div style="position:absolute;left:480px;top:485px;">
	<svg width="60" height="60" >
		<circle cx="30" cy="30" r="25" fill="none" stroke="#90caf9" stroke-width="2" />		
	</svg>	
	<div style="border:1px solid green;text-align:center;color:white">下注</div>
</div>

<div style="position:absolute;left:680px;top:455px;">
	<object data="/img/action/hit.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div style="border:1px solid green;text-align:center;color:white">停牌</div>
</div>

