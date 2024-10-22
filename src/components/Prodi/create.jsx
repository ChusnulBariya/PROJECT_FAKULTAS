import React, {useState} from "react";
import axios from "axios";

export default function createProdi() {
    // Inisialisasi state untuk menyimpan nama prodi
    const [namaProdi, setNamaProdi] = useState("");4
    // Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    // Inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    // Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validasi input jika namaProdi kosong, set pesan error
        if (namaProdi.trim() === "") {
            setError("Nama Prodi is required"); // set pesan error jika input field kosong
            return; // Stop eksekusi
        }

        try {
            const response = await axios.post (
                "http://127.0.0.1:8000/api/fakultas", {
                    nama: namaProdi, // Data yang dikirim berupa objek JSON
                }
            );

            if (response.status === 201) {
                // Tampilkan pesan suskes jika Prodi berhasil dibuat
                setSuccess("Prodi created sussesfully");
                setNamaProdi("");
            } else {
                // Jika tidak berhasil, maka pesan error tampil
                setError("Failed to create Prodi");
            }
            
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // Jika terjadi error (misal masalah jaringan dan database), tampilkan pesan error
            setError("An error occured while creating prodi")
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Prodi</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Form untuk mengisi nama Prodi */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProdi" className="form-label">Nama Prodi</label>

                    {/* Input untuk nama Prodi dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="namaProdi"
                        value={namaProdi} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNamaProdi(e.target.value)} // Update state saat input berubah
                        placeholder="Masukkan Nama Prodi" // Placeholder teks untuk input
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fakultasId" className="from-label">
                        Fakultas
                    </label>
                    {/*input untuk nama fakultas dengan class bootstrap */}
                    <select name="from-select" id="fakultasId"
                    value={fakultasId}
                    onChange={(e) => setFakultasId(e.target.value)}
                >
                    <option value="">Select Fakultas</option>

                    {fakultasList.map((fakultas) => (
                        <option key={fakultas.id} value={fakultas.id}>
                                {fakultas.nama}
                        </option>

                    ))}
                    </select>

                </div>
                {/* Type Button Submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}