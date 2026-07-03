const cards = document.querySelectorAll(".about-card");

cards.forEach(card => {
    let clicks = 0;
    const maxClicks = 1;

    card.addEventListener("click", () => {
        if (card.classList.contains("unlocked")) return;

        clicks++;

        card.style.transform = "scale(0.95)";
        setTimeout(() => {
            card.style.transform = "scale(1)";
        }, 100);

        if (clicks >= maxClicks) {
            card.classList.add("unlocking");

            setTimeout(() => {
                card.classList.remove("unlocking");
                card.classList.add("unlocked");
            }, 600);
        }
    });
});