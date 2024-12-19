import React from 'react'
import  Link  from 'next/link'

const Header = () => {
  return (
    <header className="flex justify-between bg-blue-900 h-[7vh]">
        <h1 className="text-2xl font-bold text-white p-3">求人検索アプリ</h1>
        <nav className="p-3 text-white">
        <Link href="/" className="mr-2">求人一覧</Link>
        <Link href="/post">求人投稿</Link>
        </nav>
    </header>
    
  )
}

export default Header