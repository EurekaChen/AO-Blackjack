<script lang="ts">

import { Player } from '$lib/store/Player';
	import { Dealer } from '$lib/store/Dealer';
	import { Action } from '$lib/store/Action';
	function deal() {
		//if ($Game.State == 1) return;
		$Dealer.Hand = ['Qs', 'hole'];
		$Player.Hand = ['Th', '8s'];
		$Action.deal = false;
		$Action.hit = true;
		$Action.clear = false;
		$Action.stand = true;
		$Action.doubleChip = false;
		$Action.doubleBet = true;
		console.log('点了发牌按钮');
	}
</script>

<a href="./#" on:click={deal} style="text-decoration: none;">
	<svg width="60" height="60">
        <circle class="back" cx="30" cy="30" r="25" />
        <rect class="line" x="18" y="15" rx="2" ry="2" width="24" height="30" />
        <rect class="line" x="18" y="15" rx="2" ry="2" width="18" height="30" />
        <text x="22" y="36">♣</text>
        <circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">发 牌</div>
</a>

<style>
    .back {
        fill: #223344;
    }

    .line {
        stroke: #90caf9;
        stroke-width: 2;
        fill: #0d47a1;
    }

    text {
        fill: #90caf9;
        font-weight: bolder;
    }

    .hoverCircle {
        stroke-width: 2;
        stroke: #90caf9;
        fill: transparent;
        transition: all 0.3s ease;
    }

    .hoverCircle:hover {
        stroke-width: 6;
    }
</style>
