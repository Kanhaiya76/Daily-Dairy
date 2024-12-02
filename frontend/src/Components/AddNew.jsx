import React from 'react'
import { Calendar } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addJournal, clearMessage } from '../redux/slices/journalSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddNew = () => {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const navigate = useNavigate();

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
      return;
    }
    setSelectedImages((prevImages) => [...prevImages, ...fileArray]);
  };

  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.journal)
  
  function handleSubmit(e) {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("content", content);
    selectedImages.forEach((image) => {
      formdata.append("images", image);
    });

    dispatch(addJournal(formdata));
  }

  useEffect(() => {
    if (message) {
      toast.success(message);
      setSelectedImages([]);
      setContent("");
      navigate("/journal/entries");
    }
    if (error) {
      toast.error(error);
    }
    dispatch(clearMessage());
  }, [message, error]);

  useEffect(() => {
    // Generate previews for the selected images
    const previews = selectedImages.map((file, index) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then((previewUrls) => {
      setImagePreviews(previewUrls);
    });
  }, [selectedImages]);


  const date = new Date();

  return (
    <>
      <form
        className="mt-40 w-full mb-20 flex justify-center gap-20"
        onSubmit={handleSubmit}
      >
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

          <div className='h-full'>
            <textarea
              name="content"
              className="w-full border-none outline-none p-6 text-xl resize-none h-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="w-1/4 h-[1000px] flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="h-10 max-w-[80%] p-5 text-white text-xl bg-blue-600 rounded-lg flex justify-center items-center hover:cursor-pointer"
          >
            Choose memories to store 
          </label>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple
            id="file-upload"
            style={{ display: "none" }} // Hide the default file input
            onChange={handleFileChange}
            disabled={selectedImages.length >= 5}
          />

          <div className="mt-[10px] flex flex-wrap justify-center">
            {imagePreviews.length > 0 &&
              imagePreviews.map((preview, index) => (
                <div key={index} className="m-[10px]">
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    className="mx-auto h-30 w-40 rounded-lg object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </form>
    </>
  );
}

export default AddNew