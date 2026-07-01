'use client'

import { showToast } from "@/components/toast/toast"
import { api } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface IGenre {
    id: number
    nama: string
    deskripsi: string
    created_at: string
    updated_at: string
}

export default function GenrePage () {
    
    const [data, setData] = useState<IGenre[]>([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await api.get('genre/getAll')
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteData = async (id: number) => {
        const isAgree = confirm('Are your sure?')

        if (isAgree) {
            try {
                const res = await api.delete(`genre/delete/${id}`)
                showToast(res.data.message, 'success')
                getData()
            } catch (error: any) {
                showToast(error.response.data.message, 'danger')
            }
        }
    }

    return (
        <>
            <h4 className="text-black">Data Genre</h4>
            <Link href={'/admin/genre/create'}>
                <button type="button" className="btn btn-primary">Tambah Genre</button>
            </Link>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <td>Nama Genre</td>
                        <td>Deskripsi</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {data.map(d => {
                        return (
                            <tr key={d.id}>
                                <td>{d.nama}</td>
                                <td>{d.deskripsi}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => deleteData(d.id)} type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}