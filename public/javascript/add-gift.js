async function newFormHandler(event) {
    event.preventDefault();

    const item_desc = document.querySelector('input[name="item_desc"]').value;
    const item_img_url = document.querySelector('input[name="item_img_url"]').value

    const response = await fetch(`/api/gifts`, {
        method: 'POST',
        body: JSON.stringify({
            item_desc,
            item_img_url
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);