const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const dropdown = document.getElementById("dropdown-content");
const dropdownContent = document.getElementsByClassName("city-content");


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
    if (!city) {
        return;
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
// console.log(form);
// console.log(cityInput);