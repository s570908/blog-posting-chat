import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel, Keyboard } from 'swiper';

import './styles/App.styles.css';
import 'swiper/css';
import 'swiper/css/pagination';

function App() {
  return (
    <Swiper
      direction={'vertical'}
      pagination={{ clickable: true }} //
      mousewheel
      keyboard
      modules={[Pagination, Mousewheel, Keyboard]}
      allowTouchMove
      className="main_slider"
      threshold={20}
      speed={1000}
      onActiveIndexChange={(swiper) => {
        console.log(swiper.activeIndex);
      }}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
    </Swiper>
  );
}

export default App;
