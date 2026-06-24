document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Make the card focusable and accessible via keyboard
        card.setAttribute('tabindex', '0');

        const flipCard = () => {
            card.classList.toggle('flipped');
        };

        card.addEventListener('click', flipCard);
        card.addEventListener('keydown', (e) => {
            // Flip on Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent the default action (e.g., scrolling)
                flipCard();
            }
        });

        // Stop click events on links/buttons from bubbling up to the card
        card.querySelectorAll('.project-card-back a, .project-card-back button').forEach(elem => {
            elem.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    });
});