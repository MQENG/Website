function loadEventData() {
    fetch('assets/events/events.json')
        .then(response => {

            if (!response.ok) {
                throw new Error('Network error: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {

            const cards = document.querySelectorAll('.event-card');

            cards.forEach(card => {
                const eventID = card.dataset.id;
                const eventData = data[eventID];
                const fullDate = eventData["date"];

                let [month, dayWithComma] = fullDate.split(" ");
                let day = dayWithComma.replace(",", "");
              
                card.querySelector('.card-day').textContent = day;
                card.querySelector('.card-month').textContent = month;
              
                card.querySelector('.event-title').textContent = eventData["title"];
              });
              

            const modals = document.querySelectorAll('.modal-box');

            modals.forEach(modal => {

                const eventID = modal.dataset.id;

                modal.querySelector('.modal-title').textContent = data[eventID]["title"] + " | " + data[eventID]["date"];
                modal.querySelector('.modal-location').textContent = `Location: ${data[eventID]["location"]}`;
                modal.querySelector('.modal-desc').textContent = data[eventID]["description"];

                if (data[eventID]["img"]) {

                    const img = document.createElement('img');
                    img.src = 'assets/events/images/' + data[eventID]["img"];
                    img.classList.add('modal-img');

                    const content = modal.querySelector('.modal-content');
                    const txt = modal.querySelector('.modal-text');

                    content.insertBefore(img, txt);

                }
            });
        })
    .catch(error => {
        console.error('There was a problem with the fetch operation: ', error);
    });
}

loadEventData();