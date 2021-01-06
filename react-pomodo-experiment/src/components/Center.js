import React from "react";

/**
 * Minimal React component that centers all its children
 * @param {*} props
 */
export default function Center(props) {
  return React.createElement("div", { align: "center" }, props.children);
}
