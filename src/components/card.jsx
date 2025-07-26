import React from 'react'

function Card({ children, title = "" }) {
    return (
        <div className="bg-white px-5 py-5 rounded-2xl border border-gray-200 pb-10">
            <p className="text-2xl font-bold mb-10 text-gray-700">{title}</p>
            {children}
        </div>
    )
}

export default Card