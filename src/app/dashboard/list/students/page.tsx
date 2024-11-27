import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, studentsData} from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Student = {
    id:number;
    studentId:string;
    name:string;
    email?:string;
    photo:string;
    phone?:string;
    grade:number;
    class:string;
    address:string;
}

const columns = [
    {
        header:"Info" ,accessor:"info"
    },
    {
        header:"Student ID", accessor:"studentId",className:"hidden md:table-cell"
    },
    {
        header:"Grade", accessor:"grade",className:"hidden md:table-cell"
    },
    {
        header:"Phone", accessor:"phone",className:"hidden lg:table-cell"
    },
    {
        header:"Address", accessor:"address",className:"hidden lg:table-cell"
    },
    {
        header:"Actions", accessor:"action"
    }
];



const StudentListPage = () => {

    const renderRow = (item:Student) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <Image src="/item.photo" alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/>
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.class}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.studentId}</td>
            <td className="hidden md:table-cell">{item.grade}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-mySky">
                        <Image src="/view.png" alt="" width={16} height={16}/>
                    </button>
                    </Link>
                    {role==="admin" && (
                    //     <button className="w-7 h-7 flex items-center justify-center rounded-full bg-myPurple">
                    //     <Image src="/delete.png" alt="" width={16} height={16}/>
                    // </button>
                    <FormModel table="student" type="delete" id={item.id}/>
                    )}
                </div>
            </td>

        </tr>

                )
  return (
    <div className='bg-white flex-1 rounded-md m-4 mt-0 p-4'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block font-semibold text-lg">All Students</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mx-2">
                <TableSearch/>
                <div className="flex items-center gap-4 self-end">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
                    <Image src="/filter.png" alt="" width={14} height={14}/>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
                    <Image src="/sort.png" alt="" width={14} height={14}/>
                </button>
                {role==="admin" && (
                //     <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
                //     <Image src="/plus.png" alt="" width={14} height={14}/>
                // </button>
                <FormModel table="student" type="create"/>
                )}
            </div>
            </div>
            
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={studentsData}/>
        {/* PAGINATION */}
            <Pagination/>
    </div>
  )
}

export default StudentListPage