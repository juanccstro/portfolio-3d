<script lang="ts">
	import { loading, focus } from '$lib/stores/scene.svelte.js';

	// La sugerencia desaparece cuando el usuario interactúa
	let dismissed = $state(false);

	$effect(() => {
		if (focus.key) dismissed = true;
	});

	const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
	
	// Traducción adaptada al contexto táctil o de escritorio
	const hintText = isTouchDevice
		? 'Toca un objeto · Arrastra para rotar · Pincha para ampliar'
		: 'Haz clic en un objeto para explorar · Arrastra para rotar · Scroll para zoom';
</script>

{#if loading.done && !dismissed}
	<p class="hint" aria-hidden="true">{hintText}</p>
{/if}

<style>
	.hint {
		position: fixed;
		bottom: 28px;
		left: 50%;
		transform: translateX(-50%);
		padding: 7px 18px;
		background: rgba(0 0 0 / 0.45);
		backdrop-filter: blur(8px);
		border-radius: 20px;
		color: rgba(255 255 255 / 0.65);
		font-size: 13px;
		white-space: nowrap;
		z-index: 10;
		pointer-events: none;
		margin: 0;
		animation: fadeIn 0.4s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateX(-50%) translateY(8px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	@media (max-width: 480px) {
		.hint {
			font-size: 11px;
			white-space: normal;
			text-align: center;
			width: 90%;
			bottom: 20px;
		}
	}
</style>
