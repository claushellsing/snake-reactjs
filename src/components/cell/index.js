import React from 'react'
import './index.css'

function Cell(props) {


    return (
        <div style={{width: props.size, height: props.size}} className={`cell`}></div>
    )
}