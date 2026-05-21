import Hero from './Hero';
import Projects from './Projects';
import Vacancies from './Vacancies';
import Offerings from './Offerings';
import { useSlide } from '../../contexts/SlideContext';

const slidePages = [Projects, Vacancies, Offerings];

export default function Home() {
  const { slideIndex } = useSlide();
  const SlidePage = slidePages[slideIndex] ?? Projects;

  return (
    <>
      <Hero />
      <div key={slideIndex} className="w-full flex flex-col items-center animate-slide-in">
        <SlidePage />
      </div>
    </>
  );
}
