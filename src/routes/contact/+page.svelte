<script lang="ts">
	import { resume } from '$lib/data/resume.js';
	import { onMount } from 'svelte';

	onMount(() => { 
		document.body.classList.add('scrollable'); 
		return () => document.body.classList.remove('scrollable'); 
	});
</script>

<svelte:head>
	<title>Contacto con {resume.about.name} — {resume.about.role}</title>
	<meta name="description" content="Ponte en contacto con {resume.about.name}, {resume.about.role} ubicado en {resume.contact.location}. {resume.contact.available ? 'Actualmente disponible para nuevas oportunidades.' : ''}" />
	<link rel="canonical" href="https://tu-dominio.dev/contacto" />
</svelte:head>

<div class="page">
	<a href="/" class="back-link">← Volver al Portfolio 3D</a>

	<header>
		<h1>Contacto</h1>
		<p class="role">{resume.about.name} · {resume.contact.location}</p>
		{#if resume.contact.available}
			<span class="badge">Disponible para oportunidades</span>
		{/if}
	</header>

	<section aria-label="Información de contacto">
		<address>
			<dl>
				<div class="dl-row">
					<dt>Correo electrónico</dt>
					<dd><a href="mailto:{resume.contact.email}">{resume.contact.email}</a></dd>
				</div>
				<div class="dl-row">
					<dt>GitHub</dt>
					<dd><a href="https://{resume.contact.github}" target="_blank" rel="noopener noreferrer">{resume.contact.github}</a></dd>
				</div>
				<div class="dl-row">
					<dt>LinkedIn</dt>
					<dd><a href="https://{resume.contact.linkedin}" target="_blank" rel="noopener noreferrer">{resume.contact.linkedin}</a></dd>
				</div>
				<div class="dl-row">
					<dt>Ubicación</dt>
					<dd>{resume.contact.location}</dd>
				</div>
			</dl>
		</address>
	</section>
</div>

<style>
	@import '../_page-base.css';

	address { font-style: normal; }

	dl {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 0;
	}

	.dl-row {
		display: flex;
		gap: 16px;
		align-items: baseline;
	}

	dt {
		min-width: 80px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255 255 255 / 0.35);
	}

	dd {
		margin: 0;
		font-size: 15px;
		color: rgba(255 255 255 / 0.75);
	}

	dd a {
		color: #88aaff;
		text-decoration: none;
	}

	dd a:hover { text-decoration: underline; }
</style>
