import React, { useState, useEffect } from "react";

import { generateWebSafeImage } from "../utils/ImageUtils";

export default function TileCode(props: any) {
  const [copied, setCopied] = useState(false);
  const [tilePreview, setTilePreview] = useState("");

  const copyCode = () => {
    navigator.clipboard.writeText(props.code)
    setCopied(true);
  }

  useEffect( () => {
    setTilePreview( generateWebSafeImage(props.code.join(''), 16, 16) );
  }, [props.code]);

  return (
    <div className="flex items-center justify-center space-x-4 py-3">
      <div className="flex-shrink-0">
        <p className="text-xs text-gray-700">{props.id}.</p>
      </div>

      <div className="flex-shrink-0">
      <img className="block w-auto h-auto mx-auto pixel-image" src={tilePreview} alt="Pixelmap" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{props.code.join('')}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
        >
          { copied &&
            <span>Copied!</span>
          }

          { !copied &&
            <span>Copy</span>
          }

        </button>
      </div>
    </div>
  );
}