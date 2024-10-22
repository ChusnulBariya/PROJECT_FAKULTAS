import React, {useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom";
import Swal from"sweetalert2";

export default function List(){
    const[fakultas, setFakultas] = useState([])

    useEffect(() => {
        axios
        .get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
        .then((response) => {
            console.log(response.data.result)
            setFakultas(response.data.result)
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    }, []);

    //fungsi untuk menghapus fakultas berdasarkan ID dengan konfirmasi SweetAlert2
        const handleDelete = (id, nama) => {
            Swal.fire({
               title : "Are you sure?",
               text : `You wan't be able to revert this! Fakultas: ${nama}`, 
               icon : "warning",
               showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
               confirmButtonText: "yes, delete it!",
            }).then((result) => {
                if(result.isConfirmed){
                    //lakukan pengahapusan jika dikonfirmasi 
                    axios
                    .delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
                    .then(() => {
                        //hapus fakultas dari state setelah suskes dihapus dari server
                        setFakultas(fakultas.filter((f) => f.id !== id));
                        //tampilkan notifikasi sukses
                        Swal.fire("Delete!", "Your data has been deleted.", "success")
                    })
                    .catch((error) => {
                        console.error("Error deleting data:", error); //mengenai error 
                        Swal.fire(
                            "Error",
                            "there was an issue deleeting the data.", 
                            "error"
                        );
                    });
                }
            });
    }
    return(
        <>
        <h2>List Fakultas</h2>
        
       {/*Tombol Tambah Fakultas */}
      <NavLink to="/fakultas/create" className="btn btn-primary my-4">
        Create
      </NavLink>
        <ul className="list-group">
            {fakultas.map((f) =>(
                <li
                    key={f.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{f.nama}</span>{/*menampilkan nama fakultas */}
                        <div className="btn-group" aria-label="Action buttons">
                        <NavLink to={`/fakultas/edit/${f.id}`} className="btn btn-warning">
                        Edit
                        </NavLink>
                        <button
                        onClick={() => handleDelete(f.id, f.nama)}
                        className="btn btn-danger">
                            Delete
                        </button>
                        </div>
                </li>
            ))}
        </ul>
        </>
    )

    
   
    














}