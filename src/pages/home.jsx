import React from 'react';
import Hero from "../components/Hero/hero";
import Features from "../components/Features/features";
import '../main.css'; // Assurez-vous que c'est nécessaire, sinon importez uniquement les styles nécessaires
import IconChat from '../assets/icon-chat.webp';
import IconMoney from '../assets/icon-money.webp';
import IconSecurity from '../assets/icon-security.webp';

const FEATURES_DATA = [
  {
    picture: IconChat,
    alt: "icon-chat",
    title: "You are our #1 priority",
    description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
  },
  {
    picture: IconMoney,
    alt: "icon-money",
    title: "More savings means higher rates",
    description: "The more you save with us, the higher your interest rate will be!"
  },
  {
    picture: IconSecurity,
    alt: "icon-security",
    title: "Security you can trust",
    description: "We use top of the line encryption to make sure your data and money is always safe."
  }
];

const Home = React.memo(() => {
  return (
    <main>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {FEATURES_DATA.map((feature, index) => (
          <Features
            key={index}
            picture={feature.picture}
            alt={feature.alt}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  );
});

export default Home;