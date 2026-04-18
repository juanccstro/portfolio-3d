<script lang="ts">
	import { resume } from '$lib/data/resume.js';

	let { children } = $props();

	// ── Datos estructurados JSON-LD ───────────────────────────────────────────
	// Dos esquemas:
	//  1. Person — le dice a Google que este es el currículum de un desarrollador real.
	//  2. CreativeWork — describe el proyecto del portfolio 3D en sí.
	const personSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: resume.about.name,
		jobTitle: resume.about.role,
		description: resume.about.bio,
		email: `mailto:${resume.contact.email}`,
		url: 'https://tu-portfolio.vercel.app', // CAMBIA ESTO POR TU URL DE VERCEL
		sameAs: [
			`https://${resume.contact.github}`,
			`https://${resume.contact.linkedin}`
		],
		knowsAbout: [
			...resume.skills.frontend,
			...resume.skills.backend,
			...resume.skills.tools
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: resume.contact.location
		}
	});

	const creativeWorkSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: `${resume.about.name} — Portfolio 3D Interactivo`,
		description: `Un portfolio interactivo en 3D construido con Three.js y SvelteKit, mostrando las habilidades de ${resume.about.role}.`,
		author: { '@type': 'Person', name: resume.about.name },
		url: 'https://tu-portfolio.vercel.app', // CAMBIA ESTO POR TU URL DE VERCEL
		keywords: 'portfolio desarrollador frontend, desarrollador Three.js, portfolio SvelteKit, currículum interactivo, portfolio WebGL',
		inLanguage: 'es'
	});

	// 🔥 ¡IMPORTANTE! Cambia esto por tu dominio real de Vercel
	const SITE_URL = 'https://tu-portfolio.vercel.app'; 
	const OG_IMAGE = `${SITE_URL}/og-image.png`;
</script>

<svelte:head>
	<title>{resume.about.name} — {resume.about.role} | Portfolio 3D Interactivo</title>
	<meta name="description" content="Portfolio de {resume.about.name}, un {resume.about.role} basado en {resume.contact.location}. {resume.about.bio}" />
	<meta name="keywords" content="portfolio desarrollador frontend, {resume.about.name}, desarrollador web, estudiante IA, Big Data, portfolio WebGL, currículum interactivo, {resume.skills.frontend.join(', ')}" />
	<meta name="author" content={resume.about.name} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={SITE_URL} />

	<meta property="og:type" content="profile" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content="{resume.about.name} — Portfolio 3D Interactivo" />
	<meta property="og:description" content="{resume.about.bio} Basado en {resume.contact.location}." />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Vista previa de la habitación portfolio 3D interactiva de {resume.about.name}" />
	<meta property="og:site_name" content="Portfolio de {resume.about.name}" />
	<meta property="og:locale" content="es_ES" />
	<meta property="profile:first_name" content={resume.about.name.split(' ')[0]} />
	<meta property="profile:last_name" content={resume.about.name.split(' ')[1]} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={resume.contact.twitter} />
	<meta name="twitter:creator" content={resume.contact.twitter} />
	<meta name="twitter:title" content="{resume.about.name} — Portfolio 3D Interactivo" />
	<meta name="twitter:description" content={resume.about.bio} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<meta name="theme-color" content="#0d0d1a" />
	<meta name="color-scheme" content="dark" />

	{@html `<script type="application/ld+json">${personSchema}</script>`}
	{@html `<script type="application/ld+json">${creativeWorkSchema}</script>`}
</svelte:head>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		overflow: hidden;
		background: #0d0d1a;
		font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	/* Páginas estáticas necesitan scroll */
	:global(body.scrollable) {
		overflow: auto;
	}
</style>

{@render children()}