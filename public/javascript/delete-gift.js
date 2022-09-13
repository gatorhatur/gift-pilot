async function deleteFormHandler(event) {
    event.preventDefault();
    console.log(event.target.parentElement)

    const id = document.querySelector(".gift-id").textContent
    
    const response = await fetch(`/api/listItems/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-gift-btn').addEventListener('click', deleteFormHandler);
