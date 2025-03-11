function showModal(modal) {
  modal.classList.add('show');
}

function closeModal(modal) {
  modal.classList.remove('show');
}

document.querySelectorAll('.event-card').forEach(card => {

  card.addEventListener('click', function () {

    const eventID = this.getAttribute('data-id');
    const modal = document.querySelector(`.modal-box[data-id="${eventID}"]`);

    showModal(modal);

  });
});

document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const modal = this.closest('.modal-box');
    closeModal(modal);
  });
});