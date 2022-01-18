<script>
	import { page } from '$app/stores';
	import { isAuthenticated } from '../../../../stores';

	import { grabMessage } from '../../../../helpers/mail/grabMessage';

	import ViewPiece from '../../../../components/mail/ViewPiece.svelte';
	import Header from '../../../../components/Header.svelte';

	$: piece = $isAuthenticated ? grabMessage($page.params.slug) : {};
</script>

<Header />

{#await piece}
	<div class="center-on-page">
		<div class="loader" />
	</div>
{:then piece}
	{#if piece.payload}
		<svelte:component
			this={ViewPiece}
			description={piece?.payload.parts[1].body.data}
			timeSent={piece?.internalDate}
			sender={piece?.payload.headers.find((elem) => elem.name == 'From').value.split(' <')}
			title={piece?.payload.headers.find((elem) => elem.name == 'Subject').value}
		/>
	{/if}
{/await}
