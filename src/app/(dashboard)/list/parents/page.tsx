import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUserId, getRole } from "@/lib/utils";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaFilter, FaUserCircle } from "react-icons/fa";
import { HiSortAscending } from "react-icons/hi";

// Add an optional img property for future use
type ParentList = Parent & { students: Student[]; img?: string };

const ParentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // Get the role and current user ID
  const userRole = await getRole();
  const userId = await currentUserId();

  const columns = [
    { header: "Info", accessor: "info" },
    {
      header: "Student Name(s)",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
    ...(userRole === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-myPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.img ? (
          <Image
            src={item.img}
            alt={item.name}
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="md:hidden xl:block w-8 h-8 text-gray-500" />
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => student.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      
      <td>
            <div className="flex items-center gap-2">
                <Link href={`/list/parents/${item.id}`} className="">
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200">
                    <FaEye className="md:hidden xl:block text-gray-500" size={18} />
                </button>
                </Link>
                {userRole==="admin" && (
                <FormModel table="parent" type="delete" id={parseInt(item.id)}/>
                )}
            </div>
        </td>
    </tr>
  );

  // Build query conditions based on URL parameters
  const query: Prisma.ParentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: { students: true },
      take: ITEM_PER_PAGE, // Only ten per page
      skip: ITEM_PER_PAGE * (p - 1), // Skip items for pagination
    }),
    prisma.parent.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white flex-1 rounded-md m-4 mt-0 p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-lg">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mx-2">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                <FaFilter size={16} className="text-gray-500"/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                <HiSortAscending size={16} className="text-gray-500"/>
            </button>
            {userRole === "admin" && <FormModel table="parent" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ParentListPage;
