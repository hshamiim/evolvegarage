export type Review = {
  name: string;
  rating: number;
  service: string;
  text: string;
  car: string;
  timestamp: string;
};

export const reviews: Review[] = [
  {
    name: 'Neil',
    rating: 5,
    service: 'Full Service',
    text: "I wasn't aware that it either included a pollen filter or on air filter. I was expecting both during a full service, cost me £95 more than expected. Service was good from what I have noticed though, good advice given about the service and full detailed report. I would use again.",
    car: 'Audi A4',
    timestamp: 'about 10 hours ago'
  },
  {
    name: 'Bhavin',
    rating: 5,
    service: 'Battery Replacement',
    text: 'Excellent service and great value. Highly recommend them.',
    car: 'Jaguar I-Pace',
    timestamp: 'about 10 hours ago'
  },
  {
    name: 'Paul',
    rating: 5,
    service: 'Turbo Faults and Replacement',
    text: "Neil was a very knowledgeable mechanic did the job on the drive. Very courteous and pleasant. He did a great job and only took him a few hours. I would recommend him and his garage to my family and friends he is very knowledgeable and likeable.",
    car: 'Peugeot 3008',
    timestamp: 'about 4 hours ago'
  },
];