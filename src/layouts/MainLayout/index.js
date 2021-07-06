import React, { useContext } from 'react'
import { Context } from '../../App'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export default function MainLayout({ children }) {
    let { state: { sidebar } } = useContext(Context)

    return (
        <div className={`main-layout ${sidebar ? 'sidebar-open' : ''}`}>
            <Header />
            <Sidebar />
            <main id="main">
                {children}
            </main>
        </div>
    )
}
