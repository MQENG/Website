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

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
}

loadEventData();