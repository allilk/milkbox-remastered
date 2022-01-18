export const getMessage = async (id) => {
	const response = await gapi.client.gmail.users.messages.get({
		userId: 'me',
		id
	});

	return response.result;
};
