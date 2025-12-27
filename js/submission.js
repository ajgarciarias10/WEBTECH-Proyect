// PAPER SUBMISSION (Jose): mostrar/ocultar campo extra y mensaje de envío

const reasonSelect = document.getElementById('reason');
const otherWrapper = document.getElementById('other-topic-wrapper');
const contactForm = document.getElementById('contact-form');
const contactMsg = document.getElementById('contact-message');

if (reasonSelect && otherWrapper) {
  reasonSelect.addEventListener('change', function () {
    if (this.value === 'other') {
      // Si elige "Other questions", mostramos el campo extra
      otherWrapper.style.display = 'block';
    } else {
      // Si elige otra cosa, lo ocultamos
      otherWrapper.style.display = 'none';
    }
  });
}

if (contactForm && contactMsg && otherWrapper) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // evitamos recargar la página

    contactMsg.textContent = 'Your message has been sent. Thank you!';
    contactMsg.style.color = 'green';

    contactForm.reset();
    otherWrapper.style.display = 'none';
  });
}