'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IGenre } from "@/app/admin/genre/page";



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

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4 className="text-black">Daftar Buku</h4>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}