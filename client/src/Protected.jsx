import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected(props) {
    const { Component } = props
    const navigate = useNavigate()
    useEffect(() => {
        const token = Cookies.get('token')
        if (token == 'undefined') {
            navigate('/')
        }
        else
        navigate('/home')
    },[])
    return (
        <>
            <Component />
        </>
    )
}