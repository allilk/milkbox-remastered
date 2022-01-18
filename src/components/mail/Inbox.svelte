<script>
	import Bar from './Bar.svelte';
	import MailPiece from './MailPiece.svelte';

	export let messages;
</script>

<Bar />

<table id="inbox">
	{#each messages as piece, index}
		<svelte:component
			this={MailPiece}
			description={piece?.snippet}
			timeSent={piece?.internalDate}
			sender={piece?.payload.headers.find((elem) => elem.name == 'From').value.split(' <')}
			title={piece?.payload.headers.find((elem) => elem.name == 'Subject').value}
			key={index}
			id={piece?.id}
			unread={piece?.labelIds.find((elem) => elem == 'UNREAD') ? true : false}
		/>
	{/each}
</table>

<style>
	#inbox {
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
	}
</style>
