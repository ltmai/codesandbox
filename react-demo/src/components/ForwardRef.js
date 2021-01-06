import React from "react";

/**
 * https://reactjs.org/docs/refs-and-the-dom.html
 *
 * Ref forwarding is an opt-in feature that lets some components take a
 * ref they receive, and pass it further down (in other words, “forward”
 * it) to a child.
 * In the following example FancyButton uses React.forwardRef to obtain
 * the ref passed to it, and then forward it to the DOM button that it
 * renders. This way, components using <FancyButton> can get a ref to the
 * underlying button DOM node and access it if necessary—just like if
 * they used a DOM button directly.
 *
 * React.forwardRef accepts a render function that receives props and ref
 * parameters and returns a React node:
 *    React.forwardRef((props, ref) => {
 *      return {React node};
 *    })
 */
const createFancyButton = (label) => {
  const ref = React.createRef();

  const FancyButton = React.forwardRef((props, ref) => (
    // forward the ref to the child button, tell it to make
    // ref as a reference to the corresponding DOM element
    <button ref={ref} className="fancy-button" {...props}>
      {props.children}
    </button>
  ));

  // this event handler is just an simple example of accessing
  // directly DOM element via the forwarded reference.
  const clickHandler = () => {
    ref.current.innerHTML = ref.current.innerHTML.toUpperCase();
  };

  return (
    <FancyButton ref={ref} onClick={clickHandler}>
      {label}
    </FancyButton>
  );
};

export default createFancyButton;
