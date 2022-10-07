let page = 1;

// create
function addStudent() {
  let surname = prompt("Enter student's surname");
  let name = prompt("Enter student's name");
  let number = +prompt("Enter student's telephone number");
  let weekKpi = prompt("Enter student's week KPI");
  let monthKpi = prompt("Enter student's month KPI");

  let student = {
    surname: surname,
    name: name,
    number: number,
    weekKpi: weekKpi,
    monthKpi: monthKpi,
  };

  fetch("http://localhost:8000/students", {
    method: "POST",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  alert("You've successfully added a student");
}
// addStudent();

// read
async function readStudents() {
  let res = await fetch(
    `http://localhost:8000/students/?_limit=3&_page=${page}`
  );
  let data = await res.json();
  let list = document.querySelector("ul");
  console.log(list);
  list.innerHTML = "";
  data.forEach(item => {
    list.innerHTML += `
  <li>
  <p>ID: ${item.id}<p>
  <p>Surname: ${item.surname}<p>
  <p>Name: ${item.name}<p>
  <p>Telephone number: ${item.number}<p>
  <p>Week KPI: ${item.weekKpi}<p>
  <p>Month KPI: ${item.monthKpi}<p>
  </li>
  `;
  });
}

// update
function updateStudent() {
  let studentId = +prompt("Enter student's id");
  let newWeekKpi = prompt("Enter new week's KPI");
  fetch(`http://localhost:8000/students/${studentId}`, {
    method: "PATCH",
    body: JSON.stringify({ weekKpi: newWeekKpi }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  alert("Are you sure to change?");
  readStudents();
}

// delete
async function deleteStudent() {
  let studentId = +prompt("Enter the student's ID");
  await fetch(`http://localhost:8000/students/${studentId}`, {
    method: "DELETE",
  });
  alert("Are you sure to delete the student?");
  readStudents();
}

let nextPage = document.querySelector("#next-page");
let prevPage = document.querySelector("#prev-page");

function checkPagination() {
  if (page === 1) {
    prevPage.style.display = "none";
    nextPage.style.display = "block";
  } else if (page === 3) {
    prevPage.style.display = "block";
    nextPage.style.display = "block";
  } else {
    prevPage.style.display = "block";
    nextPage.style.display = "block";
  }
}
checkPagination();

nextPage.addEventListener("click", () => {
  page++;
  readStudents();
  checkPagination();
});

prevPage.addEventListener("click", () => {
  page--;
  readStudents();
});
