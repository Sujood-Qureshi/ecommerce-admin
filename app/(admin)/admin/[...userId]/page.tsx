import { auth } from '@clerk/nextjs'
import React from 'react'

export default function page() {
    const user = auth()
    console.log(user.userId)
    return (
        <div>
            this is admin page
        </div>
    )
}
