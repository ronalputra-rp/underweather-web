const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const dropdown = document.getElementById("dropdown-content");
const dropdownContent = document.getElementsByClassName("city-content");
const navigation = document.getElementById("navigation");
const header = document.getElementById("header");
const searchIcon = document.getElementById("search-icon");
const dropdownButton = document.getElementById("city-dropdown");
const dropdownContainer = document.getElementById("dropdown-container");

const listOfCity = ["Ambarawa","Salatiga","Ungaran","Jakarta","Semarang","Solo"];
for (let i = 0; i < listOfCity.length; i++) {
    const option = document.createElement("a");
    option.className = "city-content block hover:bg-blue-200 px-4 py-2 text-black";
    option.href = "#";
    dropdown.appendChild(option);
}

for (let i = 0; i < dropdownContent.length; i++) {
    dropdownContent[i].textContent = listOfCity[i];
}

form.addEventListener("submit",(e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    function capitalizeWords(city) {
        return city.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    const cityRegex = /^[a-zA-Z\s.'-]{2,}$/;
    if (!cityRegex.test(city)) {
        alert("Nama kota tidak valid. Hanya huruf, spasi, titik, hubung, apostrof, minimal 2 karakter.");
    }
    window.location.href = `app.html?city=${encodeURIComponent(capitalizeWords(city))}`;
});

// Menambahkan event listener ke setiap elemen city-content
for (let i = 0; i < dropdownContent.length; i++) {
    dropdownContent[i].addEventListener("click",(e) => {
        e.preventDefault();
        const city = e.target.textContent.trim();
        function capitalizeWords(city) {
            return city.toLowerCase().split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
        window.location.href = `app.html?city=${encodeURIComponent(capitalizeWords(city))}`;
    });
}

dropdownButton.addEventListener("click",(e) => {
    e.stopPropagation();
    dropdown.classList.toggle("opacity-100");
    dropdown.classList.toggle("translate-y-0");
    dropdown.classList.toggle("pointer-events-auto");

    dropdown.classList.toggle("opacity-0");
    dropdown.classList.toggle("-translate-y-2");
    dropdown.classList.toggle("pointer-events-none");
})

document.addEventListener("click", (e) => {
    if (!dropdownContainer.contains(e.target)) {
        dropdown.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
        dropdown.classList.add("opacity-0", "-translate-y-2", "pointer-events-none");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".pre-animate").forEach(el => {
        el.classList.remove("pre-animate")

    })
    navigation.classList.remove("invisible");
    header.classList.remove("invisible");
    searchIcon.classList.remove("invisible");
})