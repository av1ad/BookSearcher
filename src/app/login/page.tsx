"use client";

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/app/(components)/Header'
import Footer from '@/app/(components)/Footer'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      router.push('/')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-md mx-auto px-4 py-16">
        <div className="bg-[#D9D9D9] bg-opacity-5 p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-[#a9c5a0] text-center mb-8">
            Login
          </h1>
          
          {error && (
            <div className="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#a9c5a0] text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#D9D9D9] bg-opacity-10 text-[#a9c5a0] p-3 rounded-lg focus:ring-2 focus:ring-[#3c7a46] focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#a9c5a0] text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#D9D9D9] bg-opacity-10 text-[#a9c5a0] p-3 rounded-lg focus:ring-2 focus:ring-[#3c7a46] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3c7a46] text-white py-3 px-6 rounded-lg hover:bg-[#2c5a34] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-[#758173] mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#a9c5a0] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}