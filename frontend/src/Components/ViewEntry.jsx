import React from 'react'
import { Calendar, CircleChevronLeft } from "lucide-react";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getOneJournal, deleteJournal, clearMessage } from '../redux/slices/journalSlice';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  function formatDate(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayOfWeek = daysOfWeek[date.getDay()];

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const year = date.getFullYear();

    return `${dayOfWeek}. ${month}/${day}/${year}`;
  }


  const { entry = [], message, error, loading } = useSelector((state) => state.journal);

  function handleDeletePaste(id) {
    dispatch(deleteJournal(id));
  }

   useEffect(() => {
     dispatch(getOneJournal(id));

     if (message) {
       toast.success(message);
       dispatch(clearMessage());
     }

     if (error) {
       toast.error(error);
       dispatch(clearMessage());
     }
   }, [dispatch, id, message, error]);


   if (loading || !entry) {
     return (
       <div className="flex justify-center items-center h-screen">
         <p className="text-xl text-gray-600">Loading...</p>
       </div>
     );
   }


  return (
    <>
      <div className="mt-40 w-full mb-20 flex justify-center gap-20">
        <div className="w-7/12 max-w-[1080px] flex flex-col  h-[1000px] bg-white shadow-md shadow-black px-16 py-20">
          <div className="w-full flex justify-between text-xl items-center px-4 pb-6 border-b border-slate-500">
            <div className="flex gap-2 text-xl items-center">
              <Calendar size={36} />
              <h1>{formatDate(new Date(entry?.createdAt))}</h1>
            </div>

            <div>
              <CircleChevronLeft
                size={36}
                onClick={() => navigate("/journal/entries")}
                className="hover:cursor-pointer"
              />
            </div>
          </div>

          <div className="h-full overflow-auto">
            <p className="w-full p-6 text-xl h-full">{entry?.content}</p>
          </div>
        </div>

        <div className="w-1/4 h-[1000px] flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="h-10 max-w-[80%] p-5 text-white text-xl bg-blue-600 rounded-lg flex justify-center items-center hover:cursor-pointer"
          >
            Memories
          </label>

          <div className="mt-[10px] flex flex-wrap justify-center">
            {entry.images?.length > 0 &&
              entry.images?.map((image, index) => (
                <div key={index} className="m-[10px]">
                  <img
                    src={image}
                    alt="image"
                    className="mx-auto h-30 w-40 rounded-lg object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewEntry