import { Link, Outlet } from "react-router-dom";

export default function () {
  return (
    <div>
      <div>
        <Link to={"memoFn"}>memoFn</Link>
      </div>
      <div>
        <Link to={"memoFnComponent"}>memoFnComponent</Link>
      </div>
      <Outlet />
    </div>
  );
}
