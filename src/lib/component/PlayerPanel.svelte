<script lang="ts">
	export let aoPlayer={
        name:"空",
        addr:"空",
        balance:0
    };
	
</script>

<dl class="row">
	<dt class="col-sm-2">用户名</dt>
	<dd class="col-sm-10">{aoPlayer.name}</dd>
	<dt class="col-sm-2">钱包地址</dt>
	<dd class="col-sm-10">{aoPlayer.addr}</dd>
	<dt class="col-sm-2">余额</dt>
	<dd class="col-sm-10">{aoPlayer.balance}</dd>
	<dt class="col-sm-2">状态</dt>
	<dd class="col-sm-10">9999999</dd>
</dl>
