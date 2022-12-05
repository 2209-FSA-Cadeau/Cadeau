import React from 'react'

function ShoppingSideBar() {
  return (
    <div className="flex flex-col justify-center h-1/2 mt-10 bg-green-400 rounded-md">
      <div className="flex flex-col basis-1/2 justify-evenly items-center">
        <div className="flex flex-col justify-center border-2 border-black w-1/2 h-10 rounded-lg text-center">
            <div>
              Filter1
            </div>
        </div>
        <div className="flex flex-col justify-center border-2 border-black w-1/2 h-10 rounded-lg text-center">
          <div>
            Filter2
          </div>
        </div>
        <div className=" flex flex-col justify-center border-2 border-black w-1/2 h-10 rounded-lg text-center">
          <div>
            Filter3
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ShoppingSideBar