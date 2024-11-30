import React from 'react'
import { Calendar } from 'lucide-react'
import { useState } from 'react';

const AddNew = () => {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  function formatDate(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayOfWeek = daysOfWeek[date.getDay()];

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const year = date.getFullYear();

    return `${dayOfWeek}. ${month}/${day}/${year}`;
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files); 

    if (fileArray.length > 5) {
      alert("You can only select up to 5 images.");
      return;
    }
    setSelectedImages((prevImages) => [...prevImages, ...fileArray]);
  };

  const renderPreviews = () => {
    return selectedImages.map((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgPreview = document.getElementById(`preview-${index}`);
        imgPreview.src = reader.result;
      };
      reader.readAsDataURL(file);

      return (
        <div key={index} className='m-[10px]'>
          <img
            id={`preview-${index}`}
            alt={`preview-${index}`}
            name="images"
            style={{
              maxWidth: "50%",
              maxHeight: "5%",
              objectFit: "cover",
              borderRadius: "10%",
            }}
            className='mx-auto'
          />
        </div>
      );
    });
  };

  const date = new Date();

  return (
    <>
      <form className="mt-40 w-full mb-20 flex justify-center gap-20">
        <div className="w-7/12 max-w-[1080px] flex flex-col  h-[1000px] bg-white shadow-md shadow-black px-16 py-20">
          <div className="w-full flex justify-between text-xl items-center px-4 pb-6 border-b border-slate-500">
            <div className="flex gap-2 text-xl items-center">
              <Calendar size={36} />
              <h1>{formatDate(date)}</h1>
            </div>
            <div>
              <button type="submit" className="italic text-blue-600 opacity-70">
                Save now
              </button>
            </div>
          </div>

          <div>
            <textarea
              name="content"
              className="w-full border-none outline-none p-4 text-xl resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="w-1/5 h-[1000px] flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className='h-10 max-w-[80%] p-2 text-white text-xl bg-blue-600 rounded-lg flex justify-center items-center'
          >
            Choose File
          </label>
          <input
            name='images'
            type="file"
            accept="image/*"
            multiple
            id="file-upload"
            style={{ display: "none" }} // Hide the default file input
            onChange={handleFileChange}
          />

          <div className='mt-[10px] flex flex-wrap'>{renderPreviews()}</div>
        </div>
      </form>
    </>
  );
}

export default AddNew