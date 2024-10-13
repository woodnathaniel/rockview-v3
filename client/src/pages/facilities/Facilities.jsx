import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../../components/headerNav/Header';
import '../facilities/facilities.css';
import Footer from '../../components/footer/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Facilities = () => {
  const serviceRefs = useRef([]);
  const headerTextRef = useRef(null);

  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.5, 1],
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, observerOptions);

    const { current: serviceElement } = headerTextRef;
    if (serviceElement) {
      observer.observe(serviceElement);
    }

    return () => {
      if (serviceElement) {
        observer.unobserve(serviceElement);
      }
    };
  }, []);

  useEffect(() => {
    // Header Text Animation
    // gsap.fromTo(
    //   headerTextRef.current,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: headerTextRef.current,
    //       start: 'top 80%', // Trigger when the top of the element reaches 80% of the viewport height
    //       toggleActions: 'play none none none',
    //     },
    //   }
    // );

    // Facilities pictures animations
    serviceRefs.current.forEach((service, index) => {
      gsap.fromTo(
        service,
        { opacity: 0, scale: 0.9, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2, // Small stagger for each item
          scrollTrigger: {
            trigger: service,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Clean up the scroll triggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
      <section className="facilities__header">
        <Header imgUrl="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6275.JPG?alt=media&token=d83f114a-69d4-459b-a1bf-ffb5819f872b" />
      </section>

      {/* Facilities header text section */}
      <section className="facilities__header-text facilityText__animation" ref={headerTextRef}>
        <h1>FACILITIES</h1>
        <p>
          We want your stay at our lush hotel to be truly unforgettable. That is why we give special attention to all of your needs so
          <br />
          that we can ensure an experience quite unique. Rockview offers the perfect setting with stunning views for leisure
          <br />
          and Our facilities will help you enjoy the best of all.
        </p>
      </section>

      {/* Facilities Pictures Section */}
      <section className="facilities__pic-section">
        <div className="facility__pic-miniMart facility__pic-responsive" ref={el => (serviceRefs.current[0] = el)}></div>
        <div className="facility__pic-conference facility__pic-responsive" ref={el => (serviceRefs.current[1] = el)}></div>
        <div className="facility__pic-indoorGames facility__pic-responsive" ref={el => (serviceRefs.current[2] = el)}></div>
        <div className="facility__pic-restaurant facility__pic-responsive" ref={el => (serviceRefs.current[3] = el)}></div>
      </section>

      <Footer />
    </div>
  );
};

export default Facilities;