// NOT DONE

document.querySelectorAll('.grid-item').forEach( card => {
    card.addEventListener('click', function() {

        const cardId = this.getAttribute('data-id');
        const cardData = jsonData.find(item => item.id == cardId);
        
        if (cardData) {
            alert(35982759);
        }

    });
});