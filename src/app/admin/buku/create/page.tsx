'use client'
import { api } from "@/lib/axios"
import React, { useEffect, useState } from "react"
import { IGenre } from "../../genre/page"
import { showToast } from "@/components/toast/toast"
import { useRouter } from "next/navigation"

export default function CreateMoviePage () {

    const router = useRouter()
    const [genres, setGenres] = useState<IGenre[]>([])
    const [judul, setJudul] = useState('')
    const [namapenulis, setNamapenulis] = useState('')
    const [idGenre, setIdGenre] = useState('')
    const [rating, setRating] = useState(0)
    const [sinopsis, setSinopsis] = useState('')
    const [penerbit, setPenerbit] = useState('')
    const [image, setImage] = useState<File | null>(null)

    const getGenre = async () => {
        try {
            const res = await api.get('/genre/getAll')
            setGenres(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGenre()
    }, [])

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('judul', judul)
            formData.append('namapenulis', namapenulis)
            formData.append('id_genre', idGenre)
            formData.append('rating', rating.toString())
            formData.append('sinopsis', sinopsis)
            formData.append('penerbit', penerbit)

            if(!image) { 
                showToast('Image harus diisi', 'danger')
                return
            }

            formData.append('image', image)

            const res = await api.post('buku/create', formData)
            showToast(res.data.message, 'success') 
            router.push('/admin/buku')
        } catch (error) {
            console.log(error)
        }
    
}

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const fileSelected = e.target.files ? e.target.files[0] : null
        setImage(fileSelected)
    };
    return (
        <div>
            <h4 className="text-black">Input Movie</h4>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3 text-black">
                            <label className="form-label small fw-semibold">Judul</label>
                            <input 
                                type="text" 
                                name="judul"
                                className="form-control"
                                onChange={(e) => setJudul(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-black">
                            <label className="form-label small fw-semibold">Nama Penulis</label>
                            <input 
                                type="text" 
                                name="namapenulis"
                                className="form-control"
                                onChange={(e) => setNamapenulis(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-black">
                            <label className="form-label small fw-semibold">Genre</label>
                            <select name="idGenre" className="form-select" 
                            onChange={(e) => setIdGenre(e.target.value)} defaultValue={""}>
                                
                                <option disabled value="">Pilih Genre</option>
                                {genres.map(genre => {
                                    return (
                                        <option 
                                            key={genre.id}
                                            value={genre.id}
                                        >
                                            {genre.nama}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3 text-black">
                            <label className="form-label small fw-semibold">Penerbit</label>
                            <input 
                                type="text" 
                                name="penerbit"
                                className="form-control"
                                onChange={(e) => setPenerbit(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-black">
                            <label className="form-label small fw-semibold">Sinopsis</label>
                            <textarea 
                            name="sinopsis" 
                            className="form-control" 
                            onChange={(e) => setSinopsis(e.target.value)}
                            rows={5}
                            ></textarea>
                        </div>
                        <div className="mb-3 text-black">
                            <label className="form-label small fw-semibold">Rating</label>
                            <input 
                            type="number"
                            name="rating"
                            className="form-control" 
                            onChange={(e) => setRating(Number(e.target.value))}
                            />
                        </div>
                        <div className="mb-3 text-black">
                            <label className="form-label small fw-semibold">Image</label>
                            <input 
                            type="file"
                            name="image"
                            className="form-control" 
                            onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}