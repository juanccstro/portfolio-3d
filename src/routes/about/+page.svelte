<script lang="ts">
	import { resume } from '$lib/data/resume.js';
	import { onMount } from 'svelte';

	// Las subpáginas necesitan que el cuerpo sea desplazable (scrollable)
	onMount(() => { 
		document.body.classList.add('scrollable'); 
		return () => document.body.classList.remove('scrollable'); 
	});
</script>

<svelte:head>
	<title>Sobre {resume.about.name} — {resume.about.role}</title>
	<meta name="description" content="{resume.about.bio} {resume.about.facts.join('. ')}." />
	<link rel="canonical" href="https://tu-dominio.dev/sobre-mi" />
</svelte:head>

<div class="page">
	<a href="/" class="back-link">← Volver al Portafolio 3D</a>

	<header>
		<h1>{resume.about.name}</h1>
		<p class="role">{resume.about.role}</p>
		{#if resume.contact.available}
			<span class="badge">Disponible para oportunidades</span>
		{/if}
	</header>

	<section aria-labelledby="bio-heading">
		<h2 id="bio-heading">Biografía</h2>
		<p>{resume.about.bio}</p>
	</section>
	
	<section aria-labelledby="facts-heading">
		<h2 id="facts-heading">Datos de interés</h2>
		<ul>
			{#each resume.about.facts as fact}
				<li>{fact}</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="links-heading">
		<h2 id="links-heading">Enlaces</h2>
		<div class="links">
			{#each resume.about.links as link}
				<a href={link.url} class="link-btn {link.type}" rel="noopener">{link.label}</a>
			{/each}
		</div>
	</section>
</div>

<style>
	@import '../_page-base.css';
</style>
