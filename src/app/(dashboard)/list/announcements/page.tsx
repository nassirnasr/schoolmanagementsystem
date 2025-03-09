import FormModel from "@/components/FormModel"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, getRole } from "@/lib/utils"
import { Announcement, Class, Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { FaFilter } from "react-icons/fa"
import { HiSortAscending } from "react-icons/hi"

type AnnouncementList = Announcement & { class: Class };

const AnnouncementListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined }; }) => {
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    // Get the role by awaiting the getRole function
    const userRole = await getRole(); // Await the role
    // Await the current user ID
    const userId = await currentUserId();

    const columns = [
        {
            header: "Title", accessor: "title"
        },
        {
            header: "Class", accessor: "class"
        },
        {
            header: "Date", accessor: "date", className: "hidden md:table-cell"
        },
        ...(userRole === "admin" ? [{
            header: "Actions", accessor: "action"
        }] : [])
    ];

    const renderRow = (item: AnnouncementList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td>{item.class ? item.class.name : "All"}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.date)}</td>
            <td>
                <div className="flex items-center gap-2">
                    {userRole === "admin" && (
                        <Link href={`/dashboard/list/teachers/${item.id}`} className="">
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-mySky">
                                <Image src="/view.png" alt="" width={16} height={16} />
                            </button>
                        </Link>
                    )}
                    {userRole === "admin" && (
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-myPurple">
                            <Image src="/delete.png" alt="" width={16} height={16} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );

    // URL PARAMS CONDITIONS
    const query: Prisma.AnnouncementWhereInput = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.title = { contains: value, mode: "insensitive" };
                        break;
                    default:
                        break;
                }
            }
        }
    }

    
    //ROLE CONDITIONS
const roleConditions = {
    teacher: {lessons: {some: {teacherId: userId}}},
    student: {students: {some: {id : userId}}},
    parent: {students: {some: {parentId: userId}}},
};

query.OR = [{classId: null}, {
    class: roleConditions[userRole as keyof typeof roleConditions] || {},
}
]


    const [data, count] = await prisma.$transaction([
        prisma.announcement.findMany({
            where: query,
            include: {
                class: true
            },
            take: ITEM_PER_PAGE, // only ten in each page
            skip: ITEM_PER_PAGE * (p - 1) // skip items in pagination 
        }),
        prisma.announcement.count({
            where: query
        })
    ]);

    return (
        <div className='bg-white flex-1 rounded-md m-4 mt-0 p-4'>
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block font-semibold text-lg">All Announcements</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mx-2">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                        <FaFilter size={16} className="text-gray-500"/>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                        <HiSortAscending size={16} className="text-gray-500"/>
                        </button>
                        {userRole === "admin" && (
                            <FormModel table="announcement" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    );
}

export default AnnouncementListPage;