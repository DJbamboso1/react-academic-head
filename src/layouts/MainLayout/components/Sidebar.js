import React, { useContext, useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Context } from '../../../App';
import { Link } from 'react-router-dom'


let SidebarData = [
    {
        title: 'Phòng Ban',
        path: '/',
        icon: <MdIcons.MdSubject />,
        className: 'menu-link',
        iconClassName: 'menu-icon',
        textClassName: 'menu-text'
    },
    {
        title: 'Môn học',
        path: '/subject',
        icon: <MdIcons.MdSubject />,
        className: 'menu-link',
        iconClassName: 'menu-icon',
        textClassName: 'menu-text'
    },
    {
        title: 'Giảng viên',
        path: '/teacher',
        icon: <MdIcons.MdSubject />,
        className: 'menu-link',
        iconClassName: 'menu-icon',
        textClassName: 'menu-text'
    },
    {
        title: 'Tài khoản',
        path: '/account',
        icon: <MdIcons.MdSubject />,
        className: 'menu-link',
        iconClassName: 'menu-icon',
        textClassName: 'menu-text'
    },
    {
        title: 'Phòng ban',
        path: '/department',
        icon: <MdIcons.MdSubject />,
        className: 'menu-link',
        iconClassName: 'menu-icon',
        textClassName: 'menu-text'
    },
    
]

export default function Sidebar() {

    const { state: { sidebar } } = useContext(Context);


    return (
        <div id="sidebar" className={sidebar ? 'app-sidebar active' : 'app-sidebar'}>
            <div className="app-sidebar-content" data-scrollbar="true" data-height="100%">
                <div className="menu">
                    <div className="menu-header">Navigation</div>
                    {SidebarData.map((item, index) => {
                        return (
                            <>
                                <div className="menu-item">
                                    <Link to={item.path} className={item.className}>
                                        <span className={item.iconClassName}>{item.icon}</span>
                                        <span className={item.textClassName}>{item.title}</span>
                                    </Link>
                                </div>
                                <div className="menu-divider" />
                            </>
                        );
                    })}

                </div>
            </div>

        </div>
    )
}
