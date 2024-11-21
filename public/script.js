// script.js
document.addEventListener("DOMContentLoaded", () => {
    const animalForm = document.getElementById("animalForm");
    const animalList = document.getElementById("animalList");
    const searchInput = document.getElementById("searchInput");
  
    let animals = [];
  
    // Menambahkan Hewan ke Daftar
    animalForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const id = document.getElementById("id").value.trim();
      const nama = document.getElementById("nama").value.trim();
      const umur = document.getElementById("umur").value.trim();
      const jk = document.getElementById("jeniskelamin").value.trim();
  
      const newAnimal = { id: animals.length + 1, id, nama, umur, jk };
      animals.push(newAnimal);
  
      document.getElementById("animalForm").reset();
      renderAnimals();
    });
  
    // Menampilkan Daftar Hewan
    function renderAnimals(filteredAnimals = animals) {
      animalList.innerHTML = "";
  
      if (filteredAnimals.length === 0) {
        animalList.innerHTML = "<li>Tidak ada hewan yang ditemukan.</li>";
        return;
      }
  
      filteredAnimals.forEach((animal) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${animal.id}</strong> - ${animal.nama} <br>
          Umur: ${animal.umur} tahun, JenisKelamin: ${animal.jk}
        `;
        animalList.appendChild(li);
      });
    }
  
    // Pencarian Hewan
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();
      const filteredAnimals = animals.filter((animal) =>
        animal.name.toLowerCase().includes(searchValue)
      );
      renderAnimals(filteredAnimals);
    });
  
    renderAnimals();
  });
  