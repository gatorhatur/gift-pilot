export function modalAlerts(element,alertLevel, message){
    switch (alertLevel) {
        case 'warning':
            element.setAttribute('class', 'alert alert-warning')
            break;
        case 'success':
            element.setAttribute('class', 'alert alert-success')
            break;
        case 'error':
            element.setAttribute('class', 'alert alert-danger')
            break;
        case 'info':
            element.setAttribute('class', 'alert alert-info')
    }

    element.textContent = message;

    return;
}

