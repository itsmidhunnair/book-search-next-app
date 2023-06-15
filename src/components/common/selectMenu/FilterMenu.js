import { filterOptions } from "@constants/filter/options";
import useSelect from "@hooks/selectMenu/useFilter";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdFilterList } from "react-icons/md";

// const Select = ({ handleOpen, open, setSelectedValue, options }) => {
const Select = ({ options }) => {
  const { query } = useRouter();

  const { clearSelected, handleOpen, open, selected, setSelectedValue } =
    useSelect();

  // useEffect(() => {
  //   push({ query: { ...query, filter: selected } });
  // }, [selected]);

  return (
    <>
      <div className="relative flex items-center">
        <button
          onClick={() => clearSelected()}
          className={`mr-3 items-center rounded-md bg-gray-300 px-3 py-2 text-sm ${
            query.filter ? "flex" : "hidden"
          }`}
        >
          {query?.filter &&
            _.find(filterOptions, { value: query?.filter }).text}
          <span>
            <IoMdClose className="ml-2 text-base text-gray-700" />
          </span>
        </button>
        <button
          className="inline-flex items-center rounded-md bg-gray-300 p-2 text-center  font-medium text-black transition duration-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="button"
          onClick={handleOpen}
        >
          <span className="text-xl">
            <MdFilterList />
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-[120%] z-10 w-44 overflow-hidden rounded-lg  border bg-white  shadow-lg transition duration-500">
            <ul className="duration-400 divide-y divide-gray-100 text-sm text-gray-700 transition ">
              {options?.map((option) => (
                <Option
                  key={option.id}
                  option={option}
                  setSelectedValue={setSelectedValue}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Select;

const Option = ({ option, setSelectedValue }) => {
  const { push, query } = useRouter();
  return (
    <>
      <li>
        <button
          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          value={option.value}
          onClick={(e) => {
            setSelectedValue(e);
          }}
        >
          {option.text}
        </button>
      </li>
    </>
  );
};
