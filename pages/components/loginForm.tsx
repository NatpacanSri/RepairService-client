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
                const response = await fetch('http://localhost:8080/user/login', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                })
                if (response.status === 404) {
                    const errorData = await response.json(); // Parse the response JSON
                    setError(errorData.message);
                }else if(response.status === 400){
                    const errorData = await response.json(); // Parse the response JSON
                    setError(errorData.message);
                }else{
                    setOpen(false)
                    window.location.reload();
                }
                
            } catch (err: any) {
                setError(err)
            }

        } else {
            return setError("กรอกข้อมูลให้ครบ")
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

                                        <Dialog.Title as="h3" className="text-3xl text-center font-bold mb-4 text-blue-600">
                                            ล็อกอิน
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className="mb-6 text-left">
                                                <label className="block mb-2 text-base font-bold text-gray-900">อีเมล</label>
                                                <input type="text"
                                                    onChange={e => setEmail(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                            </div>
                                            <div className="mb-10 text-left">
                                                <label className="block mb-2 text-base font-bold text-gray-900">รหัสผ่าน</label>
                                                <input type="password"
                                                    onChange={e => setPassword(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                            </div>
                                            <p>{message ? <div className="text-green-500 text-center">{message}</div> : null}
                                                {error ? <div className="text-red-500 text-center">{error}</div> : null}
                                            </p>
                                            <div>
                                                <div className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="inline-flex mb-2 w-full justify-center rounded-md bg-blue-600 px-2 py-3 text-md font-semibold text-white  hover:bg-blue-800"
                                                        onClick={handleSubmit} >
                                                        เข้าสู่ระบบ
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-white px-2 py-3 text-md font-normal text-gray-900 sm:ml-3 sm:w-auto"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        ยังไม่เป็นสมาชิกใช่ไหม? <Link href={"/registerForm"} className='text-md font-semibold ml-2 text-blue-800 underline'>สมัครสมาชิก</Link>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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