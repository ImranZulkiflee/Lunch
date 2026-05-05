import React, { useEffect, useState } from 'react';

export default function Toast({ message }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);
  return <div className={`toast ${visible ? 'toast--show' : ''}`}>{message}</div>;
}
