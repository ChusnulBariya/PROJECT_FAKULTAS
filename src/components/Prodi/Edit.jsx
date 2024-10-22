import React, {useState, useEffect} from "react"; // Menginpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Menginpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios";

export default function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [fakultas, setFakultas] = useState("");
    const [listFakultas, setListFakultas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('https://project-apiif-3-b.vercel.app/api/api/prodi${id}')
            .then((response) => {
                setNama(response.data.result.nama);
                setFakultas(response.data.result.fakultas.id);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError("Data tidak ditemukan");
            });

        axios
            .get('https://project-apiif-3-b.vercel.app/api/api/fakultas', {nama})
            .then((response) => {
                setListFakultas(response.data.result);
            })
            .catch((error) => {
                console.error("Error fetching fakultas data:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setNama(e.target.value);
    }

    const handleFakultasChange = (e) => {
        setFakultas(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .patch('https://project-apiif-3-b.vercel.app/api/api/prodi/${id}', {
                nama,
                fakultas_id: fakultas,  
            })
            .then((response) => {
                navigate("/prodi");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                setError("Gagal mengupdate data");
            });
    };

    return (
        <div>
            <h2>Edit Program Studi</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Program Studi</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nama"
                        value={nama} // Mengisi nilai input dengan state 'nama'
                        onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
                        required // Input wajib diisi
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fakultas" className="form-label">Nama Fakultas</label>
                    <select 
                        className="form-select" id="faultas" value={fakultas}
                        onChange={handleFakultasChange}
                        required
                    >
                        <option value="">Pilih Fakultas</option>
                        {listFakultas.map(
                            (data) => (
                                <option key={data.id} value={data.id}>
                                    {data.nama}
                                </option>
                            )
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}