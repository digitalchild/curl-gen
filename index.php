<?php include_once('header.php'); ?>
<body>
  <div class="container-fluid py-5 bg-light">
    <div class="container">
      <div class="max-w-md mx-auto bg-white p-4 rounded shadow-sm">
        <h2 class="text-2xl fw-bold mb-4">Curl Command Generator</h2>
        <form id="curlForm">
          <div class="mb-3">
            <label for="url" class="form-label">URL:</label>
            <input type="text" id="url" name="url" class="form-control">
          </div>
          <div class="mb-3">
            <label for="requestType" class="form-label">Request Type:</label>
            <select id="requestType" name="requestType" class="form-select">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div id="headersContainer" style="display: none;">
            <div class="mb-3 header-row">
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
            </div>
          </div>
          <div class="mb-3">
            <button type="button" id="addHeaderButton" class="btn btn-primary">Add Custom Header</button>
          </div>
          <div id="parametersContainer" style="display: none;">
          <div class="mb-3 parameter-row">
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
          </div>
        </div>
          <div class="mb-3">
            <button type="button" id="addParameterButton" class="btn btn-primary">Add Parameter</button>
          </div>
          <div class="mb-3">
            <label for="contentType" class="form-label">Content-Type:</label>
            <input type="text" id="contentType" name="contentType" class="form-control" value="application/json">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" id="acceptSelfSigned" name="acceptSelfSigned" class="form-check-input">
            <label for="acceptSelfSigned" class="form-check-label">Accept Self Signed Certificates</label>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">Generate Curl Command</button>
          </div>
        </form>
        <div id="result" class="mt-4 d-none">
          <label for="curlCommand" class="form-label">Curl Command:</label>
          <div id="curlCommand" class="form-control w-100 h-100"></div>
          <button id="copyButton" class="btn btn-secondary mt-2">Click to Copy</button>
        </div>
      </div>
    </div>
  </div>
</body>

<?php include_once 'footer.php'; ?>