import React from "react";
import Slider from "react-slick";

const OnboardingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const slides = [
  {
    title: "Track Every Expense",
    description:
      "Easily record daily expenses and income in one secure place.",
    gradient: "linear-gradient(135deg, #2563eb, #38bdf8)"
  },
  {
    title: "Visualize Your Spending",
    description:
      "Beautiful charts help you understand where your money goes.",
    gradient: "linear-gradient(135deg, #7c3aed, #ec4899)"
  },
  {
    title: "Build Better Habits",
    description:
      "Analyze patterns and make smarter financial decisions.",
    gradient: "linear-gradient(135deg, #059669, #34d399)"
  }
];


  return (
    <div className="card carousel-card">
      <Slider {...settings}>
        {slides.map((s, index) => (
  <div key={index}>
    <div
      className="onboard-slide"
      style={{ background: s.gradient }}
    >
      <h3>{s.title}</h3>
      <p>{s.description}</p>
    </div>
  </div>
))}

      </Slider>
    </div>
  );
};

export default OnboardingCarousel;
