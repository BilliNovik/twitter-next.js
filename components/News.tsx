import React from 'react'
import { getCurrentDate } from '../utils/date'

type Props = {}

const News = ({ article }: any) => {

    return (
        <a href={article.url} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
                <div className="space-y-0.5">
                    <p className="text-xs font-light text-gray-500">{getCurrentDate(article.publishedAt)}</p>
                    <h6 className="text-sm font-bold">{article.title}</h6>
                    <p className="text-xs font-medium text-gray-500">{article.source.name}</p>
                </div>
            </div>
        </a>
    )
}

export default News