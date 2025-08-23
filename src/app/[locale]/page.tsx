import Hero from '../../components/Hero';
import FeaturedOn from '../../components/FeaturedOn';
import ReviewsSection from '../../components/ReviewsSection';
import HowItWorks from '../../components/HowItWorks';
import Newsletter from '../../components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedOn />
      <ReviewsSection />
      <HowItWorks />
      <Newsletter />
    </>
  );
}