// const { default: axios } = require("axios");
import { formatDate } from "./module.js";
console.log("Running Without Live Server")
getTimes("Qāhirah");
function getTimes(city) {
  let country;
  if (city === "Riyāḑ" || city === "Makkah") {
    country = "SA";
    city === "Riyāḑ" ? "Ar Riyāḑ" : "Makkah al Mukarramah";
  } else {
    country = "EG";
    city = "Al Qāhirah";
  }
  axios
    .get(
      `http://api.aladhan.com/v1/timingsByCity/:date?country=${country}&city=${city}`
    )
    .then((response) => {
      let time = response.data.data.timings;
      let date = response.data.data.date;
      time = deleteProperties(time, [
        "Sunrise",
        "Sunset",
        "Imsak",
        "Midnight",
        "Firstthird",
        "Lastthird",
      ]);
      Object.keys(time).map((key) => {
        time[key] = formatTime(time[key]);
      });
      viewDataOnSite(time);
      document.querySelector(".date").innerHTML = formatDate(
        date.gregorian.date,
        date.readable,
        date.gregorian.weekday.en
      );
    })
    .catch((err) => console.log(err));
}
function deleteProperties(obj, proper) {
  proper.forEach((p) => {
    delete obj[p];
  });
  return obj;
}
function viewDataOnSite(obj) {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let time = card.firstElementChild.id;
    card.firstElementChild.nextElementSibling.firstElementChild.innerHTML =
      obj[time];
  });
}
let formatTime = function (timeText) {
  let [hours, minutes] = timeText.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const newHours = hours % 12 || 12;
  const formattedHour = newHours.toString().padStart(2, "0");
  const formattedMinute = minutes.toString().padStart(2, "0");
  return `${formattedHour}:${formattedMinute} ${period}`;
};
let cities = document.querySelectorAll(".dropdown-item");
let title = document.querySelector(".title-name");
let menuParent = document.querySelector(".dropdown").firstElementChild;
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    getTimes(e.target.getAttribute("name"));
    title.innerHTML = e.target.innerHTML;
    menuParent.innerHTML = e.target.innerHTML;
  });
});
