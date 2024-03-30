const correctIconString = 'correct-icon fas fa-check-circle';
const wrongIconString = 'wrong-icon fas fa-times-circle';

function validateName() {
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const nameStatus = document.getElementById('nameStatus');
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!nameInput.value.trim()) {
      nameError.textContent = 'Name is required';
      nameInput.setAttribute('aria-invalid', 'true');
      nameStatus.className=wrongIconString;
      return false;
  } else if (!nameRegex.test(nameInput.value)) {
      nameError.textContent = 'Name must contain only letters (No Numbers or Special Characters)';
      nameInput.setAttribute('aria-invalid', 'true');
      nameStatus.className=wrongIconString;
      return false;
  } else {
      nameError.textContent = '';
      nameInput.setAttribute('aria-invalid','false');
      nameStatus.className=correctIconString;
      return true;
  }
}

function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const emailStatus = document.getElementById('emailStatus');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailInput.value.trim()) {
      emailError.textContent = 'Email is required';
      emailInput.setAttribute('aria-invalid','true');
      emailStatus.className=wrongIconString;  
      return false;
  } else if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = 'Invalid email format eg: example@email.com';
      emailInput.setAttribute('aria-invalid','true');
      emailStatus.className=wrongIconString;
      return false;
  } else {
      emailError.textContent = '';
      emailInput.setAttribute('aria-invalid','false');
      emailStatus.className=correctIconString;
      return true;
  }
}

function validateAddress() {
  const addressInput = document.getElementById('address');
  const addressError = document.getElementById('addressError');
  const addressStatus = document.getElementById('addressStatus');
  const  minimumLength = 5;
  if (!addressInput.value.trim()) {
      addressError.textContent = 'Address is required';
      addressInput.setAttribute('aria-invalid','true');
      addressStatus.className=wrongIconString;
      return false;
  } else if (addressInput.value.length < minimumLength) {
      addressError.textContent = `Address must be at least ${minimumLength} characters long`;
      addressStatus.className=wrongIconString;
      return false;
  }
  else {
      addressError.textContent = '';
      addressInput.setAttribute('aria-invalid','false');
      addressStatus.className=correctIconString;
      return true;
  }
}

function validateResume() {
    const resumeInput = document.getElementById('resume');
    const resumeError = document.getElementById('resumeError');
    const allowedExtensions = ['pdf', 'docx'];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    if (!resumeInput.value) {
      resumeError.textContent = 'Resume file is required';
      resumeInput.setAttribute('aria-invalid', 'true');
      toggleSubmitButton();
      return false;
    } else {
      const fileExtension = resumeInput.value.split('.').pop().toLowerCase();
      const fileSize = resumeInput.files[0].size;
  
      if (!allowedExtensions.includes(fileExtension)) {
        resumeError.textContent = 'Invalid file format (only .pdf and .docx allowed)';
        resumeInput.setAttribute('aria-invalid', 'true');
        toggleSubmitButton();
        return false;
      } else if (fileSize > maxSize) {
        resumeError.textContent = 'File size exceeds 5 MB limit';
        resumeInput.setAttribute('aria-invalid', 'true');
        toggleSubmitButton();
        return false;
      } else {
        resumeError.textContent = '';
        resumeInput.setAttribute('aria-invalid', 'false');
        toggleSubmitButton();
        return true;
      }
    }
  }

function handleFileSelection(input) {
    const fileName = input.files[0] ? input.files[0].name : 'Choose file';
    const resumeLabel = document.getElementById('resumeLabel');
    resumeLabel.textContent = fileName;
  }
  
function validatePhone() {
  const phoneInput = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');
  const phoneStatus =document.getElementById('phoneStatus');
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  if (!phoneInput.value.trim()) {
      phoneError.textContent = 'Phone number is required';
      phoneInput.setAttribute('aria-invalid','true');
      phoneStatus.className=wrongIconString;
      return false;
  } else if (!phoneRegex.test(phoneInput.value)) {
      phoneError.textContent = 'Invalid phone number format (e.g., XXX-XXX-XXXX)';
      phoneInput.setAttribute('aria-invalid','true');
      phoneStatus.className=wrongIconString;
      return false;
  } else {
      phoneError.textContent = '';
      phoneInput.setAttribute('aria-invalid','false');
      phoneStatus.className=correctIconString;
      return true;
  }
}

function formatPhone() {
  const phoneInput = document.getElementById('phone');
  let formattedPhone = phoneInput.value.replace(/\D/g, '').substring(0, 10);
  if (formattedPhone.length > 6) {
      formattedPhone = formattedPhone.substring(0, 6) + '-' + formattedPhone.substring(6);
  }
  if (formattedPhone.length > 3) {
      formattedPhone = formattedPhone.substring(0, 3) + '-' + formattedPhone.substring(3);
  }
  phoneInput.value = formattedPhone;
  validatePhone();
}

function validateForm() {
  const isValidName = validateName();
  const isValidEmail = validateEmail();
  const isValidPhone = validatePhone();
  const isValidAddress = validateAddress();
  const isValidResume = validateResume();

  return isValidName && isValidEmail && isValidPhone && isValidAddress && isValidResume;
}

// Function to toggle submit button state
function toggleSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const addressInput = document.getElementById('address');
  const resumeInput = document.getElementById('resume');

  // Check if all fields have been filled
  const allFieldsFilled = nameInput.value.trim() !== '' && 
                          emailInput.value.trim() !== '' && 
                          phoneInput.value.trim() !== '' && 
                          addressInput.value.trim() !== '' && 
                          resumeInput.value !== '';

  // If all fields are filled, then check for errors
  if (allFieldsFilled) {
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const phoneError = document.getElementById('phoneError');
      const addressError = document.getElementById('addressError');
      const resumeError = document.getElementById('resumeError');

      
      const hasErrors = nameError.textContent || emailError.textContent || phoneError.textContent || addressError.textContent || resumeError.textContent;

      // Enable or disable the submit button based on the presence of errors
      submitBtn.disabled = hasErrors;
  } else {
      
      submitBtn.disabled = true;
  }
}


function handleSubmit() {
  const isValid = validateForm();
  if (isValid) {
      window.location.href = 'success.html'; 
  } else {
      // Form is not valid, do nothing (validation error messages will be displayed)
  }
}

function handleFileUpload() {
    const fileInput = document.getElementById('resume');
    const fileName = fileInput.value.split('\\').pop(); // Get the file name
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'docx'];
  
    const cancelFileBtn = document.getElementById('cancelFileBtn');
  
    if (allowedExtensions.includes(fileExtension)) {
      document.querySelector('.custom-file-label').textContent = fileName;
      cancelFileBtn.classList.remove('d-none'); // Show cancel button
      validateResume(); // Validate the file
    } else {
      document.querySelector('.custom-file-label').textContent = 'Choose file';
      cancelFileBtn.classList.add('d-none'); // Hide cancel button
      const resumeError = document.getElementById('resumeError');
      resumeError.textContent = 'Invalid file format. Only .pdf and .docx files are allowed.';
      resumeInput.setAttribute('aria-invalid', 'true');
      toggleSubmitButton(); // Update submit button state
    }
  }
  
  function cancelFileUpload(event) {
    event.preventDefault();
    const fileInput = document.getElementById('resume');
    fileInput.value = ''; // Clear the file input
    document.querySelector('.custom-file-label').textContent = 'Choose file';
    document.getElementById('cancelFileBtn').classList.add('d-none'); // Hide cancel button
    validateResume(); // Validate the file
  }
  

