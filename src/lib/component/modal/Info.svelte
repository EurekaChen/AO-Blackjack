<script lang="ts">
	import { onMount } from 'svelte';
	let modal: { show: () => void; hide: () => void };

	onMount(async () => {
		modal = new bootstrap.Modal(document.getElementById('info'));
	});

	export let modalTitle;
	export let modalContent;

	export function openModal() {
		modal.show();
	}
</script>

<div class="modal fade" id="info" tabindex="-1" aria-labelledby="infoTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-4 shadow" style="background-color: #bbdefb;">
			<div class="modal-header p-4 pb-4 border-bottom-0">
				<h1 class="fw-bold mb-0 fs-2 w-100 text-center">{modalTitle}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body p-4 pt-0">
				<div class="form-floating mb-3">
					{@html modalContent}
				</div>
			</div>
			<div class="modal-footer text-center">
				<button type="button" class="btn btn-primary mx-5 w-100" data-bs-dismiss="modal">OK</button>
			</div>
		</div>
	</div>
</div>
