"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-700">AI Diyetisyen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/form" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Plan Oluştur
            </Link>
            <Link href="/coach" className="text-gray-700 hover:text-emerald-600 transition-colors">
              AI Koç
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Hakkında
            </Link>
            <Link href="/form">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Hemen Başla</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-100">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/form"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Oluştur
              </Link>
              <Link
                href="/coach"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Koç
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkında
              </Link>
              <Link href="/form" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Hemen Başla</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
