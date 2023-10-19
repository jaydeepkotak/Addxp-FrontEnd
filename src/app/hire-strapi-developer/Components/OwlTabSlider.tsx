"use client";
import React, { useEffect, useRef, useState } from "react";
var $ = require("jquery");
// if (typeof window !== "undefined") {
//   window.$ = window.jQuery = require("jquery");
// }
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

function OwlTabSlider() {
  const [selecteditem, setSelectedItem] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const handleCurrentClass = (e: any, index: number) => {
    setSelectedItem(index);
  };
  useEffect(() => {
    setTimeout(() => {
      const totalSlidesCount = document.querySelectorAll(
        ".owl-theme.owl-button-slide-1 .item"
      ).length;
      setTotalSlides(totalSlidesCount);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // Initialize the first Owl Carousel
      const firstCarousel = $("#sync1");

      firstCarousel.on("changed.owl.carousel", (event: any) => {
        // event.item is the new selected item
        setSelectedItem(event.item.index);
      });
    }, 1500);
  }, []);
  return (
    <>
      <section className="why-hire-section">
        <div className="container">
          <div className="hire-looking-box">
            <div className="hire-looking-top">
              <h5>What are you looking for?</h5>

              <p>
                Have requirements for something specific or maybe everything? We
                have the best teams of Strapi developers for you and your unique
                business needs.
              </p>
            </div>
            <OwlCarousel
              //   ref={tRef}
              //   key={selecteditem}
              dots={false}
              id="sync2"
              className="owl-theme owl-button-slide-1"
              items={1}
              startPosition={selecteditem}
              animateIn="fadeIn"
              animateOut="fadeOut"
            >
              <div className={`item`} onClick={(e) => handleCurrentClass(e, 0)}>
                <a href="javascript:void(0);" className="tab-owl-button active">
                  Strapi Development
                </a>
              </div>

              <div className={`item`} onClick={(e) => handleCurrentClass(e, 1)}>
                <a href="javascript:void(0);" className="tab-owl-button">
                  Strapi Plugin Development
                </a>
              </div>

              <div
                className={`item `}
                onClick={(e) => handleCurrentClass(e, 2)}
              >
                <a href="javascript:void(0);" className="tab-owl-button">
                  Strapi Upgrade
                </a>
              </div>

              <div
                className={`item `}
                onClick={(e) => handleCurrentClass(e, 3)}
              >
                <a href="javascript:void(0);" className="tab-owl-button">
                  Strapi Migration
                </a>
              </div>

              <div
                className={`item `}
                onClick={(e) => handleCurrentClass(e, 4)}
              >
                <a href="javascript:void(0);" className="tab-owl-button">
                  Strapi Consultation
                </a>
              </div>

              <div
                className={`item `}
                onClick={(e) => handleCurrentClass(e, 5)}
              >
                <a href="javascript:void(0);" className="tab-owl-button">
                  Strapi Support and Maintenance
                </a>
              </div>

              <div
                className={`item `}
                onClick={(e) => handleCurrentClass(e, 6)}
              >
                <a href="javascript:void(0);" className="tab-owl-button">
                  Strapi UI/UX Design
                </a>
              </div>
            </OwlCarousel>

            <div className="hire-looking-desc">
              <OwlCarousel
                id="sync1"
                className="owl-theme hire-looking-slider"
                nav={true}
                loop={false}
                dots={false}
                items={1}
                startPosition={selecteditem}
              >
                <div className="hire-slider">
                  <div className="hire-slider-left">
                    <div className="hire-slider-desc">
                      <h5>Strapi Development</h5>

                      <p>
                        Our expert developers offer enterprise-grade Strapi CMS
                        Development and headless solutions enabling you to
                        streamline content delivery across devices.
                      </p>

                      <a
                        href="strapi-cms-development-service"
                        className="btn-defualt"
                      >
                        Discover
                      </a>
                    </div>
                  </div>

                  <div className="hire-slider-right">
                    <img
                      src="https://www.addxp.com/src/images/looking-slider.jpg"
                      alt="looking-slider"
                    />
                  </div>
                </div>

                <div className="hire-slider">
                  <div className="hire-slider-left">
                    <div className="hire-slider-desc">
                      <h5>Strapi Plugin Development</h5>

                      <p>
                        Get local plugins developed apart from the ones that can
                        be installed from the marketplace and create your very
                        own plugins.
                      </p>

                      <a
                        href="strapi-plugin-development-service"
                        className="btn-defualt"
                      >
                        Discover
                      </a>
                    </div>
                  </div>

                  <div className="hire-slider-right">
                    <img
                      src="https://www.addxp.com/src/images/strapi-plugin-devlopment-slide.png"
                      alt="blog-img-1"
                    />
                  </div>
                </div>

                <div className="hire-slider">
                  <div className="hire-slider-left">
                    <div className="hire-slider-desc">
                      <h5>Strapi Upgrade</h5>

                      <p>
                        We are the experts when it comes to upgradation. Keep
                        your website fresh and latest by upgrading Strapi.
                      </p>

                      <a href="strapi-upgrade-service" className="btn-defualt">
                        Discover
                      </a>
                    </div>
                  </div>

                  <div className="hire-slider-right">
                    <img
                      src="https://www.addxp.com/src/images/strapi-upgrade-slide.png"
                      alt="strapi-upgrade-slide"
                    />
                  </div>
                </div>

                <div className="hire-slider">
                  <div className="hire-slider-left">
                    <div className="hire-slider-desc">
                      <h5>Strapi Migration</h5>

                      <p>
                        A seamless migration is necessary which is why we ensure
                        that your website is migrated completely with
                        perfection.
                      </p>

                      <a
                        href="strapi-migration-service"
                        className="btn-defualt"
                      >
                        Discover
                      </a>
                    </div>
                  </div>

                  <div className="hire-slider-right">
                    <img
                      src="https://www.addxp.com/src/images/strapi-migration-slide.png"
                      alt="strapi-migration-slide"
                    />
                  </div>
                </div>

                <div className="hire-slider">
                  <div className="hire-slider-left">
                    <div className="hire-slider-desc">
                      <h5>Strapi Consultation</h5>

                      <p>
                        Get the best consultation when it comes to Strapi for
                        any products or services related to Strapi for your
                        business.
                      </p>

                      <a href="strapi-cms-services" className="btn-defualt">
                        Discover
                      </a>
                    </div>
                  </div>

                  <div className="hire-slider-right">
                    <img
                      src="https://www.addxp.com/src/images/strapi-consultation-slide.png"
                      alt="strapi-consultation-slide"
                    />
                  </div>
                </div>

                <div className="hire-slider">
                  <div className="hire-slider-left">
                    <div className="hire-slider-desc">
                      <h5>Strapi Support and Maintenance</h5>

                      <p>
                        We help you reduce the down-time by providing Support
                        and Maintenance to ensure round-the-clock assistance.
                      </p>

                      <a href="strapi-cms-services" className="btn-defualt">
                        Discover
                      </a>
                    </div>
                  </div>

                  <div className="hire-slider-right">
                    <img
                      src="https://www.addxp.com/src/images/strapi-support-and-maintenance-slide.png"
                      alt="strapi-support-and-maintenance-slide"
                    />
                  </div>
                </div>

                <div className="hire-slider">
                  <div className="hire-slider-left">
                    <div className="hire-slider-desc">
                      <h5>Strapi UI/UX Design</h5>

                      <p>
                        We offer designs that inspire. Bring your websites and
                        apps to life with our intuitive UI/UX design solutions
                        with Strapi.
                      </p>

                      <a
                        href="strapi-ui-design-service"
                        className="btn-defualt"
                      >
                        Discover
                      </a>
                    </div>
                  </div>

                  <div className="hire-slider-right">
                    <img
                      src="https://www.addxp.com/src/images/strapi-ui-ux-design-slide.png"
                      alt="strapi-ui-ux-design-slide"
                    />
                  </div>
                </div>
              </OwlCarousel>

              <div className="slider-counter">
                {selecteditem + 1}/{totalSlides}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OwlTabSlider;
