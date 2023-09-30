import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import router from 'next/router'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'


type PageParams = {
    id: string
}
type ContentPageProps = {
    data: Data,
}

type Data = {
    _id: string
    item: {
        itemID: string,
        itemName: string,
    }
    detail: string,
    room: string,
    status: string,
}

type ResponeFromServer = {
    _id: string
    item: {
        itemID: string,
        itemName: string,
    }
    detail: string,
    room: string,
    status: string,
}


export async function getServerSideProps({ params }
    : GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {
        let response = await fetch('http://localhost:8080/report/oneReport/' + params?.id)
        let responeFromServer: ResponeFromServer = await response.json()
        // console.log(responeFromServer)
        return {
            props: {
                data: {
                    _id: responeFromServer._id,
                    item: {
                        itemID: responeFromServer.item.itemID,
                        itemName: responeFromServer.item.itemName,
                    },
                    detail: responeFromServer.detail,
                    room: responeFromServer.room,
                    status: responeFromServer.status,
                },
            },
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                data: {
                    _id: "",
                    item: {
                        itemID: '',
                        itemName: '',
                    },
                    detail: '',
                    room: '',
                    status: '',
                },
            },
        }
    }
}

export default function editReportForm({ data: { _id, item: { itemID, itemName },detail, room, status } }: ContentPageProps) {

    const { auth, user } = useAuth();
    const [searchValue, setSearchValue] = useState()
    // const [_user, setUser] = useState('')
    const [_item_ID, setItem_ID] = useState(itemID)
    const [_detail, setDetail] = useState(detail)
    const [_room, setRoom] = useState(room)
    const [_status, setStatus] = useState(status)

    

    // console.log(user?.name)
    // console.log(_detail)
    const search = async (params: string) => {

        try {
            let res = await fetch(`http://localhost:8080/item/search?itemID=${params}`)
            let data = await res.json()
            console.log(data)
            setSearchValue(data.itemName)
            setItem_ID(data._id)
        } catch (err) {
            console.log(err)
        }

        return {
            props: {

            }
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // const userID = user?._id
        if (_item_ID && _detail && _room && _status) {
            try {
                let res = await fetch('http://localhost:8080/report/edit/' + _id, {
                    method: "Put",
                    body: JSON.stringify({
                        item:_item_ID, detail:_detail, room:_room, status:_status
                    }),
                    headers: {
                        Accept: "application/json , text/plain, */*",
                        "Content-Type": "application/json"
                    }
                })

                res = await res.json()

                router.push('/reportPage');
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className='max-w-6xl min-h-[80vh] m-auto mt-10'>

            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-black '>แบบฟอร์มการแจ้งซ่อม</h1>
                <p className='text-gray-400 font-semibold mb-4'>ระบบแจ้งซ่อมแซ่มอุปกรณ์ วิทยาลัยการคอมพิวเตอร์</p>
            </div>

            <form className="border-t-2 border-gray-300 pt-5" >
                <div className="max-w-3xl m-auto ">

                    <div className='mb-6'>
                        <label className="block mb-2 text-base font-bold text-gray-900">ครุภัณฑ์ที่แจ้งซ่อม</label>
                        <div className='flex'>
                            <input type="text" id="search-dropdown" placeholder="รหัสครุภัณฑ์"
                                value={_item_ID ? _item_ID : ""}
                                onChange={e => search(e.target.value)}
                                className=" block p-2.5 w-1/2 z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg  border-l-gray-300 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                            <select id="itemName"
                                className="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                value={searchValue}>
                                <option selected>เลือกครุภัณฑ์</option>
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
                    </div>
                    <div className='mb-6'>
                        <label className="block mb-2 text-base font-bold text-gray-900">อาการเบื้องต้น(ระบุอาการที่พบ หรือ สภาพที่พบ)</label>
                        <textarea id="detail"
                            onChange={e => setDetail(e.target.value)}
                            value={_detail ? _detail: ""}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-bold text-gray-900">สถานที่ตั้ง/ห้องที่พบปัญหา</label>
                        <input type="text"
                            onChange={e => setRoom(e.target.value)}
                            value={_room ? _room: ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                    </div>

                    <label className="block mb-2 text-base font-bold text-gray-900">สถานะ</label>
                    <div className="flex">
                        <select id="itemName"
                            className="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            value={_status}>
                            <option selected>เลือกสถานะ</option>
                            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                            <option value="ซ่อมสำเร็จ">ซ่อมสำเร็จ</option>
                        </select>
                        <button type="button"
                            onClick={handleSubmit}
                            className="m-auto focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xl px-20 py-2 dark:focus:ring-yellow-900">แจ้งซ่อม</button>

                    </div>
                </div>
            </form >
        </div >

    );
}



