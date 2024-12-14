export default function ErrorMessage({ message, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center dark:bg-zinc-800 dark:text-light">
        <h2 className="text-xl font-bold text-[#588865] mb-4">Oops!</h2>
        <p className="text-gray-700">
          {message || "Something went wrong. Please try again!"}
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-[#588865] text-white rounded-md hover:bg-[#466c52] transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
