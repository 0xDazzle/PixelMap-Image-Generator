import React, { useState } from "react";

export default function TileCode(props: any) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(props.code)
    setCopied(true);
  }

  return (
    <div className="flex items-center justify-center space-x-4 py-3">
      <div className="flex-shrink-0">
        <p className="text-xs text-gray-700">{props.id}.</p>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{props.code}</p>
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