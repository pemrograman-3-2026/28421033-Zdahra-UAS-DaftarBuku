'use client'
import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { IBuku } from "../admin/buku/page"


export default function UserDashboardPage () {

    const  [bukus, setBuku] = useState<IBuku[]>([])

    const getMovie = async () => {
        try {
            const res = await api.get('buku/getAll')
            setBuku(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div>
            <div className="row">
                {bukus.map(buku => (
                    <div key={buku.id} className="col-md-4 col-sm-6 col-xs-12">
                        <div className="card">
                            <Image
                            unoptimized
                            alt =""
                            src={`${baseURL}/image/${buku.image}`}
                            width={300}
                            height={300}
                            />
                            <div className="card-body">
                                <h5 className = "card-title">{buku.judul}</h5>
                                <p className="card-text">{buku.genre.nama} | {buku.penerbit}</p>
                                <p className="card-text">{buku.sinopsis}</p>
                                <div className="d-flex gap-1">
                                </div>
                            </div>
                        </div>
                    </div>
                ))} 
            </div>
        </div>
    )
}