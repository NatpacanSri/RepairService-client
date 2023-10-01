import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useAuth } from './AuthContext';
import router from 'next/router'
import {useState} from 'react' 

type Props = {
  reportsData: [Report],
  itemsData: [Item]
}

type Report = {
  _id: string
  user: {
    name: string,
    email: string,
    tel: string,
  },
  item: {
    itemID: string,
    itemName: string,
  }
  detail: string,
  room: string,
  status: string,
}

type Item = {
  _id: string
  itemID: string,
  itemName: string,
  status: string
}


export const getServerSideProps = async () => {
  try {
    let getReport = await fetch('http://localhost:8080/report')
    let report = await getReport.json()

    let getItem = await fetch('http://localhost:8080/item')
    let item = await getItem.json()
    console.log(report)
    console.log(JSON.parse(JSON.stringify(report)))
    return {
      // props: { datas: JSON.parse(JSON.stringify(report)) }
      props: {
        reportsData: report,
        itemsData: item,
      },
    }

  } catch (error) {
    console.error(error)
    return {
      props: {
        reportData: [],
        itemData: [],
      },
    }
  }
}

export default function Home({ reportsData, itemsData }: Props) {

  const { auth, user } = useAuth();
  const [message,setMessage] = useState('')
  // console.log(auth)

  const handleGo = () => {
    if(auth){
      router.push('/reportPage/form');
    }else{
      setMessage('กรุณาเข้าสู่ระบบก่อน !!')
    }
  }

  return (
    <main className='max-w-7xl min-h-[80vh] m-auto mt-10'>
      <div className='grid grid-cols-2 h-[80vh]'>

        <div className='flex pr-4'>

          <div className='my-auto'>
            <div className='border-b-2 pb-8'>

              <h1 className='flex text-5xl text-blue-600 font-semibold'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mt-auto mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
                ระบบแจ้งซ่อมแซ่มอุปกรณ์</h1>
              <p className=' text-xl font-medium text-gray-500 mb-7'>ระบบการแจ้งซ่อม วิทยาลัยการคอมพิวเตอร์</p>
              
              <button onClick={handleGo} 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-8 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">แจ้งซ่อม</button>
                {message ? <b className='text-red-500 ' > &gt;&gt; {message}</b> : null}
            </div>
            <div className='flex mt-6'>
              <h3 className='text-gray-600 text-5xl font-bold mr-2'>{reportsData?.length > 0 ? (reportsData.length) : ("0")}</h3>
              <p className='text-gray-500 w-16 leading-4 font-normal mr-20 mt-2 '>รายการแจ้งซ่อม</p>
              <h3 className='text-gray-600 text-5xl font-bold mr-2'>{itemsData?.length > 0 ? (itemsData.length) : ("0")}</h3>
              <p className='text-gray-500 w-16 leading-4 font-normal mt-2'>รายการครุภัณฑ์</p>
            </div>
          </div>
        </div>
        <div className='pl-4 flex'>
          <div className='m-auto w-full'>

            <div className="bg-white mb-5 w-full rounded-lg overflow-hidden shadow-md">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-blue-600">
                <thead className="bg-gray-50 dark:bg-blue-600">
                  <tr key={"01"}>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-white">หมายเลขครุภัณฑ์</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-white">อาการ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-white">สถานะ</th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 overflow-y-scroll ">
                  {reportsData?.length > 0 ? (
                    reportsData.map((report, index) => {
                      return (
                        <tr key={report._id + "-" + index}>
                          <td className="px-6 py-4 whitespace-nowrap text-m font-semibold text-gray-600 ">{`${report.item.itemID}`}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-m font-medium text-gray-600 ">{report.detail}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-600 ">{report.status}</td>
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
            </div>

            <div className="bg-white mb-5 w-full rounded-lg overflow-hidden shadow-md">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-blue-600">
                <thead className="bg-gray-50 dark:bg-blue-600">
                  <tr key={"01"}>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-white">หมายเลขครุภัณฑ์</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-white">ครุภัณฑ์</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-white">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 overflow-y-scroll">
                  {itemsData?.length > 0 ? (
                    itemsData.map((items, index) => {
                      return (
                        <tr key={items._id + "-" + index} >
                          <td className="px-6 py-4 whitespace-nowrap text-m font-semibold text-gray-600 ">{items.itemID}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-m font-medium text-gray-600 ">{items.itemName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-m text-gray-600 ">{items.status}</td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr  >
                      <td className='text-black p-5 font-semibold'>
                        no item
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
