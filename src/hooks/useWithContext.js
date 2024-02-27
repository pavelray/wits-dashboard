/* eslint-disable react/display-name */

export const useWithContext = (WrappedComponent, Context) => (props) => {
  return (
    <Context.Consumer>
      {(contextValue) => <WrappedComponent {...props} {...contextValue} />}
    </Context.Consumer>
  );
};
export default useWithContext;
