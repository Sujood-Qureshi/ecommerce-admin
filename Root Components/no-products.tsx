import React from 'react'

export default function NoProducts() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Sorry</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">no products found as per your search, try another combinations of filters</p>
                </div>
            </div>
        </section>
    )
}
