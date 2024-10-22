import React, {useState} from "react";
import axios from "axios";

export default function createFakultas() {
    // Inisialisasi state untuk menyimpan nama fakultas
    const [namaFakultas, setNamaFakultas] = useState("");4
    // Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    // Inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    // Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validasi input jika namaFakultas kosong, set pesan error
        if (namaFakultas.trim() === "") {
            setError("Nama Fakultas is required"); // set pesan error jika input field kosong
            return; // Stop eksekusi
        }

        try {
            const response = await axios.post (
                "http://127.0.0.1:8000/api/fakultas", {
                    nama: namaFakultas, // Data yang dikirim berupa objek JSON
                }
            );

            if (response.status === 201) {
                // Tampilkan pesan suskes jika fakultas berhasil dibuat
                setSuccess("Fakultas created sussesfully");
                setNamaFakultas("");
            } else {
                // Jika tidak berhasil, maka pesan error tampil
                setError("Failed to create Fakultas");
            }
            
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // Jika terjadi error (misal masalah jaringan dan database), tampilkan pesan error
            setError("An error occured while creating fakultas")
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Fakultas</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Form untuk mengisi nama Fakultas */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaFakultas" className="form-label">Nama Fakultas</label>

                    {/* Input untuk nama Fakutas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="namaFakultas"
                        value={namaFakultas} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNamaFakultas(e.target.value)} // Update state saat input berubah
                        placeholder="Masukkan Nama Fakultas" // Placeholder teks untuk input
                    />
                </div>

                {/* Type Button Submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}