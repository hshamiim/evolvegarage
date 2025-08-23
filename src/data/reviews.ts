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
    name: 'Luke Tebbutt',
    rating: 5,
    service: 'Clutch Replacement',
    text: `Had a great experience with evolve! Went in for a clutch replacement. Managed to fit me in on short notice and work was carried out to a very high standard. The owner was professional and highly knowledgeable. Walked me through every step of the process and provided video proof of the whole repair which gave me good piece of mind. The price I paid was the lowest amongst all the garages I received a quote from and I will definitely be going there again for any servicing or repairs I might need.`,
    car: '',
    timestamp: '3 months ago'
  },
  {
    name: 'danyal afzal',
    rating: 5,
    service: '',
    text: `Outstanding Service and Skilled Mechanics!\nAfter visiting three other garages that failed to diagnose the issue and seemed more interested in taking my money, I finally found this garage—and I couldn’t be more grateful. Amin and Ahmed quickly identified the problem and explained everything clearly. They genuinely care about their customers and take pride in delivering top-quality work. They went the extra mile to ensure my car was properly fixed, and their pricing is refreshingly fair and reasonable. I highly recommend this garage to anyone looking for honest, reliable service, and I’ll definitely be coming back for any future work.`,
    car: '',
    timestamp: '4 months ago'
  },
  {
    name: 'Karl S',
    rating: 5,
    service: 'Clutch Replacement',
    text: `Had my clutch replacement by evolve garage. Great service from start to finish and the staff are very polite and helpful. Kept me updated with videos showing the process and cheaper than any other garage I have used. Definitely will be returning as and when my car needs repairs.`,
    car: '',
    timestamp: '2 months ago'
  },
  {
    name: 'lydia',
    rating: 5,
    service: '',
    text: `Always a great experience with Evolve Garage.\nIt’s become my go to place because I genuinely trust them… not just for the quality of their work, but for how they treat their customers. The owner goes above and beyond every time, always taking the time to explain things clearly and even providing detailed videos so you know exactly what’s going on with your car.\nYou can tell they care and that honesty and transparency is rare to find. If you’re looking for a garage that really knows their stuff and puts customers first, I honestly couldn’t recommend Evolve enough.\nThank youu`,
    car: '',
    timestamp: '3 months ago'
  },
  {
    name: 'Zishan Ibrahim',
    rating: 5,
    service: '',
    text: `Speedy Save for a Fuel Faux Pas!\nI honestly couldn't be more impressed with Evolve Garage who came out to help me today. I had that sinking feeling after realising I'd put the wrong fuel in my car, and I was dreading a long wait.\nHowever, I called them up and two mechanics were with me in under 20 minutes – absolutely brilliant response time! Even better, they had the issue completely sorted and my car running perfectly again within an hour of arriving.\nThe mechanics were professional, clearly knew their stuff, and made a really stressful situation incredibly easy. I'd highly recommend Evolve Garage to anyone in a pinch; their speed and efficiency were a lifesaver!`,
    car: '',
    timestamp: '1 month ago'
  },
  {
    name: 'David',
    rating: 5,
    service: '',
    text: `My car was making a loud scraping sound and I went here after a previous garage failed to fix the problem. This garage was super professional and highly competent - got my car in the same week and found and fixed the problem immediately. Even drove with me to show it was fixed. Chill guy as well. Will be going here from now on`,
    car: '',
    timestamp: '2 months ago'
  },
  {
    name: 'Moammed Hassan',
    rating: 5,
    service: 'MOT & Full Service',
    text: `I had got my MOT and full service done, the booking process was straightforward with no waiting around, the owner knew what he was talking about and gave excellent customer service.\nI had queried some stuff on the MOT advisories, he explained them in good detail and gave price ranges for how much it'll cost to replace / repair.\nI will look to come here in the future.`,
    car: '',
    timestamp: '4 months ago'
  },
];