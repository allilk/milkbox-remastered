<script>
	import { formatDate } from '../../helpers/mail/formatDate';

	export let sender, title, description, timeSent;
	description = window.atob(description.replace(/-/g, '+').replace(/_/g, '/'));
</script>

<div class="piece-main">
	<div id="title">
		{title}
	</div>
	<div class="line-2">
		<div id="sender">
			{sender[0].replaceAll('"', '')}
		</div>
		<div id="date">{formatDate(timeSent)}</div>
	</div>
	<div id="description">
		<iframe srcdoc={description} title="description" />
	</div>
</div>

<style>
	.piece-main {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 60%;
		margin: 0 auto;
	}
	.piece-main > * {
		border: 2px silver solid;
		border-top: 0;
		border-bottom: 0;
		padding: 1rem 3rem;
	}
	.piece-main > :first-child {
		border: 2px silver solid;
		border-bottom: 0;
		border-radius: 16px 16px 0 0;
	}
	#title {
		font-size: 24px;
		padding: 2rem 3rem;
	}
	#description {
		border: 2px silver solid;
		border-radius: 0 0 16px 16px;
	}
	.line-2 {
		display: inline-flex;
		justify-content: space-between;
		padding: 1rem 3rem;
	}
	iframe {
		width: 100%;
		height: 100vh;
		border: 0;
		outline: 0;
		border-radius: inherit;
	}
</style>
