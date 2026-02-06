import { useEffect, useState } from 'react';
import CarouselImg1 from '../../assets/images/carousel_1.jpg';
import CarouselImg2 from '../../assets/images/carousel_2.jpg';
import CarouselImg3 from '../../assets/images/carousel_3.jpg';
import CarouselImg4 from '../../assets/images/carousel_4.jpg';
import CarouselImg5 from '../../assets/images/carousel_5.jpg';
import '../../styles/Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: CarouselImg1,
      title: "Penchalakona Temple",
    },
    {
      id: 2,
      image: CarouselImg2,
      title: "Pennar Sangam Barrage",
    },
    {
      id: 3,
      image: CarouselImg3,
      title: "Penchalakona Waterfalls",
    },
    {
      id: 4,
      image: CarouselImg4,
      title: "Talpagiri Temple",
    },
    {
      id: 5,
      image: CarouselImg5,
      title: "Kandaleru River",
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <section className="carousel-container">
      {/* Slides Background */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="carousel-overlay"></div>

      {/* Content */}
      <div className="carousel-content">
        <span className='name-logo'>NELLORIEN</span>
        
        {/* Key prop triggers animation restart on change */}
        <h2 key={currentSlide}>{slides[currentSlide].title}</h2>
      </div>

      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
