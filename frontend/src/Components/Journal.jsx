import React from "react";
import { Link } from "react-router-dom";
import { NotebookPen, List } from "lucide-react";


const Journal = () => {
  return (
    <>
      <div className="w-full mt-40 relative mb-40">
        <div className="w-6/12 max-w-[1080px] flex mx-auto h-[1000px]">
          <div className="bg-gradient-to-r from-[#525960] to-[rgb(54,60,66)] w-1/12 rounded-l-xl"></div>
          <div className="bg-gradient-to-r from-[rgb(249,109,99)] to-[#fb392b] w-11/12 rounded-r-xl">
            <div className="w-9/12 bg-white h-1/4  rounded-xl mx-auto mt-[30%] flex flex-col justify-center items-center">
              <div className="w-full h-[60%] border-b border-black flex justify-center items-center overflow-hidden">
                <h1 className="text-5xl text-center">Zeeshan Afzal Khan</h1>
              </div>
              <div className="w-full flex h-[40%] hover:cursor-pointer">
                <Link className=" w-1/2 flex justify-center items-center border-r border-black text-xl gap-1" to='/journal/new'>
                    <NotebookPen />
                    <span>New Entry</span>
                </Link>
                <Link className="w-1/2 flex justify-center items-center border-f border-black text-xl gap-1" to='/journal/entries'>
                  <List />
                  <span>Entries</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Journal;
