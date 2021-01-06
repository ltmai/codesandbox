import { useState, useEffect } from "react";

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);

  //console.log("inside useMousePosition");

  useEffect(() => {
    console.log("useMousePosition.useEffect");

    function handleMousePosition(e) {
      setPosition({
        x: e.pageX,
        y: e.pageY
      });
    }

    setInitialized(true);

    document.addEventListener("mousemove", handleMousePosition);

    return () => {
      console.log("removeEventListener");
      document.removeEventListener("mousemove", handleMousePosition);
    };
  }, [initialized]);

  return position;
}

export default useMousePosition;
