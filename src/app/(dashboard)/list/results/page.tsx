import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, getRole } from "@/lib/utils"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { FaFilter } from "react-icons/fa"
import { HiSortAscending } from "react-icons/hi"

type ResultList = {
    id:number;
    title: string;
    studentName: string;
        studentSurname: string;
        teacherName: string;
        teacherSurname: string;
        score: number;
        className: string;
        startTime: Date;
};



const ResultListPage = async ({searchParams} : {searchParams:{[key:string]:string | undefined};}) => {
    const {page, ...queryParams} = searchParams;
    const p = page? parseInt(page) : 1;
    // Get the role by awaiting the getRole function
    const userRole = await getRole(); // Await the role
    // Await the current user ID
    const userId = await currentUserId();

const columns = [
    {
        header:"Title" ,accessor:"title"
    },
    {
        header:"Student", accessor:"student" , className:"hidden md:table-cell"
    },
    {
        header:"Score", accessor:"score" 
    },
    {
        header:"Grade", accessor:"score"
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
    ...((userRole === "admin" || userRole === "teacher") ? [{
        header:"Actions", accessor:"action"
    }] : [])
];

const getGrade = (score: number) => {
    if (score >= 81 && score <= 100) return 'A';
    if (score >= 71 && score <= 80) return 'B';
    if (score >= 61 && score <= 70) return 'C';
    if (score >= 51 && score <= 60) return 'D';
    if (score >= 0 && score <= 50) return 'F';
    return 'N/A'; // For invalid scores
};

const renderRow = (item:ResultList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.title} </td>
            <td className="hidden md:table-cell">{item.studentName + " " + item.studentSurname}</td>
            <td>{item.score}</td>
            <td>{getGrade(item.score)}</td>
            <td className="hidden md:table-cell">{item.teacherName + " " + item.teacherSurname}</td>
            <td className="hidden md:table-cell">{item.className}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
               
           
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                    </Link>
                    {(userRole==="admin" || userRole === "teacher") && (
                        <>
                        <FormModel table="subject" type="update" data={item}/>
                        <FormModel table="subject" type="delete" id={item.id}/>
                        </>
                    )}
                </div>
            </td>

        </tr>

                );

    // URL PARAMS CONDITIONS
    const query : Prisma.ResultWhereInput= {}
    if (queryParams) {
        for(const [key, value] of Object.entries(queryParams)){
            if (value !== undefined && value.trim() !== "") {
                switch(key) {
                    case "search":
                        const searchConditions: Prisma.ResultWhereInput[] = [];
                        
                        // Add text search conditions
                        searchConditions.push(
                            { exam: { title: { contains: value, mode: "insensitive" } } },
                            { assignment: { title: { contains: value, mode: "insensitive" } } },
                            { 
                                student: {
                                    OR: [
                                        { name: { contains: value, mode: "insensitive" } },
                                        { surname: { contains: value, mode: "insensitive" } }
                                    ]
                                }
                            },
                            { 
                                exam: { 
                                    lesson: {
                                        teacher: {
                                            OR: [
                                                { name: { contains: value, mode: "insensitive" } },
                                                { surname: { contains: value, mode: "insensitive" } }
                                            ]
                                        }
                                    }
                                }
                            },
                            { 
                                assignment: { 
                                    lesson: {
                                        teacher: {
                                            OR: [
                                                { name: { contains: value, mode: "insensitive" } },
                                                { surname: { contains: value, mode: "insensitive" } }
                                            ]
                                        }
                                    }
                                }
                            }
                        );

                        // Add numeric score search if value is a number
                        if (!isNaN(Number(value))) {
                            searchConditions.push({ score: { equals: Number(value) } });
                        }

                        // Add date search if value is a valid date
                        const dateValue = new Date(value);
                        if (!isNaN(dateValue.getTime())) {
                            searchConditions.push(
                                { exam: { startTime: { equals: dateValue } } },
                                { assignment: { startDate: { equals: dateValue } } }
                            );
                        }

                        query.OR = searchConditions.filter(Boolean);
                        break;
                    case "studentId":
                        query.studentId = value;
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
            query.OR = [
                {exam: {lesson: {teacherId: userId!}}}, 
                {assignment: {lesson: {teacherId: userId!}}}
            ]
            break;  
        case "student":
            query.studentId = userId!;
            break;
        case "parent":
            query.student = {
                parentId: userId!,
            }         
            break; 
    
        default:
            break;
    }


const [dataRes, count] = await prisma.$transaction([
     prisma.result.findMany(
        {
            where: query,
            include: {
            student: {select: {name: true, surname:true}},
            exam: {
                include: {
                    lesson: {
                        select : {
                        class: {select: {name: true}},
                        teacher: {select: {name: true, surname: true}}
                    }}
                }
            },
            assignment: {
                include: {
                    lesson: {
                        select : {
                        class: {select: {name: true}},
                        teacher: {select: {name: true, surname: true}}
                    }}
                }
            },
        },
        take:ITEM_PER_PAGE,//only ten in each page
        skip: ITEM_PER_PAGE * (p - 1)// skip items in pagination 
    }
    ),
     prisma.result.count({
        where: query
     })

]);

const data = dataRes.map(item=>{
    const assessment = item.exam || item.assignment
    if (!assessment) return null;
    const isExam = "startTime" in assessment;

    return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        score: item.score,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : assessment.startDate,
    }
})

    
  return (
    <div className='bg-white flex-1 rounded-md m-4 mt-0 p-4'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block font-semibold text-lg">All Results</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mx-2">
                <TableSearch/>
                <div className="flex items-center gap-4 self-end">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                    <FaFilter size={16} className="text-gray-500"/>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                    <HiSortAscending size={16} className="text-gray-500"/>
                </button>
                {(userRole==="admin" || userRole === "teacher") && (
                    <FormModel table="result" type="create"/>
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

export default ResultListPage