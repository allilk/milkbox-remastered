<script>
	import { goto } from '$app/navigation';

	import { formatDate } from '../../helpers/mail/formatDate';

	export let sender, title, description, timeSent, key, id, unread;
</script>

<tr class="mailPiece" {key} on:click={() => goto(`/dashboard/inbox/view/${id}`)}>
	<td id="sender">
		<span class={unread ? 'unread' : ''}>
			{sender[0].replaceAll('"', '')}
		</span>
	</td>

	<td id="middle">
		<span class={unread ? 'unread-desktop' : ''}>
			<span id="title">{title}</span>
		</span>
		<span id="description">{@html description}</span>
	</td>
	<td id="date">{formatDate(timeSent)}</td>
</tr>

<style>
	.mailPiece {
		height: 85px;
		border-bottom: 0.5px solid lightslategrey;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		cursor: pointer;
	}
	#sender {
		padding-left: 1rem;
		font-weight: 600;
	}
	#date {
		white-space: nowrap;
		text-align: right;
		padding-right: 1rem;
		position: absolute;
		top: 12px;
		right: 0;
	}
	#middle {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-left: 1rem;
		width: 92%;
	}
	#title {
		text-align: center;
	}
	#title::after {
		content: '\a';
		white-space: pre;
	}
	.unread,
	.unread-desktop {
		position: relative;
	}
	.unread::after {
		content: ' ';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: blue;
		position: absolute;
		top: 0.25rem;
		right: -1rem;
	}
	.unread-desktop::before {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: blue;
		position: absolute;
	}
	#description,
	#date {
		color: lightslategrey;
	}
	@media (min-width: 768px) {
		.mailPiece {
			display: table-row;
			height: 75px;
		}
		#sender {
			padding-left: 3rem;
		}
		#date {
			padding-right: 3rem;
			width: 15%;
			position: initial;
		}
		#title {
			text-align: left;
			font-weight: 600;

			padding: 0;
			padding-right: 0.75rem;
		}
		#title::after {
			content: '';
		}
		#description {
			display: initial;
		}
		#middle {
			width: 60%;
		}
		.unread::after {
			content: none;
		}
		.unread-desktop::before {
			content: ' ';
			left: -1rem;
			top: 0.25rem;
		}
	}
</style>
