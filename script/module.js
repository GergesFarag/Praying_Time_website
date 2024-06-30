export function formatDate(oldFormat, oldmonth, day) {
  const days = {
    Saturday: "السبت",
    Sunday: "الأحد",
    Monday: "الإثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
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
  let month = months[oldmonth.split(" ")[1]];
  return `${days[day]} ${oldFormat.split("-")[0]} ${month} ${
    oldFormat.split("-")[2]
  }`;
}
