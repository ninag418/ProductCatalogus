const cars = [
  { carName: "Volkswagen", carModel: "Golf", carColor: "Zwart", price: "22.000", image: "Images/VWGolf2020Zwart.jpg" },
  { carName: "BMW", carModel: "3Serie", carColor: "Blauw", price: "28.000", image: "Images/BMW3Serie2019Blauw.jpg" },
  { carName: "Audi", carModel: "A4", carColor: "Wit", price: "30.000", image: "Images/AudiA4Wit2021.avif" },
  { carName: "Honda", carModel: "Civic", carColor: "Zwart", price: "21.000", image: "Images/HondaCivic2019Zwart.webp" },
  { carName: "Hyundai", carModel: "i30", carColor: "Blauw", price: "19.500", image: "Images/Hyundaii302022Blauw.jpg" },
  { carName: "Toyota", carModel: "Corolla", carColor: "Zilver", price: "20.000", image: "Images/ToyotaCorolla.jpg" },
  { carName: "Volkswagen", carModel: "Polo", carColor: "Blauw", price: "18.000", image: "Images/VWPolo2011Blauw.avif" },
  { carName: "Kia", carModel: "Picanto", carColor: "Rood", price: "11.000", image: "Images/KiaPicantoRood.avif" }
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortPrice");
const filterButtons = document.querySelectorAll(".filters button");
const productCount = document.getElementById("productCount");
const noResults = document.getElementById("noResults");


let currentCars = [...cars];
let activeColor = "Alle";

function renderCars(list) {
  grid.innerHTML = "";

  list.forEach(car => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${car.image}" alt="${car.carName}">
      <h3>${car.carName} ${car.carModel}</h3>
      <p>Kleur: ${car.carColor}</p>
      <p class="price">Prijs: €${car.price}</p>
    `;

    grid.appendChild(card);
  });

  updateProductCount(list.length);
}


function updateProductCount(count) {
  if (count === 0) {
    productCount.classList.add("hidden");
    noResults.classList.remove("hidden");
  } else {
    productCount.classList.remove("hidden");
    noResults.classList.add("hidden");

    productCount.textContent =
      count === 1
        ? "1 product gevonden"
        : `${count} producten gevonden`;
  }
}


filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    activeColor = button.dataset.color;
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

sortSelect.addEventListener("change", applyFilters);

function applyFilters() {
  let filtered = [...cars];

  if (activeColor !== "Alle") {
    filtered = filtered.filter(car => car.carColor === activeColor);
  }

  const searchValue = searchInput.value.toLowerCase();
  if (searchValue) {
    filtered = filtered.filter(car =>
      car.carName.toLowerCase().includes(searchValue) ||
      car.carModel.toLowerCase().includes(searchValue)
    );
  }

  if (sortSelect.value === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sortSelect.value === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  currentCars = filtered;
  renderCars(currentCars);
}

renderCars(cars);
