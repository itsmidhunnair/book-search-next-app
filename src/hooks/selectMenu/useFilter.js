import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const useSelect = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { push, query } = useRouter();

  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const clearSelected = useCallback(() => {
    handleClose();
    push({ query: { ...query, filter: "" } });
    setSelected(null);
  }, []);

  const setSelectedValue = useCallback(
    (e, value = null) => {
      handleClose();
      if (value) {
        setSelected(value);
      } else {
        push({ query: { ...query, filter: e.target?.value } });
        setSelected(e.target?.value);
      }
    },
    [open]
  );

  return {
    selected,
    open,
    setSelectedValue,
    handleOpen,
    clearSelected,
  };
};

export default useSelect;
