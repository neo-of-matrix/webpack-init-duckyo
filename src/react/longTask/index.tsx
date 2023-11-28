function Long() {
  const len = 3000;

  return (
    <ul>
      {Array(len)
        .fill(0)
        .map((_, i) => (
          <li key={i}>{i}</li>
        ))}
    </ul>
  );
}
export default Long;
