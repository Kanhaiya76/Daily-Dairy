import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { CirclePlus, Eye, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllJournals,
  deleteJournal,
  clearMessage,
} from "../redux/slices/journalSlice";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";

const Entries = () => {
  const date = new Date();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  function formatDate(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayOfWeek = daysOfWeek[date.getDay()];

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const year = date.getFullYear();

    return `${dayOfWeek}. ${month}/${day}/${year}`;
  }

  const { entries, message, error } = useSelector((state) => state.journal);
  const { user } = useSelector((state) => state.user);

  const entriesArray = Array.isArray(entries) ? entries : [];

  const sortedEntriesArray = useMemo(() => {
    return [...entriesArray].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [entriesArray]);

  const filteredEntries = useMemo(() => {
    return sortedEntriesArray.filter((entry) => {
      const createdAt = new Date(entry.createdAt);
      return createdAt >= new Date(startDate) && createdAt <= new Date(endDate);
    });
  }, [sortedEntriesArray, startDate, endDate]);

  function handleDeletePaste(id) {
    dispatch(deleteJournal(id));
  }

  useEffect(() => {
    dispatch(getAllJournals());

    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, []);

  return (
    <div className="w-full mt-40 mb-20 flex justify-center">
      <div className="w-7/12 bg-white flex flex-col min-h-[120vh]">
        <div className="w-full flex flex-col min-h-[25vh] bg-slate-100 px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="text-6xl font-normal">
                <p>{user?.username}</p>
              </div>
              <div className="text-xl text-slate-700">
                <p>Total Entries: {entriesArray.length}</p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-center items-center bg-blue-400 hover:bg-blue-500 py-2 px-2 text-xl font-bold text-white rounded-lg gap-2 w-52 group hover:cursor-pointer"
                onClick={() => navigate("/journal/new")}
              >
                <CirclePlus size={35} />
                <h1>New Entry</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col 2xl:flex-row gap-8 justify-around mt-12">
            <div className="flex items-center gap-8 text-3xl">
              <label
                className="text-slate-700 hover:cursor-pointer"
                htmlFor="startDate"
              >
                FROM:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-black p-4 text-3xl rounded-lg opacity-60 hover:cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-8 text-3xl">
              <label
                className=" text-slate-700 hover:cursor-pointer"
                htmlFor="endDate"
              >
                TO:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-black p-4 text-3xl rounded-lg opacity-60 hover:cursor-pointer"
              />
            </div>
          </div>
          
        </div>

        <div className="w-full flex flex-col px-8 py-12">
          <div className="w-full flex items-center justify-start p-4 border-b border-red-600 text-2xl font-medium text-slate-600 mb-6">
            <div className="w-4/12">
              <p>Date</p>
            </div>

            <div className="w-6/12">
              <p>Entry</p>
            </div>

            <div className="w-2/12 text-center">
              <p>Options</p>
            </div>
          </div>

          <div>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <div
                  key={entry?._id}
                  className="w-full flex items-center justify-start p-4 border-b border-slate-600 text-2xl font-medium text-slate-600 max-h-32 overflow-hidden"
                >
                  <div className="w-4/12">
                    <p>{formatDate(new Date(entry.createdAt))}</p>
                  </div>

                  <div className="w-6/12 text-start line-clamp-2 pr-4">
                    <p>{entry.content}</p>
                  </div>

                  <div className="w-2/12 flex justify-center items-center gap-6">
                    <button className="p-1 rounded-md bg-black text-white border-2 hover:border-gray-500">
                      <NavLink to={`/journal/entries/${entry?._id}`}>
                        <Eye size={32}/>
                      </NavLink>
                    </button>

                    <button
                      className="p-1 rounded-md bg-black text-white border-2 hover:border-gray-500"
                      onClick={() => handleDeletePaste(entry?._id)}
                    >
                      <Trash2 size={32}/>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-4xl font-semibold text-center">
                No Entries Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
