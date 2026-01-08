// PAPER SUBMISSION (Jose): mostrar/ocultar campo extra, validar campos y mensaje de envío

const reasonSelect = document.getElementById('reason');
const otherWrapper = document.getElementById('other-topic-wrapper');
const contactForm = document.getElementById('contact-form');
const contactMsg = document.getElementById('contact-message');


const nameInput = document.getElementById('name');
const genderInput = document.getElementById('gender');
const idcardInput = document.getElementById('idcard');
const addressInput = document.getElementById('address');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const questionInput = document.getElementById('question');
const otherTopicInput = document.getElementById('other-topic');

function showMessage(text, color) {
  if (!contactMsg) return;
  contactMsg.textContent = text;
  contactMsg.style.color = color;
}

if (reasonSelect && otherWrapper) {
  reasonSelect.addEventListener('change', function () {
    if (this.value === 'other') {
      // Si elige "Other questions", mostramos el campo extra
      otherWrapper.style.display = 'block';
    } else {
      // Si elige otra cosa, lo ocultamos y limpiamos el campo extra
      otherWrapper.style.display = 'none';
      if (otherTopicInput) otherTopicInput.value = '';
    }
  });
}

if (contactForm && contactMsg && otherWrapper) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // evitamos recargar la página

    showMessage('', 'red');

    const name = nameInput ? nameInput.value.trim() : '';
    const gender = genderInput ? genderInput.value.trim() : '';
    const idcard = idcardInput ? idcardInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const question = questionInput ? questionInput.value.trim() : '';
    const reason = reasonSelect ? reasonSelect.value : '';
    const otherTopic = otherTopicInput ? otherTopicInput.value.trim() : '';

    if (!name || !gender || !idcard || !address || !email || !phone || !question) {
      showMessage('Please fill in all required fields.', 'red');
      return;
    }

    if (!email.includes('@')) {
      showMessage('Please enter a valid email address.', 'red');
      return;
    }

    const phoneOk = /^[0-9+\-\s]+$/.test(phone);
    if (!phoneOk) {
      showMessage('Please enter a valid phone number.', 'red');
      return;
    }

    if (reason === 'other' && !otherTopic) {
      showMessage('Please specify your topic in the "Other questions" field.', 'red');
      return;
    }

    showMessage('Your message has been sent. Thank you!', 'green');

    contactForm.reset();
    otherWrapper.style.display = 'none';
  });
}
