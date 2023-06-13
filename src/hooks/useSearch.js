import { Query } from "mongoose";
import { useRouter } from "next/router";

const useSearch = () => {
  const router = useRouter();
  const submitSearch = async (e) => {
    console.log();
    router.push({ query: { search: e.target.search.value, page: 1 } });
    e.preventDefault();
    console.log(e.target.search.value);
  };

  return { submitSearch };
};

export default useSearch;
