async function newFriendHandler(event) {
    event.preventDefault();
    
    const friend_username = document.querySelector("input[name='friend-username'").value
    console.log(friend_username)

	const response = await fetch(`/api/users/friends/${friend_username}`, {
		method: "POST",
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
	.querySelector("#create-friend-btn")
	.addEventListener("click", newFriendHandler);
