async function newFormHandler(event) {
	event.preventDefault();

	const item_desc = document.querySelector('input[name="item_desc"]').value;
    const item_url = document.querySelector('input[name="item_img_url"]').value;

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

document
	.querySelector(".new-gift-form")
	.addEventListener("submit", newFormHandler);
