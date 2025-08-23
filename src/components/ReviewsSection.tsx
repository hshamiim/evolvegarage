'use client';

import { useTranslations } from 'next-intl';
import { reviews } from '../data/reviews';
import ReviewCard from './ReviewCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ReviewsSection() {
  const t = useTranslations('Reviews');

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Add horizontal padding to this container to make space for the arrows */}
        <div className="mt-12 relative px-5">
          <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="h-auto">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style jsx global>{`
        /* --- UPDATED ARROW STYLES --- */
        .swiper-button-next,
        .swiper-button-prev {
          color: #dc2626; /* red-600 */
          top: 50%;
          transform: translateY(-50%) scale(0.8); /* Adjust vertical position and size */
          transition: transform 0.2s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
            transform: translateY(-50%) scale(1);
        }
        /* Position arrows outside the container */
        .swiper-button-prev {
          left: 0px;
        }
        .swiper-button-next {
          right: 0px;
        }
      `}</style>
    </section>
  );
}