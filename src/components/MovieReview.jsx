import moment from "moment";

export const MovieReview = ({ review }) => {
  return (
    <div className="flex gap-8">
      <div className="w-8 lg:w-16 h-8 lg:h-16 flex-none bg-tmdbDarkBlue rounded-full overflow-hidden">
        <img
          loading="lazy"
          className="w-full h-full object-fill"
          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${review.author}`}
          alt={review.author}
        />
      </div>
      <div className="id-review-content">
        <h2 className="font-bold">{review.author}</h2>
        <p className="text-xs">
          on{" "}
          {moment(review.updated_at ?? review.created_at).format(
            "MMMM DD YYYY, hh:mm a"
          )}
        </p>
        <div
          className="my-4"
          dangerouslySetInnerHTML={{ __html: review.content }}
        ></div>
        {/* <p className="my-4">{review.content}</p> */}
      </div>
    </div>
  );
};
