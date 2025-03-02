import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, getRole } from "@/lib/utils"
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type AssignmentList = Assignment & {lesson:{
    subject:Subject;
    class:Class;
    teacher:Teacher;
}};



const AssignmentListPage = async ({searchParams} : {searchParams:{[key:string]:string | undefined};}) => {


    const {page, ...queryParams} = searchParams;
    const p = page? parseInt(page) : 1;

    // Get the role by awaiting the getRole function
    const userRole = await getRole(); // Await the role

    // Get the current user ID
    const userId = await currentUserId(); // Await the userId

const columns = [
    {
        header:"Subject Name" ,accessor:"name"
    },
    {
        header:"Class", accessor:"class" 
    },
    {
        header:"Teacher",accessor:"teacher", className:"hidden md:table-cell"
    },
    {
        header:"Due Date",accessor:"duedate", className:"hidden md:table-cell"
    },
        ...(userRole === "admin" || userRole === "teacher" ? [{
        header:"Actions", accessor:"action"
        }] : [])
];

const renderRow = (item:AssignmentList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.lesson.subject.name} </td>
            <td>{item.lesson.class.name}</td>
            <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>
               
           
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    </Link>
                    {(userRole === "admin" || role === "teacher") && (
                        <>
                          <FormModel table="assignment" type="update" data={item}/>
                          <FormModel table="assignment" type="delete" id={item.id}/>
                        </>
                    )}
                </div>
            </td>

        </tr>

                );
    // URL PARAMS CONDITIONS

    
    const query : Prisma.AssignmentWhereInput= {}
    query.lesson = {};

    if (queryParams) {
        for(const [key, value] of Object.entries(queryParams)){
            if (value !== undefined) {
                switch(key) {
                    case "search":
                        query.lesson = {
                            OR: [
                                {subject: {name: {contains: value, mode: "insensitive"}}},
                                {teacher: {
                                    OR: [
                                        {name: {contains: value, mode: "insensitive"}},
                                        {surname: {contains: value, mode: "insensitive"}}
                                    ]
                                }}
                            ]
                        }
                        break;
                    case "classId":
                            query.lesson.classId = parseInt(value);
                            break;    
                    case "teacherId":
                        query.lesson.teacherId = value;
                        break;
                    default:
                        break;    
                }
            }
            
        }
    }

    //ROLE CONDITIONs
    switch (userRole) {
        case "admin":
            break;
        case "teacher":
            if (userId) {
                query.lesson.teacherId = userId;
            }
            break;
        case "student":
            query.lesson.class = {
                students: {
                    some:{
                        id:userId!
                    }
                }
            }
            break;
            case "parent":
                query.lesson.class = {
                    students: {
                        some:{
                            parentId:userId!
                        }
                    }
                }
                break; 
        default:
            break;     

    }


const [data, count] = await prisma.$transaction([
     prisma.assignment.findMany(
        {
            where: query,
            include: {
            lesson: {
                select: {
                    subject: {select: {name: true}},
                    teacher: {select: {name: true, surname: true}},
                    class: {select: {name: true}},
                }
            }
        },
        take:ITEM_PER_PAGE,//only ten in each page
        skip: ITEM_PER_PAGE * (p - 1)// skip items in pagination 
    }
    ),
     prisma.assignment.count({
        where: query
     })

]);


    
  return (
    <div className='bg-white flex-1 rounded-md m-4 mt-0 p-4'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block font-semibold text-lg">All Assignments</h1>
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
                      <FormModel table="assignment" type="create"/>
                )}
            </div>
            </div>
            
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={data}/>
        {/* PAGINATION */}
            <Pagination count={count} page={p}/>
    </div>
  )
}

export default AssignmentListPage