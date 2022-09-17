import 'swiper/css';
import 'swiper/css/pagination';

import { Stack } from '@mui/material';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import swiper1 from '../../assets/swiper1.svg';
import swiper2 from '../../assets/swiper2.svg';
import swiper3 from '../../assets/swiper3.svg';

const swiperList = [swiper1, swiper2, swiper3];

const LoginSwiper = () => {
  return (
    <Stack
      height="100%"
      minWidth="50vh"
      bgcolor="primary.main"
      justifyContent="center"
      alignItems="center"
      sx={{
        display: {
          xs: 'none',
          lg: 'flex',
        },
      }}
    >
      <Swiper
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        {swiperList.map((swiper) => (
          <SwiperSlide key={swiper}>
            <img src={swiper} alt="swiper" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default LoginSwiper;
