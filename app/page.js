"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchDownload() {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
      console.log(data)
    } catch (err) {
      setResult({ error: "Something went wrong. Try again." });
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-200">
        DOWNLOAD <span className="text-violet-700">YOUR VIDEO</span>
      </h1>

      {/* Input + Button */}
      <div className="flex w-full max-w-xl border border-gray-300 border-solid rounded-xl overflow-clip ">
        <input
          type="text"
          placeholder="Paste YouTube / Instagram / Facebook / Pinterest link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow px-4 py-2  border-none outline-none"
        />
        <button
          onClick={fetchDownload}
          disabled={loading}
          className="md:px-6 px-2 py-2 text-xs md:text-[.9rem]  bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Download"}
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <div className="mt-6 w-full max-w-xl bg-[#ffffff0f] shadow-md rounded-2xl text-wrap overflow-clip p-6 text-center">
          {result.error ? (
            <p className="text-red-500 font-semibold">{result.error}</p>
          ) : (
            <>
              {
                result &&
                <video src={result.download_link|| result.hd || result.sd} className="min-h-[16rem] w-full bg-black my-2" controls>

                </video>
              }
              {result.download_link && result.platform !== "YouTube" && (
                <a
                  href={result.download_link}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-block px-6 py-2 mb-3 bg-green-600 text-white rounded-xl hover:bg-green-700 w-full transition"
                >
                  Download
                </a>
              )}

              {result.sd && (
                <a
                  href={result.sd}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="block px-6 py-2 mb-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition w-full"
                >
                  Download SD
                </a>
              )}

              {result.hd && (
                <a
                  href={result.hd}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="block px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition w-full"
                >
                  Download HD
                </a>
              )}


            </>
          )}
        </div>
      )}
    </div>
  );
}
