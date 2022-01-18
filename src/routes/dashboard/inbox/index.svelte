<script>
	import { grabMailList } from '../../../helpers/mail/grabMailList';
	import { isAuthenticated } from '../../../stores';

	import Header from '../../../components/Header.svelte';
	import Inbox from '../../../components/mail/Inbox.svelte';

	$: mail = $isAuthenticated ? grabMailList() : [];
	$: if (mail.length > 1) mailList.set(mail);
</script>

<Header />

{#await mail}
	<div class="center-on-page">
		<div class="loader" />
	</div>
{:then mailList}
	<Inbox messages={mailList} />
{:catch error}
	<div class="center-on-page">
		<p style="color:red">{error.message}</p>
	</div>
{/await}
