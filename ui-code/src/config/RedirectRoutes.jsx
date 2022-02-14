import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { userStateEnum } from '../types'

const RedirectRoutes = () => {
    const userState = useSelector(state => state.auth.userState)
    const hereFor = useSelector(state => state.auth.hereFor)

    switch(userState) {
        case "":
            return <Navigate to="/signin"></Navigate>
        case userStateEnum.SIGNEDIN:
            return <Navigate to="/wallet-import"></Navigate>
        case userStateEnum.WALLET_IMPORTED:
            return <Navigate to={`/${hereFor}`}></Navigate>
        case userStateEnum.FIRST_THING:
            return <Navigate to={`/${hereFor}`}></Navigate>
        default:
            return <Navigate to="/"></Navigate>
    }
}

export default RedirectRoutes