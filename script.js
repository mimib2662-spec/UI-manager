console.log("JS is running");

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("cards-container");

    // Function to create a card
    function createCard(extension) {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-left">
          <img src="${extension.logo}" alt="${extension.name}" width="80" height="80">
          <div class="text">
            <h2>${extension.name}</h2>
            <p>${extension.description}</p>
          </div>
        </div>

        <div class="card-actions">
          <button class="Remove">Remove</button>

          <label class="switch">
            <input type="checkbox" class="card-toggle" ${extension.isActive ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      `;

      // Remove button
      card.querySelector(".Remove").addEventListener("click", () => {
        card.remove();
      });

      // Toggle event
      const toggle = card.querySelector(".card-toggle");
      toggle.addEventListener("change", function () {
        extension.isActive = this.checked;
        console.log(extension.name + " is now " + (this.checked ? "Active" : "Inactive"));
      });

      container.appendChild(card);
    }

    // Initially create all cards
    data.forEach(createCard);

    // Filter buttons
    const btnAll = document.getElementById("show-all");
    const btnActive = document.getElementById("show-active");
    const btnInactive = document.getElementById("show-inactive");

    const filterButtons = [btnAll, btnActive, btnInactive];

    // Function to reset button colors
    function resetButtonColors() {
      filterButtons.forEach(btn => btn.classList.remove("active"));
    }

    // Show all cards
    btnAll.addEventListener("click", () => {
      resetButtonColors();
      btnAll.classList.add("active");

      const cards = container.querySelectorAll(".card");
      cards.forEach(card => card.style.display = "flex");
    });

    // Show only active cards
    btnActive.addEventListener("click", () => {
      resetButtonColors();
      btnActive.classList.add("active");

      const cards = container.querySelectorAll(".card");
      cards.forEach(card => {
        const toggle = card.querySelector(".card-toggle");
        card.style.display = toggle.checked ? "flex" : "none";
      });
    });

    // Show only inactive cards
    btnInactive.addEventListener("click", () => {
      resetButtonColors();
      btnInactive.classList.add("active");

      const cards = container.querySelectorAll(".card");
      cards.forEach(card => {
        const toggle = card.querySelector(".card-toggle");
        card.style.display = !toggle.checked ? "flex" : "none";
      });
    });

    // Optional: Set All button active at the beginning
    btnAll.classList.add("active");
  })
  .catch(err => console.error("Error loading JSON:", err));