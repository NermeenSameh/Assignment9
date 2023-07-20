var pSiteNameInput = document.getElementById("sideNameId");
var pWebsiteUrlInput = document.getElementById("websiteUrlId");
var content;
if (localStorage.getItem("storage") == null) {
  content = [];
} else {
  content = JSON.parse(localStorage.getItem("storage"));
  displaySiteName();
}

function addSiteName() {
  var addNames =
  {
    pSiteName: pSiteNameInput.value,
    pWebsiteUrl: pWebsiteUrlInput.value,
  }
  content.push(addNames);
  localStorage.setItem("storage", JSON.stringify(content));
  displaySiteName();
  clearInputs();
}

function clearInputs() {
  pSiteNameInput.value = "";
  pWebsiteUrlInput.value = "";
}
function displaySiteName() {
  var container = ``;
  for (var i = 0; i < content.length; i++) {
    container += `
        <tr>
        <td>${i}</td>
        <td>${content[i].pSiteName}</td>

        <td><button  onclick="visitWebsite(${i})" class="btn btn-visit">
                <i class="fa-regular fa-eye text-white"></i>
                Visit
            </button></td>
        <td>
            <button class="btn btn-danger" onclick="setDataToDelete(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
    </tr>`
  }
  document.getElementById("tBody").innerHTML = container;
}

function setDataToDelete(pIndex) {
  content.splice(pIndex, 1)
  displaySiteName();
  localStorage.setItem("storage", JSON.stringify(content))

}
function visitWebsite(pIndex) {
  open(content[pIndex].pWebsiteUrl);
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

pSiteNameInput.addEventListener("input", function () {
  validate(pSiteNameInput, nameRegex);
});

pWebsiteUrlInput.addEventListener("input", function () {
  validate(pWebsiteUrlInput, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}