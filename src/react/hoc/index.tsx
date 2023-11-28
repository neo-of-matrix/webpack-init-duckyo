import { useState } from "react";
import type { ChangeEvent } from "react";
function HOCProps(WrappedComponent) {
  const newProps = {};
  return (props) => {
    return <WrappedComponent {...props} {...newProps} />;
  };
}

function HOC(WrappedComponent) {
  const [value, setValue] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const newProps = {
    name: {
      value,
      onChange,
    },
  };
  return (props) => {
    return <WrappedComponent {...props} {...newProps} />;
  };
}

function HOCIF(WrappedComponent) {
  return (props: { isShow: boolean }) => {
    const { isShow } = props;
    if (isShow) {
      return <WrappedComponent {...props} />;
    }
    return <div>暂无数据</div>;
  };
}

function HOCStyle(WrappedComponent) {
  return (props) => {
    return (
      <div style={{ backgroundColor: "#ccc" }}>
        <WrappedComponent {...props} />;
      </div>
    );
  };
}

export { HOC, HOCIF, HOCStyle };
export default HOCProps;