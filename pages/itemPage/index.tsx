import { useState } from "react"
import Link from "next/link"
import Edit from './[id]'

type Props = {
    datas: [Data]
}

type Data = {
    _id: string
    itemID: string,
    itemName: string,
    status: string
}

export const getServerSideProps = async () => {
    try {
        let response = await fetch('http://localhost:8080/item')
        let datas = await response.json()

        return {
            props: { datas: JSON.parse(JSON.stringify(datas)) }
        }
    } catch (error) {
        console.error(error)
        return {
            props: { datas: [] },
        }
    }
}

function Table({ datas }: Props) {

    const handleDelete = async (id: string) => {
        try {

            let response = await fetch('http://localhost:8080/item/delete/' + id, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    "Content-Type": 'application/json'
                }
            })
            let data = await response.json()

            window.location.reload()

        } catch (e) {
            console.error('An error occured while deleting ', e)

        }
    }

    return (
        <table className="bg-white min-w-full ">
            <thead className="bg-gray-50 dark:bg-blue-600">
                <tr key={"01"}>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">หมายเลขครุภัณฑ์</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">ครุภัณฑ์</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">สถานะ</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-white">แก้ไข/ลบ</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 overflow-y-scroll">
                {datas?.length > 0 ? (
                    datas.map((item, index) => {
                        return (
                            <tr key={item.itemID + "-" + index}>
                                <td className="px-6 py-4 whitespace-nowrap text-m font-semibold text-gray-800 dark:text-black">{item.itemID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-m font-medium text-gray-800 dark:text-black">{item.itemName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-black">{item.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-500 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 mr-3"
                                        href={`./itemPage/${item._id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                    {/* <Edit  _id={item._id} /> */}
                                    <button className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        onClick={() => handleDelete(item._id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr  >
                        <td className='text-black p-5 font-semibold '>
                            no item
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default function index(props: Props) {

    const [item, setItem] = useState<[Data]>(props.datas)


    const [itemID, setItemID] = useState("")
    const [itemName, setItemName] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const status = "ปกติ"
        if (itemID && itemName) {
            try {
                let response = await fetch('http://localhost:8080/item/add', {
                    method: "Post",
                    body: JSON.stringify({
                        itemID, itemName, status
                    }),
                    headers: {
                        Accept: "application/json , text/plain, */*",
                        "Content-Type": "application/json"
                    }
                })
                response = await response.json()

                setItemID("")
                setItemName("")

                window.location.reload()


            } catch (err) {
                console.error(err)
            }
        }

    }

    return (
        <div className='max-w-6xl min-h-[80vh] m-auto mt-10 '>
            <div className="grid grid-cols-2">
                <div>
                    <h1 className='text-2xl font-bold text-black '>รายการครุภัณฑ์</h1>
                    <p className='text-gray-400 font-semibold mb-4'>มีครุภัณฑ์อยู่ <b className="text-gray-500">{item?.length > 0 ? (item.length) : ("No")} </b> รายการ </p>
                </div>
                <div className='flex'>
                    <form className="ml-auto my-auto" onSubmit={handleSubmit}>
                        <div className="flex w-full ">
                            <div className="flex w-full  ">

                                <select id="itemName" onChange={e => setItemName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    <option selected >เลือกครุภัณฑ์</option>
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
                            <div className="relative w-full">
                                <input type="text" id="search-dropdown" onChange={e => setItemID(e.target.value)}
                                    className="h-full block p-2.5 w-[300px] z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg  border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="itemID" />
                                <button type="submit" className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-green-600 rounded-r-lg  hover:bg-green-800  dark:bg-green-500 dark:hover:bg-green-600 ">
                                    + Add item
                                </button>
                            </div>
                        </div>
                    </form>


                    {/* <a href='./teacherPage/addTch' type="button" className=" ml-auto my-auto py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-m  dark:focus:ring-offset-gray-800"
                    >
                        + Add item
                    </a> */}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden shadow-md">

                            <Table datas={item} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


