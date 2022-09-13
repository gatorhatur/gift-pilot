async function submitPurchaseHandler(event) {
  let ele = document.getElementsByTagName("input");
  event.preventDefault();
  for (let i = 0; i < ele.length; i++) {
    if ((ele[i].type = "radio")) {
      if (ele[i].checked) {
        const listItemId = ele[i].value;
        const response = await fetch(`/api/listItems/purchase/${listItemId}`, {
          method: "POST",
        });
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
    }
  }
}

document
  .querySelector("#purchase-modal")
  .addEventListener("submit", submitPurchaseHandler);
