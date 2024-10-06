import { useEffect, useRef } from "react";
import useModalStore from "../Stores/useModalStore";
import Connections from "./Connections.modals";

export default function AllModalsContainer() {
  const closeAllModals = useModalStore((s) => s.closeAllModals);
  const allmodalContainerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        allmodalContainerRef.current &&
        !allmodalContainerRef.current.contains(event.target)
      ) {
        closeAllModals();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAllModals]);

  return (
    <div ref={allmodalContainerRef}>
      <Connections />
    </div>
  );
}
