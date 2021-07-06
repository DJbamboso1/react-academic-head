import React, { useContext, useState } from 'react'
import MenuNavBar from './MenuNavBar'
import Toggle from './Toggle'
import Brand from './Brand'
import { Context } from '../../../App'

export default function Header() {

    let { setState, state } = useContext(Context)
    let { sidebar } = state

    const showSidebar = () => {
        setState({
            ...state,
            sidebar: !sidebar
        })
        localStorage.setItem('sidebar', !sidebar)
    };

    return (
        <div id="header" className="app-header">
            <Toggle onClickShowSideBar={showSidebar} />
            {/* <Brand /> */}
            <Brand onClick={showSidebar} />

            <div className="menu">
                {/* <Search /> */}
                <MenuNavBar />
            </div>
        </div>
    )
}
