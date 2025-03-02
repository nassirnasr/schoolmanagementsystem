import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, getRole } from "@/lib/utils"
import { Parent, Prisma, Student } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type ParentList = Parent & {students: Student[]};



const ParentListPage = async ({searchParams} : {searchParams:{[key:string]:string | undefined};}) => {
    const {page, ...queryParams} = searchParams;
    const p = page? parseInt(page) : 1;
    // Get the role by awaiting the getRole function
    const userRole = await getRole(); // Await the role
    // Await the current user ID
    const userId = await currentUserId();


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
    ...(userRole === "admin" ? [{
        header:"Actions", accessor:"action"
    }] :[])
];

const renderRow = (item:ParentList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.students.map(student=>student.name).join(",")}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    
                    </Link>
                    {userRole==="admin" && (
                        // React Fragment
                        <>
                        <FormModel table="parent" type="update" data={item}/>
                        <FormModel table="parent" type="delete" id={item.id}/>
                    </>
                    )}
                </div>
            </td>

        </tr>

                );

    // URL PARAMS CONDITIONS
    const query : Prisma.ParentWhereInput= {}
    if (queryParams) {
        for(const [key, value] of Object.entries(queryParams)){
            if (value !== undefined) {
                switch(key) {
                    case "search":
                        query.name = {contains:value, mode: "insensitive"};
                        break;
                }
            }
            
        }
    }


const [data, count] = await prisma.$transaction([
     prisma.parent.findMany(
        {
            where: query,
            include: {
            students:true
        },
        take:ITEM_PER_PAGE,//only ten in each page
        skip: ITEM_PER_PAGE * (p - 1)// skip items in pagination 
    }
    ),
     prisma.parent.count({
        where: query
     })

]);
    
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
                {userRole === "admin" && (
                    <FormModel table="parent" type="create"/>
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

export default ParentListPage