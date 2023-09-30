import { Fragment, useRef, useState, SyntheticEvent, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import router from 'next/router';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'


type PageParams = {
    id: string
}
type ContentPageProps = {
    data: Data,
}

type Data = {
    _id: string
    itemID: string,
    itemName: string,
    status: string
}

type ResponeFromServer = {
    _id: string
    itemID: string,
    itemName: string,
    status: string
}

export async function getServerSideProps({ params }
    : GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {
        let response = await fetch('http://localhost:8080/item/oneItem/' + params?.id)
        let responeFromServer: ResponeFromServer = await response.json()
        // console.log(responeFromServer)
        return {
            props: {
                data: {
                    _id: responeFromServer._id,
                    itemID: responeFromServer.itemID,
                    itemName: responeFromServer.itemName,
                    status:responeFromServer.status
                },
            },
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                data: {
                    _id: '',
                    itemID: '',
                    itemName: '',
                    status: '',
                },
            },
        }
    }
}


export default function editItemForm({ data: { _id, itemID, itemName, status } }: ContentPageProps) {

    const [_itemID, setItemID] = useState(itemID)
    const [_itemName, setItemName] = useState(itemName)
    const [_status,setStatus] = useState(status)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // console.log(adviser)
        if (_itemID && _itemName && _status) {
            try {
                let response = await fetch('http://localhost:8080/item/edit/' + _id , {
                    method: "Put",
                    body: JSON.stringify({
                        itemID:_itemID, itemName:_itemName, status:_status
                    }),
                    headers: {
                        Accept: "application/json , text/plain, */*",
                        "Content-Type": "application/json"
                    }
                })

                response = await response.json()
                setMessage("Post added successfully!!")

                router.push('/itemPage');

            } catch (error: any) {
                setError(error)
                console.log(error)
            }
        } else {
            return setError("All fields are required!! MotherFUcker idiot")
        }

    }

    return (
        <>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border">
                        <div className=" border flex">
                            <div className="border mt-3 m-auto w-full">
                                <h3 className="text-xl text-center md:text-2xl font-semibold leading-6 mb-4 text-gray-900">
                                    แก้ไขครุภัณฑ์
                                </h3>
                                <form className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">รหัสครุภัณฑ์</label>
                                        <input type="text" id="default-input"
                                            onChange={(e) => setItemID(e.target.value)}
                                            value={_itemID ? _itemID : ""}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">ครุภัณฑ์</label>
                                        <select id="itemName"
                                            onChange={(e) => setItemName(e.target.value)}
                                            value={_itemName ? _itemName: ""}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option >เลือกครุภัณฑ์</option>
                                            <option value="จอภาพคอมพิวเตอร์ [ Monitor ]">จอภาพคอมพิวเตอร์ [ Monitor ]</option>
                                            <option value="จอภาพโปรเจคเตอร์ [ Projector ]">จอภาพโปรเจคเตอร์ [ Projector ]</option>
                                            <option value="เครื่องคอมพิวเตอร์ [ Computer / Case ]">เครื่องคอมพิวเตอร์ [ Computer / Case ]</option>
                                            <option value="เม้าส์ [ Mouse ]">เม้าส์ [ Mouse ]</option>
                                            <option value="คีย์บอร์ด [ Keyboard ]">คีย์บอร์ด [ Keyboard ]</option>
                                            <option value="ระบบเสียง/ลำโพง [ Sound / Speaker ]">ระบบเสียง/ลำโพง [ Sound / Speaker ]</option>
                                            <option value="ไมค์โครโฟน [ Microphone ]">ไมค์โครโฟน [ Microphone ]</option>
                                            <option value="เครื่องพริ้นเตอร์ [ Printer ]">เครื่องพริ้นเตอร์ [ Printer ]</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">สถานะ</label>
                                        <select id="status"
                                            onChange={(e) => setStatus(e.target.value)} 
                                            value={_status ? _status : ""}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option >เลือกสถานะ</option>
                                            <option value="ปกติ">ปกติ</option>
                                            <option value="พัง">พัง</option>
                                        </select>
                                    </div>
                                    <button
                            type="button"
                            className="inline-flex mb-2 w-full justify-center rounded-md bg-[#0F172A] px-2 py-3 text-md font-semibold text-white  hover:bg-[#161F34] sm:ml-3 sm:w-auto"
                            onClick={handleSubmit}
                        >
                            ยืนยันการแก้ไข
                        </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* <button onClick={handleModal}
                className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-500 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 mr-3"
            >Edit</button>
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
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border">
                                        <div className=" border flex">
                                            <div className="border mt-3 m-auto w-full">
                                                <Dialog.Title as="h3" className="text-xl text-center md:text-2xl font-semibold leading-6 mb-4 text-gray-900">
                                                    Edit
                                                </Dialog.Title>
                                                <form className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
                                                    <div className="mb-6">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">ItemID</label>
                                                        <input type="text" id="default-input" 
                                                        value={_itemID ? _itemID: ""}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    </div>
                                                    <div className="mb-6">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">ItemName</label>
                                                        <select id="itemName" 
                                                        value={_itemName}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                            <option selected>Choose item</option>
                                                            <option value="จอภาพคอมพิวเตอร์ [ Monitor ]">จอภาพคอมพิวเตอร์ [ Monitor ]</option>
                                                            <option value="จอภาพโปรเจคเตอร์ [ Projector ]">จอภาพโปรเจคเตอร์ [ Projector ]</option>
                                                            <option value="เครื่องคอมพิวเตอร์ [ Computer / Case ]">เครื่องคอมพิวเตอร์ [ Computer / Case ]</option>
                                                            <option value="เม้าส์ [ Mouse ]">เม้าส์ [ Mouse ]</option>
                                                            <option value="คีย์บอร์ด [ Keyboard ]">คีย์บอร์ด [ Keyboard ]</option>
                                                            <option value="ระบบเสียง/ลำโพง [ Sound / Speaker ]">ระบบเสียง/ลำโพง [ Sound / Speaker ]</option>
                                                            <option value="ไมค์โครโฟน [ Microphone ]">ไมค์โครโฟน [ Microphone ]</option>
                                                            <option value="เครื่องพริ้นเตอร์ [ Printer ]">เครื่องพริ้นเตอร์ [ Printer ]</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-6">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Status</label>
                                                        <select id="status" 
                                                        value={_status}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                            <option selected>Choose status</option>
                                                            <option value="Ok">Ok</option>
                                                            <option value="Broken">Broken</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex mb-2 w-full justify-center rounded-md bg-[#0F172A] px-2 py-3 text-md font-semibold text-white  hover:bg-[#161F34] sm:ml-3 sm:w-auto"
                                        // onClick={handleSubmit}
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root> */}
        </> 
    )
}