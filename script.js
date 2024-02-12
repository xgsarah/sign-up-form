// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  return !!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const displaySuccess = (input, helperText) => {
  input.classList.remove('input-error');
  input.setAttribute('class', 'input-success');
  helperText.style = 'display:none !important';
};

const displayError = (input, helperText, message) => {
  input.classList.remove('input-success');
  input?.setAttribute('class', 'input-error');
  helperText.style = 'display:block !important';
  if (message) {
    helperText.textContent = message;
  }
};

const handleSubmitButton = () => {
  const labels = document.getElementsByTagName('label');
  const submitButton = document.querySelector('.submit-btn');

  const readySubmit = Array.from(labels).every((label) => {
    const input = label.getElementsByTagName('input')[0];
    const isError = input.classList.contains('input-error');
    const isSuccess = input.classList.contains('input-success');

    return isSuccess && !isError;
  });

  if (readySubmit) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', true);
  }
};

const inputSuccess = () => {
  const labels = document.getElementsByTagName('label');

  for (const label of labels) {
    const input = label.getElementsByTagName('input')[0];
    const helperText = label.querySelector('.helper-text');
    const type = input.getAttribute('type');
    const name = input.getAttribute('name');

    input.addEventListener('input', (e) => {
      const { value } = e.target;

      if (value) {
        if (type === 'email') {
          const isValidEmail = validateEmail(value);
          if (!isValidEmail) {
            displayError(input, helperText, 'Please enter a valid email');
          } else {
            displaySuccess(input, helperText);
          }
        } else if (type !== 'email') {
          displaySuccess(input, helperText);
        }
        if (name === 'password') {
          const pw2 = document.querySelector('#confirm-password');
          const pw2input = pw2.getElementsByTagName('input')[0];
          const pw2helper = pw2.querySelector('.helper-text');

          const passwordsMatch = pw2input.value === value;
          if (passwordsMatch) {
            displaySuccess(pw2input, pw2helper);
          } else {
            displayError(pw2input, pw2helper);
          }
        }

        if (name === 'confirm-password') {
          const pw2 = document.querySelector('#password');
          const pw2input = pw2.getElementsByTagName('input')[0];

          const passwordsMatch = pw2input.value === value;

          if (passwordsMatch) {
            displaySuccess(input, helperText);
          } else {
            displayError(input, helperText);
          }
        }
      } else if (!value && input.hasAttribute('required')) {
        displayError(input, helperText);
      } else {
        input.removeAttribute('class');
      }

      handleSubmitButton();
    });
  }
};

const handleSubmit = () => {
  const submitButton = document.querySelector('.submit-btn');
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector('.form');

    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    h2.textContent = 'Thank you for submitting your information!';
    p.textContent = 'We will send you an email with your sign-in credentials.';

    div.appendChild(h2);
    div.appendChild(p);
    div.className = 'success-message';

    form.innerHTML = '';
    form.innerHTML += div.outerHTML;
  });
};

inputSuccess();
handleSubmit();
