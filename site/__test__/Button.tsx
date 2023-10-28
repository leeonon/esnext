import { useState } from 'react';

export default function Button() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Nextjs_Vitest</h1>
      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
    </div>
  );
}
