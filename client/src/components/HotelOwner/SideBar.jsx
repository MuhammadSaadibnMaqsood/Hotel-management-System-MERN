import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const SideBar = () => {
    const SideBarLinks = [
        { name: 'Dashboard', path: '/owner', icon: assets.dashboardIcon },
        { name: 'Add Room', path: '/owner/add-room', icon: assets.addIcon },
        { name: 'List Room', path: '/owner/list-room', icon: assets.listIcon }
    ];

    return (
        <div className='md:w-64 w-20 border-r h-full text-base border-gray-200 bg-gradient-to-b from-blue-50 via-white to-blue-100 shadow-lg transition-all duration-300'>
            <div className="flex flex-col py-4 gap-1">
                {SideBarLinks.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        end
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 md:px-6 gap-3 rounded-l-full transition-all duration-300 ${isActive
                                ? 'border-r-4 border-blue-600 bg-blue-600/10 text-blue-600 font-semibold shadow-md'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`
                        }
                    >
                        <img src={item.icon} alt={item.name} className='h-6 w-6' />
                        <span className='hidden md:block'>{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
