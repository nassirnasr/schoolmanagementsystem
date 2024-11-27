import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { resultsData, role} from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Result = {
    id:number;
    subject:string;
    class:string;
    teacher:string;
    student:string;
    type:"exam" | "assignment"
    date:string;
    score:string;
   
}

const columns = [
    {
        header:"Subject Name" ,accessor:"name"
    },
    {
        header:"Student", accessor:"student" , className:"hidden md:table-cell"
    },
    {
        header:"Score", accessor:"score" 
    },
    {
        header:"Teacher",accessor:"teacher", className:"hidden md:table-cell"
    },
    {
        header:"Class", accessor:"class" , className:"hidden md:table-cell"
    },
    {
        header:"Date",accessor:"date", className:"hidden md:table-cell"
    },
    {
        header:"Actions", accessor:"action"
    }
];



const ResultListPage = () => {

    const renderRow = (item:Result) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.subject} </td>
            <td className="hidden md:table-cell">{item.student}</td>
            <td>{item.score}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td className="hidden md:table-cell">{item.class}</td>
            <td className="hidden md:table-cell">{item.date}</td>
               
           
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    </Link>
                    {role==="admin" && (
                        <>
                        <FormModel table="subject" type="update" data={item}/>
                        <FormModel table="subject" type="delete" id={item.id}/>
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
            <h1 className="hidden md:block font-semibold text-lg">All Results</h1>
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
                    <FormModel table="result" type="create"/>
                )}
            </div>
            </div>
            
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={resultsData}/>
        {/* PAGINATION */}
            <Pagination/>
    </div>
  )
}

export default ResultListPage