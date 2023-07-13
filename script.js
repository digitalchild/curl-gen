const curlForm = document.getElementById('curlForm');
const resultDiv = document.getElementById('result');
const curlCommandDiv = document.getElementById('curlCommand');
const copyButton = document.getElementById('copyButton');
const addHeaderButton = document.getElementById('addHeaderButton');
const addParameterButton = document.getElementById('addParameterButton');
const headersContainer = document.getElementById('headersContainer');
const parametersContainer = document.getElementById('parametersContainer');
const contentTypeInput = document.getElementById('contentType');
const acceptSelfSignedInput = document.getElementById('acceptSelfSigned');


addHeaderButton.addEventListener('click', function() {
    headersContainer.style.display = 'block';

    const headerRow = document.createElement('div');
    headerRow.classList.add('mb-3', 'header-row');
    headerRow.innerHTML = `
    <div class="row">
        <div class="col">
        <input type="text" name="headerKey[]" class="form-control" placeholder="Header Key">
        </div>
        <div class="col">
        <input type="text" name="headerValue[]" class="form-control" placeholder="Header Value">
        </div>
        <div class="col-auto">
        <button type="button" class="btn btn-primary remove-header"><i class="bi bi-x"></i></button>
        </div>
    </div>
    `;
    headersContainer.appendChild(headerRow);
});

addParameterButton.addEventListener('click', function() {
    parametersContainer.style.display = 'block';

    const parameterRow = document.createElement('div');
    parameterRow.classList.add('mb-3', 'parameter-row');
    parameterRow.innerHTML = `
    <div class="row">
        <div class="col">
        <input type="text" name="parameterName[]" class="form-control" placeholder="Parameter Name">
        </div>
        <div class="col">
        <textarea name="parameterValue[]" class="form-control" rows="5" placeholder="Parameter Value"></textarea>
        </div>
        <div class="col-auto">
        <button type="button" class="btn btn-primary remove-parameter"><i class="bi bi-x"></i></button>
        </div>
    </div>
    `;
    parametersContainer.appendChild(parameterRow);
});

curlForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('url');
    const url = urlInput.value;

    const requestTypeInput = document.getElementById('requestType');
    const requestType = requestTypeInput.value;

    const parameterNameInputs = document.querySelectorAll('input[name="parameterName[]"]');
    const parameterValueInputs = document.querySelectorAll('textarea[name="parameterValue[]"]');
    const headerKeyInputs = document.querySelectorAll('input[name="headerKey[]"]');
    const headerValueInputs = document.querySelectorAll('input[name="headerValue[]"]');

    let curlCommand = 'curl';

    if (requestType === 'GET') {
        curlCommand += ` "${url}`;

        const parameters = [];
        for (let i = 0; i < parameterNameInputs.length; i++) {
            const name = parameterNameInputs[i].value.trim();
            const value = parameterValueInputs[i].value.trim();
            if (name && value) {
                parameters.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
            }
        }
        if (parameters.length > 0) {
            curlCommand += `?${parameters.join('&')}`;
        }

        curlCommand += '"';
    } else if (requestType === 'POST' || requestType === 'PUT' || requestType === 'PATCH' || requestType === 'DELETE') {
        curlCommand += ` -X ${requestType} "${url}"`;

        const formData = [];
        for (let i = 0; i < parameterNameInputs.length; i++) {
            const name = parameterNameInputs[i].value.trim();
            const value = parameterValueInputs[i].value.trim();
            if (name && value) {
                formData.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
            }
        }
        if (formData.length > 0) {
            curlCommand += ` -d "${formData.join('&')}"`;
        }
    }

    const headers = [];
    for (let i = 0; i < headerKeyInputs.length; i++) {
        const key = headerKeyInputs[i].value.trim();
        const value = headerValueInputs[i].value.trim();
        if (key && value) {
            headers.push(`-H "${key}: ${value}"`);
        }
    }
    if (headers.length > 0) {
        curlCommand += ` ${headers.join(' ')}`;
    }

     // Display the result
     curlCommandDiv.textContent = curlCommand;
     curlCommandDiv.style.wordWrap = 'break-word';
     resultDiv.classList.remove('d-none');
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-parameter') || event.target.closest('.remove-parameter')) {
        event.preventDefault();
        const parameterRow = event.target.closest('.parameter-row');
        parameterRow.parentNode.removeChild(parameterRow);
    }
    if (event.target.classList.contains('remove-header') || event.target.closest('.remove-header')) {
        event.preventDefault();
        const headerRow = event.target.closest('.header-row');
        headerRow.parentNode.removeChild(headerRow);
    }
});

copyButton.addEventListener('click', function() {
    const curlCommandText = curlCommandDiv.textContent;

    const tempInput = document.createElement('textarea');
    tempInput.value = curlCommandText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    copyButton.textContent = 'Copied!';
    setTimeout(function() {
        copyButton.textContent = 'Click to Copy';
    }, 1500);
});
