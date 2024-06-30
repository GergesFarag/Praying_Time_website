fetchData();
function getData() {
  return new Promise((res, rej) => {
    let req = new XMLHttpRequest();
    req.open("GET", "../JSON/christian_timing.json", true);
    req.send();
    req.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(req.response);
        res(data);
      } else if (this.status == 404) {
        rej(Error("File Not Found"));
      }
    };
  });
}
async function fetchData() {
  try {
    let data = await getData();
    showDataOnDoc(data);
    let [day, month, number, year] = new Date().toString().split(" ");
    let newDate = formatDate(day, month, number, year);
    let date = document.querySelector(".date");
    date.innerHTML = newDate;
  } catch (err) {
    console.error(err);
  }
}
function showDataOnDoc(obj) {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let time = card.firstElementChild.id;
    card.firstElementChild.nextElementSibling.firstElementChild.innerHTML =
      obj[time];
  });
}

function formatDate(day, month, number, year) {
  console.log(day);
  const days = {
    Sat: "السبت",
    Sun: "الأحد",
    Mon: "الإثنين",
    Tue: "الثلاثاء",
    Wed: "الأربعاء",
    Thu: "الخميس",
    Fri: "الجمعة",
  };
  const months = {
    Jan: "يناير",
    Feb: "فبراير",
    Mar: "مارس",
    Apr: "أبريل",
    May: "مايو",
    Jun: "يونيو",
    Jul: "يوليو",
    Aug: "أغسطس",
    Sep: "سبتمبر",
    Oct: "أكتوبر",
    Nov: "نوفمبر",
    Dec: "ديسمبر",
  };
  return `${days[day]} ${number} ${months[month]} ${year}`;
}
