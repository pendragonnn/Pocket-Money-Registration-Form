class Pendaftar {
  constructor(name, age, money) {
    this.name = name;
    this.age = age;
    this.money = money;
  }

  get getName() {
    return this.name;
  }

  get getAge() {
    return this.age;
  }

  get getMoney() {
    return this.money;
  }
}

let dataRegistrant = [];
const nameForm = document.querySelector("#name");
const ageForm = document.querySelector("#age");
const moneyForm = document.querySelector("#money");
const tableBody = document.querySelector("#table-body");
const ageFalse = document.querySelector("#ageFalse");
const ageCheck = document.querySelector("#ageCheck");
const ageSuccess = document.querySelector("#ageSuccess");
const nameFalse = document.querySelector("#nameFalse");
const nameCheck = document.querySelector("#nameCheck");
const nameSuccess = document.querySelector("#nameSuccess");
const moneyFalse = document.querySelector("#moneyFalse");
const moneyCheck = document.querySelector("#moneyCheck");
const moneySuccess = document.querySelector("#moneySuccess");
const dataSuccess = document.querySelector("#dataSuccess");
const dataFail = document.querySelector("#dataFail");
const buttonConclusion = document.querySelector("#button-conclusion");
const formInputData = document.querySelector("#form-input-data");
const tableData = document.querySelector("#table-data");
const conclusion = document.querySelector("#conclusion");
const formButton = document.querySelector("#btn-form");
const tableButton = document.querySelector("#btn-table");

async function nameValidation (name) {
  return new Promise((resolve, reject) => {
    nameCheck.classList.remove("visually-hidden");
    setTimeout(() => {
      if (name.length >= 10) {
        nameCheck.classList.add("visually-hidden");
        nameSuccess.classList.remove("visually-hidden");
        resolve(true);
      } else {
        reject(false);
      }
    }, 1000);
  })
  .catch(() => {
    nameCheck.classList.add("visually-hidden");
    nameFalse.classList.remove("visually-hidden");
  });
}

async function ageValidation (age) {
  return new Promise((resolve, reject) => {
    ageCheck.classList.remove("visually-hidden");
    setTimeout(() => {
      if (age >= 25) {
        ageCheck.classList.add("visually-hidden");
        ageSuccess.classList.remove("visually-hidden");
        resolve(true);
      } else {
        reject(false);
      }
    }, 1000);
  })
  .catch(() => {
    ageCheck.classList.add("visually-hidden");
    ageFalse.classList.remove("visually-hidden");
  });
}

async function moneyValidator(money) {
  return new Promise((resolve, reject) => {
    moneyCheck.classList.remove("visually-hidden");
    setTimeout(() => {
      if (money >= 100000 && money <= 1000000) {
        moneyCheck.classList.add("visually-hidden");
        moneySuccess.classList.remove("visually-hidden");
        resolve(true);
      } else {
        reject(false);
      }
    }, 1000);
  })
  .catch(() => {
    moneyCheck.classList.add("visually-hidden");
    moneyFalse.classList.remove("visually-hidden");
  });
}

async function validasiInput (name, age, money) {
  const validatedName = await nameValidation(name)
  const validatedAge = await ageValidation(age);
  const validatedMoney = await moneyValidator(money);

  if (validatedName && validatedMoney && validatedAge) {
    return true;
  } else {
    dataFail.classList.remove("visually-hidden");
  }
};

function formDescClear () {
  nameFalse.classList.add("visually-hidden");
  moneyFalse.classList.add("visually-hidden");
  ageFalse.classList.add("visually-hidden");
  nameSuccess.classList.add("visually-hidden");
  moneySuccess.classList.add("visually-hidden");
  ageSuccess.classList.add("visually-hidden");
  dataSuccess.classList.add("visually-hidden");
  dataFail.classList.add("visually-hidden");
};

async function submitData () {
  formDescClear();

  const name = document.querySelector("#name").value;
  const age = document.querySelector("#age").value;
  const money = document.querySelector("#money").value;

  if (name !== "" && age !== "" && money !== "") {
    const result = await validasiInput(name, age, money);

    if (result === true) {
      dataSuccess.classList.remove("visually-hidden");
      dataRegistrant.push(new Pendaftar(name, age, money));

      let td = [];
      let index = 1;
      const tr = document.createElement("tr");
      tableBody.appendChild(tr);

      // algoritma
      // bikin tr baru
      // bikin 3 td yang isinya data dari objek

      for (let i = 0; i < dataRegistrant.length; i++) {
        const tdIndex = document.createElement("td");
        tdIndex.innerText = index;
        const tdName = document.createElement("td");
        tdName.innerText = dataRegistrant[i].getName;
        const tdAge = document.createElement("td");
        tdAge.innerText = dataRegistrant[i].getAge;
        const tdMoney = document.createElement("td");
        tdMoney.innerText = dataRegistrant[i].getMoney;

        td = [tdIndex, tdName, tdAge, tdMoney];
        index++;
      }

      for (let data of td) {
        tr.appendChild(data);
      }
    }
  } else {
    alert("There is still data that has not been entered, please check again");
  }
};

function resetForm () {
  formDescClear();
  if (nameForm.value != "" || ageForm != "" || moneyForm != "") {
    nameForm.value = "";
    ageForm.value = "";
    moneyForm.value = "";
  }
};

function average (arr, desc) {
  let sum = 0;

  if(desc === 'age') {
    for (let i of arr) {
      sum += Number(i.getAge);
    }
  
    return (sum / arr.length).toFixed();
  }

  if(desc === 'money') {
    let sum = 0;

    for (let i of arr) {
      sum += Number(i.getMoney);
    }
  
    return (sum / arr.length).toFixed();
  }
};

buttonConclusion.addEventListener("click", () => {
  if (
    average(dataRegistrant, 'age') !== "NaN" &&
    average(dataRegistrant, 'money') !== "NaN"
  ) {
    const text = `The average registrant has an amount of money equal to Rp${average(
      dataRegistrant, 'money'
    )} with average age ${average(dataRegistrant, 'age')}.`;
    conclusion.innerText = text;
    conclusion.classList.add("conclusion-text");
    conclusion.classList.remove("visually-hidden");

    tableData.appendChild(conclusion);
  } else {
    alert("The table is still empty, please fill out the form first");
  }
});

const showTable = () => {
  formButton.classList.add("btn-non-active");
  tableButton.classList.remove("btn-non-active");
  tableButton.classList.add("btn-active");
  formInputData.classList.add("visually-hidden");
  tableData.classList.remove("visually-hidden");
  conclusion.classList.add("visually-hidden");
};

const showForm = () => {
  formButton.classList.remove("btn-non-active");
  tableButton.classList.add("btn-non-active");
  tableButton.classList.remove("btn-active");
  formDescClear();
  resetForm();
  formInputData.classList.remove("visually-hidden");
  tableData.classList.add("visually-hidden");
};
