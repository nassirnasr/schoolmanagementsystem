import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { parentsData, role} from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Parent = {
    id:number;
    parentId:string;
    name:string;
    students:string[];
    email?:string;
    photo:string;
    phone:string;
    address:string;
}

const columns = [
    {
        header:"Info" ,accessor:"info"
    },
    {
        header:"Student Name(s)", accessor:"students",className:"hidden md:table-cell"
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



const ParentListPage = () => {

    const renderRow = (item:Parent) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.students.join(",")}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    
                    </Link>
                    {role==="admin" && (
                        // React Fragment
                        <>
                        <FormModel table="parent" type="update" data={item}/>
                        <FormModel table="parent" type="delete" id={item.id}/>
                    </>
                    )}
                </div>
            </td>

        </tr>

                )
  return (
    <div className='bg-white flex-1 rounded-md m-4 mt-0 p-4'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block font-semibold text-lg">All Parents</h1>
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
                    <FormModel table="parent" type="create"/>
                )}
            </div>
            </div>
            
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={parentsData}/>
        {/* PAGINATION */}
            <Pagination/>
    </div>
  )
}

export default ParentListPage