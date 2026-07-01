'use client'

import { showToast } from "@/components/toast/toast";
import { api } from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [noTelpon, setNoTelpon] = useState('');
    const router = useRouter();

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const res = await api.post('user/register', {
                username, 
                password,
                notelp: noTelpon
            })
            showToast(res.data.message, 'success');
            router.push('/')
        } catch (error: any) {
            showToast(error.response.data.message, 'danger');
        }
    };

    return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h5 className="fw-bold mb-1">Register</h5>
            <p className="text-muted small mb-4">Buat Akun Baru</p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Username</label>
              <input
                type="text"
                name="username"
                className="form-control form-control-sm py-2"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm py-2"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Nomor Telpon</label>
              <input
                type="text"
                name="noTelpon"
                className="form-control form-control-sm py-2"
                placeholder="Masukkan nomor telpon"
                value={noTelpon}
                onChange={(e) => setNoTelpon(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#398bb4", borderRadius: "8px" }}
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Sudah punya akun?
          </p>
          <Link href={'/'}>
            <button
                type="button"
                className="btn w-100 py-2 text-white fw-semibold"
                style={{ background: "#398bb4", borderRadius: "8px" }}
              >
                Masuk
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
}