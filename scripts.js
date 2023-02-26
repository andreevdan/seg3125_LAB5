// Credit card number validation
function validateCardNumber(cardNumber) {
    const cardNumberRegex = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/; // regex for 16 digit numbers
    return cardNumberRegex.test(cardNumber);
}
  
// CVV validation
const cvvInput = document.getElementById('cvv');
  
cvvInput.addEventListener('input', function(event) {
  const cvvRegex = /^\d{0,4}$/; // regex to match up to 4 digits
  const cvv = event.target.value;
  if (!cvvRegex.test(cvv)) {
    event.target.value = cvv.slice(0, 4); // limit input to 4 digits
  }
});

cvvInput.addEventListener('keydown', function(event) {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
  if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault(); // prevent non-numeric input
  }
});
  
const form = document.getElementById('payForm');
var appointmentFieldsFilled = false;
form.addEventListener('submit', function(event) {
  const cardNumber = document.getElementById('txtcard').value;
  const cvv = document.getElementById('cvv').value;
  const month = document.getElementById('expiry_month').value;
  const year = document.getElementById('expiry_year').value;
  if (!validateCardNumber(cardNumber)) {
    event.preventDefault(); // prevent form submission if card number is invalid
    alert('Please enter a valid 16-digit card number.');
  } else if (cvv.length < 3 || cvv.length > 4) {
    event.preventDefault(); // prevent form submission if CVV is invalid
    alert('Please enter a valid 3-4 digit CVV.');
  } else if (year == "Year" || month == "Month"){
    event.preventDefault(); // prevent form resubmission if expiration is invalid
    alert('Please enter valid month and Year!');
  } else if (appointmentFieldsFilled == true){
    alert('Your appointment has been made!');
  }
  else{
    event.preventDefault(); // prevent form resubmission
  }
});

document.getElementById("check").onclick = function() {
  let allAreFilled = true;
  document.getElementById("paymentForm").querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (i.type === "radio") {
      let radioValueCheck = false;
      document.getElementById("paymentForm").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
        if (r.checked) radioValueCheck = true;
      })
      allAreFilled = radioValueCheck;
      return;
    }
    if (!i.value) { allAreFilled = false;  return; }
  })
  if (!allAreFilled) {
    alert('Fill all the fields');
    appointmentFieldsFilled = false;
  }
  else if (allAreFilled){
    appointmentFieldsFilled = true;
  }
};

function formatCardNumber(event) {
  const key = event.key;
  const value = event.target.value.replace(/\s/g, ''); // remove existing spaces
  const cardRegex = /^[0-9\s]+$/; // regex for numbers and spaces

  // Allow only numeric keys and control keys
  if (!cardRegex.test(key) && !/^Backspace$|^Delete$|^ArrowLeft$|^ArrowRight$/.test(key)) {
    event.preventDefault();
    return false;
  }

  // Limit input to 16 digits
  if (value.length >= 16 && !/^Backspace$|^Delete$/.test(key)) {
    event.preventDefault();
    return false;
  }

  // Format card number by adding spaces after every four digits
  if (cardRegex.test(value)) {
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    event.target.value = formattedValue;
  }
}

function isNumberKey(evt){
  const charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
  }
  return true;
}

//Validate the name field
function validateName(nameID){
  const nameInput = document.getElementById(nameID);
  const regex = /^[a-zA-Z]+$/;
  const name = nameInput.value.trim();
  if(!name){
    nameInput.setCustomValidity('Please enter a valid name.');
  }else if(!regex.test(name)){
    nameInput.setCustomValidity('Please enter a valid name.');
  }else{
    nameInput.setCustomValidity('');
  }
}

//Validate the date field
function formatDate(dateID){
  const dateInput = document.getElementById(dateID);
  const selectedDate = new Date(dateInput.value);
  const schedules = {staff1: [0, 2], staff2: [1, 3], staff3: [2, 4], staff4: [3, 4], staff5: [0, 4],};
  const employeeDropdown = document.getElementById("employee");
  const employee = employeeDropdown.value;

  if (selectedDate.getDay() === 5 || selectedDate.getDay() === 6) { //Closed on Saturdays and Sundays
    dateInput.setCustomValidity('Sorry we are closed on this day. Please select another date');
  } else if (schedules[employee] && !schedules[employee].includes(selectedDate.getDay())) { // Tells user that employee is not avaiable on certain days
    dateInput.setCustomValidity('This employee is not working on this day. Please select another date');
  } else {
    dateInput.setCustomValidity('');
  }
}

function validateServices(serviceID){
  const serviceInput = document.getElementById(serviceID);
  const service = serviceInput.value

  if (service === "empty"){
    serviceInput.setCustomValidity("Please select a service.");
  } else {
    serviceInput.setCustomValidity("");
  }
}