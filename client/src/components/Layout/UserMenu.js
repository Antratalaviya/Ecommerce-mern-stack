import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group usermenu">
                    <NavLink to='/dashboard/user/profile'
                        className="list-group-item list-group-item-action list-group-item-dark"
                        aria-current="true">
                        Profile
                    </NavLink>
                </div>

            </div>

        </>
    )
}

export default UserMenu
