import React from 'react'
import { useState } from 'react'


const Payment = ({disable, makePayment}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [answerSelectionType,setanswerSelectionType] = useState("5:00PM - 6:00PM")
  const [fee,setfee] = useState(500)

  const Create_Payment = () => {
    makePayment({ slot:answerSelectionType,fee:fee })

    setShowModal(!showModal)
  }
  const styles = {
    popup:{
      backgroundColor: disable ? "#BAD1C2" : "#379237",
      Opacity:disable?0.3:1    
    }
  };

  return (
    <>
      <div className='w-64 flex mx-auto mt-6'>
        <button
          className="py-3 w-56 text-xl text-white bg-green-500 rounded-2xl hover:bg-green-600 active:bg-green-600"
          type="button"
          disabled={disable}
          style={styles.popup}
          onClick={() => setShowModal(true)}
          >
            Activate
          </button>
      </div>
      {showModal ? (
        <>
          <div
            className=" backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="  relative w-2/5 my-10 mx-auto ">
              {/* {/content/} */}
              <div className="border-slate-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                {/* {/header/} */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-black font-semibold">
                    Payment
                  </h3>

                </div>
                {/* {/body/} */}
                <div className="relative p-5 flex-auto">
                  <form className="space-y-10 w-full">
                    <div>
                        <label for="AnswerType" className="block mb-2  text-md font-semibold text-gray-800">Slot</label>
                        <select value={answerSelectionType} name="AnswerType" onChange={e => setanswerSelectionType(e.target.value)} className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto block w-11/12 p-2.5 bg-gray-200 border-gray-800 placeholder-gray-400 text-black">
                            <option value="single">6:00AM - 7:00AM</option>
                            <option value="multiple">7:00AM - 8:00AM</option>
                            <option value="multiple">8:00AM - 9:00AM</option>
                            <option value="multiple">5:00PM - 8:00PM</option>
                        </select>
                    </div>
                    <div>
                      <label for="Course" className="block mb-2 text-sm font-medium text-gray-800">Enrollment fee</label>
                      <input type="text" name="Course" id="text" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-900  text-black" required value={fee} />
                    </div>


                  </form>

                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white bg-red-600 font-bold uppercase rounded px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={Create_Payment}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black opacity-50 fixed inset-0 z-40 "></div>
        </>
      ) : null}
    </>
  );


}

export default Payment