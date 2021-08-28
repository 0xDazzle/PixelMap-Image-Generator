import React, { useState, useEffect } from "react";

import "./css/ImageDisplay.scss";

import Resizer from "../utils/ImageResizer";
import TileCode from "./TileCode";

import { rgbToWebsafeHex, dimensionToPixels } from "../utils/ImageUtils";

export default function ImageDisplay(props: any) {
  const [resizedImage, setResizedImage] = useState<any>();
  const [imageColors, setImageColors] = useState<any>([]);
  const [tileCode, setTileCode] = useState<any>([]);

  function processColours(canvas: any, width: number, height: number): Array<string> {
    let colorArray = [];
    let ctx = canvas.getContext("2d");
    if( !ctx ) return [""];
  
    for( let y = 0; y < height; y++ ) {
      for( let x = 0; x < width; x++ ) {
        let rgb = ctx.getImageData(x,y,1,1).data;
        colorArray.push(rgbToWebsafeHex(rgb[0], rgb[1], rgb[2]));
      }
    }
    
    return colorArray;
  }

  function generateWebSafeImage(width: number, height: number) {
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d');
    if( !ctx ) return;

    ctx.fillStyle = "rgba(255,255,255,255)";
    ctx.fillRect(0, 0, width, height);

    let colorIndex = 0;

    for( let y = 0; y < height; y++ ) {
      for( let x = 0; x < width; x++ ) {
        if( colorIndex < imageColors.length ) {
          ctx.fillStyle = `#${imageColors[colorIndex]}`;
          ctx.fillRect(x, y, 1, 1);
        }

        colorIndex++;
      }
    }

    return canvas.toDataURL(`image/PNG`, 1);
  }

  function processTileCode( colorArray: Array<string>, width: number, height: number) {
    let tileArray = new Array(props.rows * props.cols).fill([]);

    let pixelRowIndex = 0;
    let rowIndex = 0;

    for( let pixelSliceIndex = 0; pixelSliceIndex < colorArray.length; pixelSliceIndex += width ) {
      let pixelSlice = colorArray.slice(pixelSliceIndex, pixelSliceIndex + width);

      for( let i = 0; i < props.cols; i++ ) {
        let index = i + (rowIndex * props.cols);
        let arr = tileArray[index];
        let slice = pixelSlice.slice(i * 16, (i + 1) * 16);

        tileArray[index] = arr.concat(slice);
      }
      
      pixelRowIndex++;

      if( (pixelRowIndex) % (height / props.rows) === 0 ) {
        rowIndex++;
      }
      
    }

    return tileArray;
  }

  useEffect( () => {
    if( props.image === "" ) return;

    const height = dimensionToPixels(props.rows);
    const width = dimensionToPixels(props.cols);

    try {
      Resizer.imageFileResizer(
        props.image,
        width,
        height,
        "PNG",
        100,
        0,
        (rawCanvas: any) => {
          let colors = processColours(rawCanvas, width, height);

          setImageColors(colors);
          setTileCode(processTileCode(colors, width, height));
          setResizedImage(rawCanvas.toDataURL(`image/PNG`, 1));
        },
        "base64",
        width,
        height,
        true
      );
    } catch (err) {
      //console.log(err);
    }
  }, [props.image, props.cols, props.rows] );

  useEffect( () => { 
    const height = dimensionToPixels(props.rows);
    const width = dimensionToPixels(props.cols);

    let websafeImage = generateWebSafeImage(width, height);

    setResizedImage(websafeImage);

  }, [imageColors]);
  
  return (
    <div>
      <div className="grid grid-cols-2 justify-center items-center">
        <div className="relative">
          <div 
            className="absolute inset-0 z-20 grid-background"
            style={{
              backgroundSize: `${100 / props.cols}% ${100 / props.rows}%`,
            }}
          >
          </div>
          <img className="block relative w-full h-auto z-10" src={resizedImage} alt="Pixelmap" />
        </div>
        <div>
          <p className="text-sm text-gray-800 mb-4">Actual size</p>
          <img className="block w-auto h-auto mx-auto" src={resizedImage} alt="Pixelmap" />
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-2xl font-bold">Tile code</h3>

        <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {tileCode.map((tile: Array<string>, tileId: number) => (
            <TileCode key={tileId} id={tileId + 1} code={tile.join('')} />
          ))}
        </div>

      </div>
    </div>
  );
}