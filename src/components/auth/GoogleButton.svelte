<script>
	import { isAuthenticated } from '../../stores';
	import gClient from '../../helpers/authGoogle';
	import { onMount } from 'svelte';
	import { Button } from "carbon-components-svelte";

	const client = new gClient();

	onMount(() => {
		client.initiate();
	});
</script>

<Button id="googleButton">
	{$isAuthenticated ? 'Logout' : 'Login'}
</Button>
