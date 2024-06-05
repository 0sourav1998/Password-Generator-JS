let dataPasswordDisplay = document.querySelector("[data-displaypassword]");
let dataCopy = document.querySelector("[data-copy]");
let copiedMsg = document.querySelector("[data-copiedMsg]");

let passLengDisplay = document.querySelector("[length-number]");
let passLengSlider = document.querySelector("[data-length-slider]");

let upperCase = document.querySelector("#uppercase");
let lowerCase = document.querySelector("#lowercase");
let number = document.querySelector("#number");
let symbolls = document.querySelector("#symbolls");

let dataIndicator = document.querySelector("[data-indicator]");

let generateBtn = document.querySelector(".generateBtn");

let allChecks = document.querySelectorAll("input[type=checkbox]");

let symbollStr = "~!@#$%^&*()_+{}|:;>,.><?/";

let password = "";
let passwordLength = 10;
let checkCount = 0;


//set passwordLength
//reflecting passwodLength to the UI

const handleSlider = () => {
  passLengSlider.value = passwordLength;
  passLengDisplay.innerText = passwordLength;
};
handleSlider();



const setIndicator = (color) => {
  dataIndicator.style.backgroundColor = color;
};

setIndicator("#ccc")


const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomNumber = () => {
  return getRandomInteger(0, 9);
};

const getRandomLowerStr = () => {
  const number = getRandomInteger(97, 123);
  return String.fromCharCode(number);
};

const getRandomUpperStr = () => {
  const number = getRandomInteger(65, 91);
  return String.fromCharCode(number);
};

const getRandomSymbolls = () => {
  let valueOfSym = getRandomInteger(0, symbollStr.length);
  return symbollStr.charAt(valueOfSym);
};

const calcStrength = () => {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (upperCase.checked) hasUpper = true;
  if (lowerCase.checked) hasLower = true;
  if (number.checked) hasNum = true;
  if (symbolls.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
};

const passShuffle = (arr) => {
  for (let i = arr.length - 1; i > 0 ; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  let str = "";
  arr.forEach((e) => {
    str += e;
    console.log(str)
  });
  return str ;
};

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(dataPasswordDisplay.value);
    copiedMsg.innerText = "copied";
  } catch (e) {
    copiedMsg.innerText = "failed";
  }
  copiedMsg.classList.add("active");
  setTimeout(() => {
    copiedMsg.classList.remove("active");
  }, 2000);
};

const handleCheckChange = () => {
  checkCount = 0;
  allChecks.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
  // console.log(checkCount)
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
};

allChecks.forEach((check) => {
  check.addEventListener("change", handleCheckChange);
});

passLengSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

dataCopy.addEventListener("click", () => {
  if (dataPasswordDisplay.value) {
    copyContent();
  }
});

generateBtn.addEventListener("click", () => {
  if (checkCount <= 0) return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  console.log("Starting the Journey");
  password = "";

  let funcArr = [];
  if (upperCase.checked) {
    funcArr.push(getRandomUpperStr);
  }
  console.log("done");
  if (lowerCase.checked) {
    funcArr.push(getRandomLowerStr);
  }
  if (number.checked) {
    funcArr.push(getRandomNumber);
  }
  if (symbolls.checked) {
    funcArr.push(getRandomSymbolls);
  }
  console.log("Compulsory Addition");
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  console.log("Optional Addition");
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRandomInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  password = passShuffle(Array.from(password));

  dataPasswordDisplay.value = password;
  calcStrength();
});
