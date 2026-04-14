import React from 'react'
import { NavLink, useRouteLoaderData } from 'react-router'

export const Navbar = () => {
    const user = useRouteLoaderData("root");

    return (
        <nav className="navbar-container">
            <div className="navbar-wrapper">
                <h1 className="navbar-brand">IS 3750 Playlists</h1>
                <div className="navbar-links">
                    <NavLink to={"/"} end className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                    <NavLink to={"/video"} className={({ isActive }) => isActive ? 'active' : ''}>
                        Videos
                    </NavLink>
                    <NavLink to={"/playlist"} className={({ isActive }) => isActive ? 'active' : ''}>
                        Playlists
                    </NavLink>
                    {!user && (
                        <NavLink to={"/login"}>
                            Log In
                        </NavLink>
                    )}
                    {user && (
                        <NavLink to={"/logout"}>
                            Log Out
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
}
