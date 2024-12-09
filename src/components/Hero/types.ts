export interface CarouselSlide {
  title: string;
  description: string;
}

export interface CarouselSlideProps extends CarouselSlide {
  image: string;
  index: number;
}

export interface SwipeDirection {
  offset: { x: number };
  velocity: { x: number };
}