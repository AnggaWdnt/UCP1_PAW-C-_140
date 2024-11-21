const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Ganti dengan username MySQL Anda
  password: "", // Ganti dengan password MySQL Anda
  database: "zoodb", // Ganti dengan nama database Anda
});

db.connect((err) => {
  if (err) {
      console.error("Koneksi ke database gagal:", err);
  } else {
      console.log("Koneksi ke database berhasil!");
  }
});


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Rute untuk halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API untuk mendapatkan daftar hewan
app.get("/daftarhewan", (req, res) => {
  db.query("SELECT * FROM daftarhewan", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil data" });
    } else {
      res.json(results); // Menampilkan data hewan dari tabel daftarhewan
    }
  });
});

// Menambahkan hewan baru
app.post("/add-animal", (req, res) => {
  const { nama, umur, jk } = req.body;
  console.log("Data yang diterima:", { nama, umur, jk });  // Debugging log

  if (!nama || !umur || !jk) {
    return res.status(400).json({ error: "Semua data harus diisi" });
  }

  const query = "INSERT INTO daftarhewan (nama, umur, jk) VALUES (?, ?, ?)";
  db.query(query, [nama, umur, jk], (err, results) => {
    if (err) {
      console.error("Error saat menambahkan data:", err);
      return res.status(500).json({ error: "Gagal menambahkan data" });
    }
    res.json({ message: "Hewan berhasil ditambahkan", data: results });
  });
});


// Memperbarui data hewan
app.put("/update-animal/:id", (req, res) => {
  const { id } = req.params;
  const { nama, umur, jk } = req.body;

  const query = "UPDATE daftarhewan SET nama = ?, umur = ?, jk = ? WHERE id = ?";
  db.query(query, [nama, umur, jk, id], (err, results) => {
    if (err) {
      console.error("Error saat memperbarui data:", err);
      return res.status(500).json({ error: "Gagal memperbarui data" });
    }
    res.json({ message: "Hewan berhasil diperbarui", data: results });
  });
});

// Menghapus data hewan
app.delete("/delete-animal/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM daftarhewan WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error saat menghapus data:", err);
      return res.status(500).json({ error: "Gagal menghapus data" });
    }
    res.json({ message: "Hewan berhasil dihapus", data: results });
  });
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
