import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, getRole } from "@/lib/utils"
import { Class, Prisma, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { FaFilter, FaSort, FaSortAlphaDownAlt, FaSortDown } from "react-icons/fa"
import { HiFilter, HiOutlineFilter, HiSortAscending } from "react-icons/hi"

type ClassList = Class & {supervisor:Teacher};



const ClassListPage = async ({searchParams} : {searchParams:{[key:string]:string | undefined};}) => {
    const {page, ...queryParams} = searchParams;
    const p = page? parseInt(page) : 1;

    // Get the role by awaiting the getRole function
    const userRole = await getRole(); // Await the role

    // Get the current user ID
    const userId = await currentUserId(); // Await the userId

    const columns = [
    {
        header:"Class Name" ,accessor:"name"
    },
    {
        header:"Capacity", accessor:"capacity" , className:"hidden md:table-cell"
    },
    {
        header:"Grade",accessor:"grade", className:"hidden md:table-cell"
    },
    {
        header:"Supervisor",accessor:"supervisor", className:"hidden md:table-cell"
    },
    ...(userRole === "admin" ? [{
        header:"Actions", accessor:"action"
    }] : [])
];

const renderRow = (item:ClassList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.name} </td>
            <td className="hidden md:table-cell">{item.capacity}</td>
            <td className="hidden md:table-cell">{item.name[0]}</td>
            <td className="hidden md:table-cell">{item.supervisor.name + " " + item.supervisor.surname}</td>
               
           
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    </Link>
                    {userRole==="admin" && (
                        <>
                          <FormModel table="class" type="update" data={item}/>
                          <FormModel table="class" type="delete" id={item.id}/>
                        </>
                    )}
                </div>
            </td>

        </tr>

                );

    // URL PARAMS CONDITIONS
    const query : Prisma.ClassWhereInput= {}
    if (queryParams) {
        for(const [key, value] of Object.entries(queryParams)){
            if (value !== undefined) {
                switch(key) {
                    case "search":
                        query.name = {contains:value, mode: "insensitive"};
                        break;
                    case "supervisorId":
                        query.supervisorId = value;
                        break;    
                    default:
                        break;   
                }
            }
            
        }
    }


const [data, count] = await prisma.$transaction([
     prisma.class.findMany(
        {
            where: query,
            include: {
            supervisor:true
        },
        take:ITEM_PER_PAGE,//only ten in each page
        skip: ITEM_PER_PAGE * (p - 1)// skip items in pagination 
    }
    ),
     prisma.class.count({
        where: query
     })

]);
  return (
    <div className='bg-white flex-1 rounded-md m-4 mt-0 p-4'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block font-semibold text-lg">All Classes</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mx-2">
                <TableSearch/>
                <div className="flex items-center gap-4 self-end">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                    <FaFilter size={16} className="text-gray-500"/>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                    <HiSortAscending size={16} className="text-gray-500"/>
                </button>
                {userRole==="admin" && (
                      <FormModel table="class" type="create"/>
                )}
            </div>
            </div>
            
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={data}/>
        {/* PAGINATION */}
            <Pagination page={p} count={count}/>
    </div>
  )
}

export default ClassListPage