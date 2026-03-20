import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Brew Haven</h1>
        <p>Your cozy corner for the finest artisanal coffee</p>
        <Link to="/shop">
          <button className="cta-button">Explore Our Menu</button>
        </Link>
      </section>

      <section className="about">
        <h2>About Brew Haven</h2>
        <p>
          At Brew Haven, we believe that great coffee is more than just a drink—it's an experience.
          Our passionate baristas source the finest beans from sustainable farms around the world,
          expertly roasting them to bring out the richest flavors in every cup.
        </p>
        <p>
          Whether you're starting your day with a bold espresso, enjoying a creamy latte in the afternoon,
          or winding down with a specialty brew, we have something for every coffee lover.
        </p>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Premium Beans</h3>
          <p>Ethically sourced, expertly roasted coffee beans from the best farms globally.</p>
        </div>
        <div className="feature">
          <h3>Expert Baristas</h3>
          <p>Our skilled baristas craft each drink with precision and passion.</p>
        </div>
        <div className="feature">
          <h3>Cozy Atmosphere</h3>
          <p>Relax in our warm, inviting space perfect for work, meetings, or simply enjoying good company.</p>
        </div>
      </section>

      <section className="hours">
        <h2>Visit Us</h2>
        <p>123 Coffee Street, Brew City</p>
        <p>Hours: Mon-Fri 7am-7pm, Sat-Sun 8am-6pm</p>
        <p>Phone: (555) 123-BREW</p>
      </section>
    </div>
  );
};

export default Home;