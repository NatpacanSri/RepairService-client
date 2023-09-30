import { Fragment, useRef, useState, SyntheticEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import GoogleIcon from '@/components/google'
import Link from 'next/link'
import router from 'next/router';

export default function loginForm(props: any) {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const handleModal = () => {
        if (open || !open) setOpen(!open)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (email && password) {
            try {
                await fetch('http://localhost:8080/user/login', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                })

                setOpen(false)
                window.location.reload();
            } catch (err: any) {
                setError(err)
            }

        } else {
            return setError("All fields are required!! MotherFUcker idiot")
        }
    }


    return (
        <>
            <button type="button"
                className={"flex text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "}
                onClick={handleModal}
            >
                Sign in
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:py-4">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                                                <Dialog.Title as="h3" className="text-xl md:text-2xl font-semibold leading-6 mb-4 text-gray-900">
                                                    Login
                                                </Dialog.Title>
                                                <div className="mt-2 text-left">
                                                    <p className="text-sm text-center text-gray-500 block w-full">
                                                        Welcome back! Enter your credentials and access your shopping bag.

                                                    </p>
                                                    <div className="relative z-0 w-full my-6 group text-left">
                                                        <input type="email" name="floating_email" id="floating_email"
                                                            className="block py-3.5 px-0 w-full text-md font-light text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            required
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        // value={email}
                                                        />
                                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group text-left">
                                                        <input type="password" name="floating_password" id="floating_password"
                                                            className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-400 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            required
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        // value={password}
                                                        />
                                                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                                    </div>
                                                    <p>{message ? <div className="text-green-500">{message}</div> : null}
                                                        {error ? <div className="text-red-500">{error}</div> : null}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex mb-2 w-full justify-center rounded-md bg-[#0F172A] px-2 py-3 text-md font-semibold text-white  hover:bg-[#161F34] sm:ml-3 sm:w-auto"
                                            onClick={handleSubmit}

                                        >
                                            Sign in
                                        </button>
                                        {/* <button
                                            type="button"
                                            className="inline-flex mb-6 w-full justify-center rounded-md bg-white px-2 py-3 text-md font-semibold text-gray-900 hover:bg-gray-50 border border-gray-100 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            <GoogleIcon classNames="w-6 h-6 mr-2.5" /> Sign in with Google
                                        </button> */}
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-white px-2 py-3 text-md font-normal text-gray-900 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Don't have an account? <Link href={"/registerForm"} className='text-md font-semibold ml-2'>Signup</Link>
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}