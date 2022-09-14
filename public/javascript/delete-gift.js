async function deleteFormHandler(event) {
	event.preventDefault();

	if (!event.target.matches(".delete-gift-btn")) {
		return;
	}
	const href = event.target.getAttribute("href");
	// retrieves item id
	const id = event.target.id;
	console.log(id);

	const deleteBtn = document.getElementById(id);
	console.log(deleteBtn);

	if (deleteBtn) {
		const response = await fetch(`/api/listItems/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			document.location.replace("/dashboard/");
		} else {
			alert(response.statusText);
		}
	} else {
		window.open(href);
	}
}

document
	.querySelector("#gifts-container")
	.addEventListener("click", deleteFormHandler);
