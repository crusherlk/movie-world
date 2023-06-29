import { ThreeDots } from "react-loader-spinner";

export const PageLoader = () => {
  return (
    <div className="loading-wrapper fixed w-full h-full top-0 left-0">
      <div className="flex w-full h-full items-center justify-center">
        {/* <Bars
          height="50"
          width="50"
          color="#fcfcff"
          ariaLabel="bars-loading"
          visible={true}
        /> */}
        <ThreeDots
          height="50"
          width="50"
          radius="9"
          color="rgb(1 180 228 / 1)"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};
