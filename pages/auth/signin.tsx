import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

type Props = {}

const signin = ({ providers }: any) => {

    return (
        <div className='max-w-[340px] m-0 ml-auto mr-auto'>
            <div className='p-2.5 flex flex-col justify-center '>
                <div>
                    <svg className='h-12' viewBox="0 0 24 24" aria-hidden="true">
                        <g>
                            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                        </g>
                    </svg>
                </div>
                <p className='text-6xl leading-15 font-bold m-12 ml-0 mr-0'>Happening <br />now</p>
                <p className='text-3xl leading-9 font-bold mb-7'>Join Twitter today.</p>
                <div>
                    {
                        Object.values(providers).map((item: any) => (
                            <button className='bg-transparent mb-3.5 text-black rounded-full w-80 h-11 hover:brightness-95 text-lg 
                                border' key={item.id} onClick={() => signIn(item.id, { callbackUrl: '/' })}>Sign in with {item.name}</button>
                        ))
                    }
                </div>
                <p className='mb-3.5 text-center w-80'>or</p>
                <button className='bg-blue-400 mb-3.5 text-white rounded-full w-80 h-11 font-bold 
                        shadow-md hover:brightness-95 text-lg'>Sign in with phone or email</button>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}

export default signin