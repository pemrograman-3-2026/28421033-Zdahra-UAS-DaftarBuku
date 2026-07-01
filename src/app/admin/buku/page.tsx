'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IGenre } from "../genre/page";
import { showToast } from "@/components/toast/toast";


export interface IBuku{
    id: number
    judul: string
    namapenulis: string
    sinopsis: string
    penerbit: string
    id_genre: string
    rating: number
    image: string
    created_at: string
    updated_at: string
    genre: IGenre
}

export default function AdminBukuPage() {

    const [bukus, setBuku] = useState<IBuku[]>([])

    const getData = async () => {
        try {
            const res = await api.get('buku/getAll')
            setBuku(res.data as IBuku[])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, []) 

    const deleteData = async (id: number) => {
            const isAgree = confirm('Are your sure?')
    
            if (isAgree) {
                try {
                    const res = await api.delete(`buku/delete/${id}`)
                    showToast(res.data.message, 'success')
                    getData()
                } catch (error: any) {
                    showToast(error.response.data.message, 'danger')
                }
            }
        }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4 className="text-black">Data Buku</h4>
                <Link href={'/admin/buku/create'}>
                    <button type="button" className="btn btn-primary">
                        Tambah Buku
                    </button>
                </Link>
            </div>
            
            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>Judul</td>
                        <td>Nama Penulis</td>
                        <td>Sinopsis</td>
                        <td>Penerbit</td>
                        <td>Genre</td>
                        <td>Rating</td>
                        <td>Image</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {bukus.map(buku => {
                        return (
                            <tr key = {buku.id}>
                                <td>{buku.judul}</td>
                                <td>{buku.namapenulis}</td>
                                <td>{buku.sinopsis}</td>
                                <td>{buku.penerbit}</td>
                                <td>{buku.genre.nama}</td>
                                <td>{buku.rating}</td>
                                <td>
                                    <Image width = {100} height={90} src= {`${baseURL}/image/${buku.image}`} alt = "" unoptimized/>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => deleteData(buku.id)} type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}