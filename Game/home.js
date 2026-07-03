const scrollBtn = document.querySelector(".scroll-down");
const header = document.querySelector(".header");
const nextSection = document.querySelector(".next-section");

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        header.classList.add("hidden");
        nextSection.classList.add("show");
    } else {
        header.classList.remove("hidden");
        nextSection.classList.remove("show");
    }
});

function createSlider(id, interval = 2000) {
    const container = document.getElementById(id);
    const images = container.querySelectorAll("img");
    let index = 0;

    images[0].classList.add("active");

    setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }, interval);
}

createSlider("char", 1500);
createSlider("boss", 2000);