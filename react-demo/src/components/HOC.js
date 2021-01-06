/**
 * Higher-Order Component
 * https://reactjs.org/docs/higher-order-components.html
 * Concretely, a higher-order component is a function that takes a
 * component and returns a new component.
 *
 * The function implements a common logic to be reused on a different
 * component. In the following example withLoading takes a component
 * and returns a component with attribute isLoading, if isLoading is
 * true, a place-holder is shown, otherwise the wrapped component.
 */

import React from "react";
import { wait } from "../utils";

/**
 * HOC function to enhance an existing component with CSS style.
 * @param {*} Component
 * @return {*} A function that takes a parameter withStyle={styledObj},
 * the rest parameters are passed down to the wrapped component.
 *
 * Example: adding border to existing component
 * const AppWithStyle = withStyle(App);
 * const styleObj = { borderStyle: "dotted", padding: 20 };
 *
 * ReactDOM.render(
 *    <React.StrictMode>
 *      <AppWithStyle startValue={15} withStyle={styleObj} />
 *    <React.StrictMode>
 * );
 */
export const withStyle = (Component) => {
  // { withStyle: styleObj, ...props } uses the rest operator to
  // decompose the input parameter object into value of "withStyle"
  // and the rest. You can also do this in 2 steps in which the return
  // function takes a single object as parameter and then decomposes
  // it in the function body. We do as follows since it is simple:
  return ({ withStyle: styleObj, ...props }) => {
    return (
      <div style={styleObj}>
        <Component {...props} />
      </div>
    );
  };
};

/**
 * A component for normal List of { id: <id>, text: <value> }
 * @param {*} props
 */
const List = (props) => {
  const { items } = props;
  if (!items) return null;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

/**
 * Higher Order Component implements a reusable logic on
 * existing components: it wraps a component to create a
 * new component with attribute "isLoading" to display a
 * loading icon if isLoading=true or the component itself
 * otherwise.
 * The HOC does not set the value of "isLoading", it only
 * specify the logic to be used by another component.
 * @param {*} Component
 */
function withLoading(Component) {
  return function componentWithLoadingPlaceholder({
    isLoading = false,
    ...props
  }) {
    return isLoading ? (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    ) : (
      <Component {...props} />
    );
  };
}

/**
 * The resulting component created by HOC
 */
const ListWithLoadingPlaceholder = withLoading(List);

/**
 * A example component that uses ListWithLoadingPlaceholder
 * (and sets the isLoading attribute)
 */
export default class ListLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    // simulate fetching data
    console.log("Data fetched");
    wait(5000).then(() => {
      this.setState({
        isLoading: false,
        items: [
          { id: 1, text: "first" },
          { id: 2, text: "second" },
          { id: 3, text: "third" },
          { id: 4, text: "fourth" }
        ]
      });
    });
  }

  render() {
    return (
      <ListWithLoadingPlaceholder
        isLoading={this.state.isLoading}
        items={this.state.items}
      />
    );
  }
}
