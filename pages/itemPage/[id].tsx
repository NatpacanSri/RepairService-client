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
                    status: responeFromServer.status
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

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [_itemID, setItemID] = useState(itemID)
    const [_itemName, setItemName] = useState(itemName)
    const [_status, setStatus] = useState(status)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // console.log(adviser)
        if (_itemID && _itemName && _status) {
            try {
                let response = await fetch('http://localhost:8080/item/edit/' + _id, {
                    method: "Put",
                    body: JSON.stringify({
                        itemID: _itemID, itemName: _itemName, status: _status
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

        // <div className="flex max-w-6xl m-auto min-h-[80vh]">
        //     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        //         <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border">
        //             <div className=" border flex">
        //                 <div className="border mt-3 m-auto w-full">
        //                     <h3 className="text-xl text-center md:text-2xl font-semibold leading-6 mb-4 text-gray-900">
        //                         แก้ไขครุภัณฑ์
        //                     </h3>
        //                     <form className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
        //                         <div className="mb-6">
        //                             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">รหัสครุภัณฑ์</label>
        //                             <input type="text" id="default-input"
        //                                 onChange={(e) => setItemID(e.target.value)}
        //                                 value={_itemID ? _itemID : ""}
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        //                         </div>
        //                         <div className="mb-6">
        //                             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">ครุภัณฑ์</label>
        //                             <select id="itemName"
        //                                 onChange={(e) => setItemName(e.target.value)}
        //                                 value={_itemName ? _itemName: ""}
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        //                                 <option >เลือกครุภัณฑ์</option>
        //                                 <option value="จอภาพคอมพิวเตอร์ [ Monitor ]">จอภาพคอมพิวเตอร์ [ Monitor ]</option>
        //                                 <option value="จอภาพโปรเจคเตอร์ [ Projector ]">จอภาพโปรเจคเตอร์ [ Projector ]</option>
        //                                 <option value="เครื่องคอมพิวเตอร์ [ Computer / Case ]">เครื่องคอมพิวเตอร์ [ Computer / Case ]</option>
        //                                 <option value="เม้าส์ [ Mouse ]">เม้าส์ [ Mouse ]</option>
        //                                 <option value="คีย์บอร์ด [ Keyboard ]">คีย์บอร์ด [ Keyboard ]</option>
        //                                 <option value="ระบบเสียง/ลำโพง [ Sound / Speaker ]">ระบบเสียง/ลำโพง [ Sound / Speaker ]</option>
        //                                 <option value="ไมค์โครโฟน [ Microphone ]">ไมค์โครโฟน [ Microphone ]</option>
        //                                 <option value="เครื่องพริ้นเตอร์ [ Printer ]">เครื่องพริ้นเตอร์ [ Printer ]</option>
        //                             </select>
        //                         </div>
        //                         <div className="mb-6">
        //                             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">สถานะ</label>
        //                             <select id="status"
        //                                 onChange={(e) => setStatus(e.target.value)} 
        //                                 value={_status ? _status : ""}
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        //                                 <option >เลือกสถานะ</option>
        //                                 <option value="ปกติ">ปกติ</option>
        //                                 <option value="พัง">พัง</option>
        //                             </select>
        //                         </div>
        //                         <button
        //                 type="button"
        //                 className="inline-flex mb-2 w-full justify-center rounded-md bg-[#0F172A] px-2 py-3 text-md font-semibold text-white  hover:bg-[#161F34] sm:ml-3 sm:w-auto"
        //                 onClick={handleSubmit}
        //             >
        //                 ยืนยันการแก้ไข
        //             </button>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>

        //     </div>
        // </div>

        <div className="flex max-w-6xl m-auto min-h-[80vh]">
            <form onSubmit={handleSubmit} className='border bg-white rounded-xl p-5 m-auto '>
                <h1 className='text-3xl font-semibold text-blue-600 my-6 text-center'>แก้ไขครุภัณฑ์</h1>

                <div className='p-4 '>
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-bold text-gray-900">รหัสครุภัณฑ์</label>
                        <input type="text"
                            onChange={(e) => setItemID(e.target.value)}
                            value={_itemID ? _itemID : ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-bold text-gray-900">เลือกครุภัณฑ์</label>
                        <select id="itemName"
                            onChange={(e) => setItemName(e.target.value)}
                            value={_itemName ? _itemName : ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
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
                        <label className="block mb-2 text-base font-bold text-gray-900">สถานะ</label>
                        <select id="itemName"
                            onChange={(e) => setStatus(e.target.value)} 
                            value={_status ? _status : ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option >เลือกสถานะ</option>
                            <option value="ปกติ">ปกติ</option>
                            <option value="พัง">พัง</option>
                        </select>
                    </div>
                </div>
                <div className='flex my-6'>
                    <button type="submit"
                        className="m-auto focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-xl px-20 py-2">
                        ยืนยันการแก้ไข
                    </button>
                </div>
            </form>
        </div>

    )
}