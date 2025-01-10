"use client";
export default function () {
  return (
    <div className="fixed bottom-4 right-4 ">
      <button
        onClick={() => global?.window.electron.toElectron()}
        className="shadow-xl h-7 w-7 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        E
      </button>
    </div>
  );
}
