import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, getRole } from "@/lib/utils"
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { FaFilter } from "react-icons/fa"
import { HiSortAscending } from "react-icons/hi"

type ExamList = Exam & {lesson:{
    subject:Subject;
    class:Class;
    teacher:Teacher;
}};



const ExamListPage = async ({searchParams} : {searchParams:{[key:string]:string | undefined};}) => {
    const {page, ...queryParams} = searchParams;
    const p = page? parseInt(page) : 1;
    // Get the role by awaiting the getRole function
    const userRole = await getRole(); // Await the role
    // Await the current user ID
    const userId = await currentUserId();
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
        header:"Date",accessor:"date", className:"hidden md:table-cell"
    },
    ...(userRole === "admin" || userRole === "teacher" ? [{
        header:"Actions", accessor:"action"
    }] : [])
];

const renderRow = (item:ExamList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.lesson.subject.name} </td>
            <td>{item.lesson.class.name}</td>
            <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
               
           
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    </Link>
                    {(userRole==="admin" || userRole === "teacher" ) && (
                        <>
                        <FormModel table="exam" type="update" data={item}/>
                        <FormModel table="exam" type="delete" id={item.id}/>
                        </>
                    )}
                </div>
            </td>

        </tr>

                );

    // URL PARAMS CONDITIONS
    const query : Prisma.ExamWhereInput= {};

    query.lesson = {}; //exmpty object
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
                            query.lesson = {classId : parseInt(value)};
                            break;    
                    case "teacherId":
                        query.lesson = {
                            teacherId: value,
                        }  
                        break;
                    default:
                        break;    
                }
            }
            
        }
    }

        //ROLE CONDITIONS
  switch (userRole) {
    case "admin":
        break;
    case "teacher":
        query.lesson.teacherId = userId!;
        break; 
    case "student":
        query.lesson.class ={
            students: {
                some: {
                    id: userId!,
                }
            }
        }
        break;  
    case "parent":
        query.lesson.class = {
            students: {
                some: {
                    parentId: userId!,
                }
            }
        };
        break;        
                   
  
    default:
        break;
  }

const [data, count] = await prisma.$transaction([
     prisma.exam.findMany(
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
     prisma.exam.count({
        where: query
     })

]);


    
  return (
    <div className='bg-white flex-1 rounded-md m-4 mt-0 p-4'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block font-semibold text-lg">All Exams</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mx-2">
                <TableSearch/>
                <div className="flex items-center gap-4 self-end">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                    <FaFilter size={16} className="text-gray-500"/>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                    <HiSortAscending size={16} className="text-gray-500"/>
                </button>
                {userRole === "admin" && (
                    <FormModel table="exam" type="create"/>
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

export default ExamListPage