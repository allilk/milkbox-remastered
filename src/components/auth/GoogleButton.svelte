<script>
	import { isAuthenticated } from '../../stores';
	import gClient from '../../helpers/authGoogle';
	import { onMount } from 'svelte';

	const client = new gClient();

	onMount(() => {
		client.initiate();
	});
</script>

<button id="googleButton">
	{$isAuthenticated ? 'Logout' : 'Login'}
</button>

<style>
	#googleButton {
		margin: 1rem;
		padding: 1rem 5rem;
		border-radius: 5px;
		border: 0;
		letter-spacing: 1px;
		background: white;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		transition: all 0.15s;
	}
	#googleButton:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	#googleButton:hover,
	#googleButton:focus {
		outline: none;
	}
</style>
