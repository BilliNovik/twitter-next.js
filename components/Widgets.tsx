import React from 'react'
import { SearchIcon } from "@heroicons/react/outline";
import News from './News';

const Widgets = ({ articles }: any) => {

    const [aricleNumber, setArticleNumber] = React.useState(5)

    return (
        <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-3">
            <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
                <div className="flex items-center p-3 rounded-full bg-red-300 relative">
                    <SearchIcon className="h-5 z-50 text-gray-500" />
                    <input className="transition duration-400 absolute inset-0 rounded-full pl-11 border-none text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 " type="text" placeholder="Search Twitter" />
                </div>
            </div>
            <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] overflow-hidden xl:w-[75%]">
                <h4 className="font-bold text-xl px-4 pb-2">What's happening</h4>
                {
                    articles.slice(0, aricleNumber).map((article: any) => (
                        <News key={article.publishedAt} article={article} />
                    ))
                }
                <button className="text-blue-400 text-left w-full py-2.5 px-4 hover:bg-gray-200 transition duration-200"
                    onClick={() => setArticleNumber(prev => prev + 5)}>
                    Show more
                </button>
            </div>
        </div>
    )
}

export default Widgets