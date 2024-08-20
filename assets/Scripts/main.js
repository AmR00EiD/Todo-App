// ################## theme mode #####################

var drkbtn = document.getElementById("dark-mode");
var litbtn = document.getElementById("light-mode");

function drkmod() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
}
function litmod() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light");
}
if (drkbtn && litbtn) {
  drkbtn.addEventListener("click", drkmod);
  litbtn.addEventListener("click", litmod);
}
window.addEventListener("load", function () {
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    drkmod();
  } else {
    litmod();
  }
});

//################## navbar links #####################
document.addEventListener("DOMContentLoaded", function () {
  var currentPage = window.location.pathname;
  var navLinks = document.querySelector(".nav-links");
  let links = [];

  if (currentPage.includes("login.html")) {
    links = [{ href: "login.html", text: "Login" }];
  } else {
    links = [
      { href: "dashboard.html", text: "Dashboard" },
      { href: "profile.html", text: "Profile" },
    ];
  }

  navLinks.innerHTML = links
    .map((link) => {
      var selected = currentPage.includes(link.href);
      return `<li><a href="${link.href}" id="${selected ? "selected" : ""}">${
        link.text
      }</a></li>`;
    })
    .join("");
});

// ################## data and time for nav bar #################
function displayDate() {
  var rightNavbar = document.getElementsByClassName("navbar-right")[0];
  var date = new Date();
  var dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  var timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  var formattedDate = date.toLocaleDateString(undefined, dateOptions);
  var formattedTime = date.toLocaleTimeString(undefined, timeOptions);

  rightNavbar.innerHTML = `<span>${formattedDate}</span> <span id="separator"></span></span><span>${formattedTime}</span>`;
}

displayDate();
setInterval(displayDate, 1000);

