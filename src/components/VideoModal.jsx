import { FaXmark } from "react-icons/fa6";
export const VideoModal = ({ visible, close, trailer }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={() => close()}
    >
      <div>
        <iframe
          width="854"
          height="480"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
        ></iframe>
        <button
          className="icon-button bg-black absolute top-5 right-5"
          onClick={() => close()}
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
};
