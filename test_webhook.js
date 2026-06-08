const url = "https://script.google.com/macros/s/AKfycbyk3VT_AqU0ZL0YZGDBEnamiZtndlUlmalVpav5UV8o4pjHSic8VjhvrC_D14sHpQ/exec";
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify({ fullName: "Test", workEmail: "test@test.com", companyName: "Test Co" })
}).then(async r => {
  console.log("Status:", r.status);
  console.log("Text:", await r.text());
}).catch(e => console.error(e));
