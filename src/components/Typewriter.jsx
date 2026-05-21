import { useEffect, useState } from 'react';

export default function Typewriter({
  text,
  speed = 70,
  startDelay = 0,
  className = '',
  cursorColor = '#f43f5e',
}) {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOutput('');
    setDone(false);
    let interval;
    const start = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i++;
        setOutput(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  const finished = done || output === text;

  return (
    <span className={className}>
      {output}
      {finished ? (
        <span
          className="inline-flex ml-1 align-baseline select-none"
          style={{ color: cursorColor }}
        >
          <span className="dot-wave" style={{ animationDelay: '0s' }}>.</span>
          <span className="dot-wave" style={{ animationDelay: '0.18s' }}>.</span>
          <span className="dot-wave" style={{ animationDelay: '0.36s' }}>.</span>
        </span>
      ) : output.length > 0 ? (
        <span
          className="inline-block w-[0.08em] h-[0.85em] ml-2 align-middle cursor-blink select-none"
          style={{ backgroundColor: cursorColor }}
        ></span>
      ) : null}
    </span>
  );
}
