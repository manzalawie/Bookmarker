var tableBody = document.getElementById("tableContent");
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var productList;

if (localStorage.getItem("products") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("products"));
  displaySites();
}

function addSite() {
  var newSite = {
    siteName: siteName.value,
    siteUrl: siteUrl.value,
  };
  if (!(siteName.value === "" || siteUrl.value === "")) {
    productList.push(newSite);
    localStorage.setItem("products", JSON.stringify(productList));
  }
  nullInputs();
  clearInput();
  displaySites();
}

function displaySites() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `<tr>
        <td>1</td>
        <td>${productList[i].siteName}</td>
        <td>
          <button class="btn btn-success" onclick="openSite('${productList[i].siteUrl}')">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </button>
        </td>
        <td>
          <button class="btn btn-danger pe-2" id="delete" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
      </tr>`;
  }
  tableBody.innerHTML = cartona;
}

function openSite(url) {
  window.open("https://" + url, "_blank");
}
function deleteSite(deletedNum) {
  productList.splice(deletedNum, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  displaySites();
}
function clearInput() {
  siteName.value = null;
  siteUrl.value = null;

  siteUrl.classList.remove("is-invalid");
  siteUrl.classList.remove("is-valid");
  siteName.classList.remove("is-invalid");
  siteName.classList.remove("is-valid");
}
function validateItems(element) {
  var regex = {
    siteName: /^[a-zA-Z]{1,20}$/,
    siteUrl: /^(www\.)?[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,6}$/,
  };

  var valueSite = siteName.value;
  var valueUrl = siteUrl.value;
  var btn = document.getElementById("SubmitBtn");

  if (element.id === "siteName") {
    if (regex[element.id].test(valueSite) == true) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    } else {
      btn.classList.add("disabled");
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  } else if (element.id === "siteUrl") {
    if (regex[element.id].test(valueUrl) == true) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    } else {
      btn.classList.add("disabled");
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  }
  if (
    regex[siteName.id].test(valueSite) == true &&
    regex[siteUrl.id].test(valueUrl) == true
  ) {
    btn.classList.remove("disabled");
  }
}
function nullInputs() {
  if (siteName.value === "" || siteUrl.value === "") {
    var element = document.getElementById("boxInfo");
    element.classList.remove("d-none");
    bodyClick();
  }

  function bodyClick() {
    setTimeout(function () {
      document.body.onclick = function bodyOnClick() {
        element.classList.add("d-none");
        document.body.onclick = null;
      };
    }, 10);
  }
}
