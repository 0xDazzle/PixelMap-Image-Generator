import React, { useState } from "react";

import ImageUpload from "./ImageUpload";
import GridSelect from "./GridSelect";
import ImageDisplay from "./ImageDisplay";

export default function Home() {
  const [img, setImg] = useState();

  const [{col, row}, setGrid] = useState({
    col: 1,
    row: 1
  });

  const handleImageChange = (src: any) => {
    setImg(src);
  }

  const handleGridSelect = (col: number, row: number) => {
    setGrid({
      col: col,
      row: row
    });
  }

  return (
    <div>
      <main>
        <div className="relative py-12 sm:py-16 border-b border-gray-300">
          <div className="container max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">PixelMap Image Generator</h1>
            <p className="text-gray-700">Convert your images to code that you can upload straight to your PixelMap tiles!</p>
            <div className="my-8">
              <div className="lg:flex lg:space-between space-y-4 lg:space-y-0 lg:space-x-6">
                <ImageUpload changeImage={handleImageChange} />
                <GridSelect changeGrid={handleGridSelect} col={col} row={row} />
              </div>
              
            </div>

            <div className="my-12">
              <ImageDisplay image={img} cols={col} rows={row} />
            </div>
          </div>
        </div>

      </main>

      {/* Footer section */}
      <footer className="py-12 lg:py-24">
        <div className="mx-auto max-w-md px-4 overflow-hidden sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="text-center text-base text-gray-400">
            <a href="https://www.twitter.com/0xDazzle" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition duration-150">A project by OxDazzle</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
