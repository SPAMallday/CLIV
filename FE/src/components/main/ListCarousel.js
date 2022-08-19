import React from 'react';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Stack,
  styled,
} from '@mui/material';

import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ListCarousel.css';
import { Link } from 'react-router-dom';

const swiperProps = {
  deadline: {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: { dynamicBullets: true },
    modules: [Autoplay, EffectCoverflow, Pagination, Navigation],
    spaceBetween: 10,
    slidesPerView: 2.101,
    navigation: true,
    effect: 'coverflow',
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 100,
      depth: 300,
      modifier: 1,
      slideShadows: true,
    },
  },
  start: {},
  recommand: {},
};

export default function ListCarousel({ value, type }) {
  const property = swiperProps[type];
  return (
    <Box sx={{ mt: 3 }}>
      <Swiper {...property}>
        {value &&
          value.map((cl) => (
            <SwiperSlide>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  my: 1,
                }}
                component={Link}
                to={`/class/detail/${cl.classId}`}
              >
                <CardMedia
                  alt="classThumbnail"
                  component="img"
                  sx={{
                    height: 'auto',
                    // pt: '56.25%', // 16:9
                  }}
                  image={cl.classImg}
                />
                <CardActions>
                  <Stack sx={{ width: '100%' }}>
                    <Typography
                      fontSize={'0.7rem'}
                      fontWeight={700}
                      color="gray"
                      noWrap
                    >
                      [{cl.category}] {cl.teacherNickname}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      noWrap
                    >
                      {cl.className}
                    </Typography>
                  </Stack>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}
