import { useEffect, useMemo, useState } from "react";

const renderCntMap: Record<string, number> = {};

function Comp({ name }: { name: string }) {
  renderCntMap[name] = (renderCntMap[name] || 0) + 1;
  return (
    <div>
      组件「{name}」 Render 次数：{renderCntMap[name]}
    </div>
  );
}

export default function App() {
  const setCnt = useState(0)[1];
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCnt((v) => v + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const comp = useMemo(() => {
    return <Comp name="使用 useMemo 作为 children" />;
  }, []);

  return (
    <div className="App">
      <Comp name="直接作为 children" />
      {comp}
    </div>
  );
}
