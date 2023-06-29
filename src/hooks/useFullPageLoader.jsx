import { useState } from "react";
import { PageLoader } from "../components/PageLoader";

export const useFullPageLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <PageLoader /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
};
