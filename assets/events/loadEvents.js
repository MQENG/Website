function loadEventData() {
    fetch('assets/events/events.json') // Fetch our json data.
        .then(response => {

            if (!response.ok) {
                throw new Error('Network error: ' + response.statusText);
            }
            return response.json(); // parse response
        })
        .then(data => {

            // grab all out elements with class event-card 
            const cards = document.querySelectorAll('.event-card');

            // Iterate through each card
            cards.forEach(card => {

                // the eventID is the data-id field of the HTML, and is the key in the events.json
                const eventID = card.dataset.id;

                // Populate title, date, and location settings from JSON data
                card.querySelector('.event-title').textContent = data[eventID]["title"];
                card.querySelector('.event-date').textContent = `Date: ${data[eventID]["date"]}`;
                card.querySelector('.event-location').textContent = `Location: ${data[eventID]["location"]}`;

            });

            const modals = document.querySelectorAll('.modal-box');

            // Iterate through each modal
            modals.forEach(modal => {

                // the eventID is the data-id field of the HTML, and is the key in the events.json
                const eventID = modal.dataset.id;

                // Populate title, date, and location settings from JSON data
                modal.querySelector('.modal-title').textContent = data[eventID]["title"] + " | " + data[eventID]["date"];
                modal.querySelector('.modal-location').textContent = `Location: ${data[eventID]["location"]}`;
                modal.querySelector('.modal-desc').textContent = data[eventID]["description"];

                // Some events may not have images.
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