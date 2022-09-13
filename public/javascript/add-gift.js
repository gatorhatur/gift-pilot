async function newFormHandler(event) {
	event.preventDefault();

    const item_desc = document.querySelector('input[name="gift-title"]').value;
    const item_url = document.querySelector('input[name="gift-url"]').value

	const response = await fetch(`/api/listItems`, {
		method: "POST",
		body: JSON.stringify({
			item_desc,
            item_url,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	}
}

document.querySelector('#create-gift-btn').addEventListener('click', newFormHandler);
