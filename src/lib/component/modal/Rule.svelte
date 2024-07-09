<script lang="ts">
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	let modal: { show: () => void; hide: () => void };

	onMount(async () => {
		modal = new bootstrap.Modal(document.getElementById('rule'));
	});

	export function openModal() {
		modal.show();
	}
</script>

<!-- #region 规则弹出窗口-->
<div class="modal fade" id="rule" tabindex="-1" aria-labelledby="ruleTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="ruleTitle">
					{$t('top.rule.title')}
				</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				{@html $t('top.rule.content')}
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>
<!-- #endregion -->