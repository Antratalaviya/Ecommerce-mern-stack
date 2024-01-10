import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminManu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group usermenu">
                    <NavLink to='/dashboard/admin/create-category'
                        className="list-group-item list-group-item-action list-group-item-dark"
                        aria-current="true">
                        Create Category
                    </NavLink>
                    <NavLink to='/dashboard/admin/create-product'
                        className="list-group-item list-group-item-action list-group-item-dark">
                        Create Product
                    </NavLink>
                    <NavLink to='/dashboard/admin/product'
                        className="list-group-item list-group-item-action list-group-item-dark">
                        Product
                    </NavLink>
                    <NavLink to='/dashboard/admin/users'
                        className="list-group-item list-group-item-action list-group-item-dark">
                        Users
                    </NavLink>
                </div>

            </div>

        </>
    )
}

export default AdminManu
