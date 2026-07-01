'use client'

import { showToast } from "@/components/toast/toast"
import { api } from "@/lib/axios"
import React, { useState } from "react"
export default function CreateGenrePage () {
    const [nama, setNama] = useState('')
    const [description, setDescription] = useState('')

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('genre/create', {
                nama,
                deskripsi: description
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            showToast(error.response.data.message, 'danger')
        }
    }

    return (
        <div>
            <h4 className="text-black">Input Genre</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="text-black form-label small fw-semibold">Nama Genre</label>
                    <input 
                    type="text"
                    name="nama"
                    className="form-control form-control-sm py-2"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label className="text-black form-label small fw-semibold">Description</label>
                    <input 
                    type="text"
                    name="description"
                    className="form-control form-control-sm py-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}