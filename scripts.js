// Credit card number validation
function validateCardNumber(cardNumber) {
    const cardNumberRegex = /^[0-9]{16}$/; // regex for 16 digit numbers
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
  
  // NOT WORKING TO GIVE CONFIRMATION MESSAGE
  const form = document.getElementById('paymentForm');
  form.addEventListener('submit', function(event) {
    const cardNumber = document.getElementById('txtcard').value;
    const cvv = document.getElementById('cvv').value;
    if (!validateCardNumber(cardNumber)) {
      event.preventDefault(); // prevent form submission if card number is invalid
      alert('Please enter a valid 16-digit card number.');
    } else if (cvv.length < 3 || cvv.length > 4) {
      event.preventDefault(); // prevent form submission if CVV is invalid
      alert('Please enter a valid 3-4 digit CVV.');
    } else {
      alert('Your appointment has been made!');
    }
  });
  //

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



function validate() {
  var cardNumber = document.getElementById("cardNumber").value;
  var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  var mastercardRegex = /^5[1-5][0-9]{14}$/;
  var amexRegex = /^3[47][0-9]{13}$/;
  var discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  var valid = false;

  if (visaRegex.test(cardNumber)) {
    valid = true;
  } else if (mastercardRegex.test(cardNumber)) {
    valid = true;
  } else if (amexRegex.test(cardNumber)) {
    valid = true;
  } else if (discoverRegex.test(cardNumber)) {
    valid = true;
  }

  if (valid) {
    document.getElementById("result").innerHTML = "Valid credit card number";
  } else {
    document.getElementById("result").innerHTML = "Invalid credit card number";
  }
}
