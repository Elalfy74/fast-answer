import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { BottomNavigationBar } from '.';

const BottomNavigationLayout = () => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setMobile(false);
    }
  }, []);

  return (
    <>
      <Outlet /> {mobile && <BottomNavigationBar />}
    </>
  );
};

export default BottomNavigationLayout;
