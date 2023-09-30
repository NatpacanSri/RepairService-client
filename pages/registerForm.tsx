import { GetServerSideProps } from 'next';
import Link from 'next/link';
// import GoogleIcon from '@/components/google'
import { useState } from 'react';
import router from 'next/router';


const registerForm = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tel, setTel] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')


    const handelSubmit = async (e:any) => {
        e.preventDefault()

        if (email && password ) {
            try {
                await fetch('http://localhost:8080/user/register', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name, tel, role })
                })

                await router.push('/');

            } catch (err:any) {
                setError(err)
            }

        } else {
            return setError("All fields are required!! MotherFUcker idiot")
        }
    }

    return (
        <div>
            <div className="w-screen">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <form onSubmit={handelSubmit}>

                        <div className="border relative transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg sm:py-4">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                                        <div className="text-xl md:text-2xl font-semibold leading-6 mb-4 text-gray-900">
                                            Register
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-center text-gray-500">
                                                
                                            </p>
                                            <div className='grid grid-cols-2 gap-10 mt-6'>
                                                <div className='border-r pr-10 '>
                                                    <div className="relative z-0 w-full my-6 group text-left">
                                                        <input type="text" name="floating_name" id="floating_name"
                                                            className="block py-3.5 px-0 w-full text-md font-light text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            onChange={e => setName(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                                    </div>
                                                    <div className="relative z-0 w-full my-6 group text-left">
                                                        <input type="email" name="floating_email" id="floating_email"
                                                            className="block py-3.5 px-0 w-full text-md font-light text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            onChange={e => setEmail(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group text-left">
                                                        <input type="password" name="floating_password" id="floating_password"
                                                            className="block py-3.5 px-0 w-full text-md font-light text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            onChange={e => setPassword(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="relative z-0 w-full mt-8 group text-left ">
                                                        <label className="sr-only">Underline select</label>
                                                        <select id="underline_select" className="block py-3 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                                        onChange={e => setRole(e.target.value)}>
                                                            <option selected>Choose role</option>
                                                            <option value="นักศึกษา">นักศึกษา</option>
                                                            <option value="TA">TA</option>
                                                            <option value="เจ้าหน้าที่">เจ้าหน้าที่</option>
                                                            <option value="อาจารย์">อาจารย์</option>
                                                        </select>
                                                    </div>
                                                    <div className="relative z-0 w-full my-6 mb-10 group text-left">
                                                        <input type="tel" name="floating_tel" id="floating_tel"
                                                            className="block py-3.5 px-0 w-full text-md font-light text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            onChange={e => setTel(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="floating_tel" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telephone</label>
                                                    </div>
                                                    <div className="w-full mb-6">
                                                        <button
                                                            type="submit"
                                                            className=" block w-full rounded-md bg-[#0F172A] px-4 py-3 text-md font-semibold text-white hover:bg-[#161F34] "
                                                        >
                                                            Sign up
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
                                
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}


export default registerForm