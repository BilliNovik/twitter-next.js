import React from 'react'
import { SearchIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";

import News from './News';
import RecomendUser from './RecomendUser';

const Widgets = ({ articles, users }: any) => {

    const [aricleNumber, setArticleNumber] = React.useState(3)
    const [userNumber, setUserNumber] = React.useState(5)

    return (
        <div className="w-[350px] hidden lg:flex flex-col ml-8 space-y-3 pr-3">
            <div className="w-[100%] sticky top-0 bg-white py-1.5 z-50">
                <div className="flex items-center p-3 rounded-full bg-red-300 relative">
                    <SearchIcon className="h-5 z-50 text-gray-500" />
                    <input className="transition duration-400 absolute inset-0 rounded-full pl-11 border-none text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 " type="text" placeholder="Search Twitter" />
                </div>
            </div>
            <div className="w-[100%] text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 overflow-hidden">
                <h4 className="font-bold text-xl px-4 pb-2">What's happening</h4>
                <AnimatePresence>
                    {
                        articles.slice(0, aricleNumber).map((article: any) => (
                            <motion.div key={article.publishedAt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                                <News key={article.publishedAt} article={article} />
                            </motion.div>
                        ))
                    }
                </AnimatePresence>
                <button className="text-blue-400 text-left w-full py-2.5 px-4 hover:bg-gray-200 transition duration-200"
                    onClick={() => setArticleNumber(prev => prev + 3)}>
                    Show more
                </button>
            </div>
            <div className="w-[100%] text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 overflow-hidden">
                <h4 className="font-bold text-xl px-4 pb-2">Who to follow</h4>
                <AnimatePresence>
                    {
                        users.slice(0, userNumber).map((user: any) => (
                            <motion.div key={user.login.uuid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                                <RecomendUser key={user.login.uuid} randomUser={user} />
                            </motion.div>
                        ))
                    }
                </AnimatePresence>
                <button className="text-blue-400 text-left w-full py-2.5 px-4 hover:bg-gray-200 transition duration-200"
                    onClick={() => setUserNumber(prev => prev + 5)}>
                    Show more
                </button>
            </div>
        </div>
    )
}

export default Widgets