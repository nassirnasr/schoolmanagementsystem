const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Announcements</h1>
            <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className=" bg-mySkyLight rounded-md p-4">
        <div className="flex flex-col gap-4 mt-4">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
            <p className="text-sm text-gray-400 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quis sequi accusantium, ullam laborum ea.
            </p>
        </div>
        </div>
        <div className=" bg-myPurpleLight rounded-md p-4 mt-1">
        <div className="flex flex-col gap-4 mt-4">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
            <p className="text-sm text-gray-400 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quis sequi accusantium, ullam laborum ea.
            </p>
        </div>
        </div>
        <div className=" bg-myYellowLight rounded-md p-4 mt-1">
        <div className="flex flex-col gap-4 mt-4">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
            <p className="text-sm text-gray-400 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quis sequi accusantium, ullam laborum ea.
            </p>
        </div>
        </div>
    </div>
  )
}

export default Announcements