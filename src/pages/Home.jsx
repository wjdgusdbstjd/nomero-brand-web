import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  "/images/nomero-brand-main.png",
  "/images/nomero-brand-main-2.png",
  "/images/nomero-brand-main-3.png",
  "/images/nomero-brand-main-4.png",
  "/images/nomero-brand-main-5.png",
  "/images/nomero-brand-main-6.png"
];

const bestSellers = [
  {
    id: "whole-grain-suede",
    line: "MEAL LINE",
    name: "Whole Grain Suede",
    price: "₩ 6,500",
    image: "/images/products/product-1.png",
  },
  {
    id: "fiber-cube",
    line: "DIGESTIBLE LINE",
    name: "Fiber Cube",
    price: "₩ 5,580",
    image: "/images/products/product-2.png",
  },
  {
    id: "spicy-amber",
    line: "SNACK BOOSTER LINE",
    name: "Spicy Amber",
    price: "₩ 5,700",
    image: "/images/products/product-3.png",
  },
  {
    id: "protein-slab",
    line: "BODY HEALTHY LINE",
    name: "Protein Slab",
    price: "₩ 8,890",
    image: "/images/products/product-4.png",
  },
];


const packageImages = [
  "/images/goods/package-1.png",
  "/images/goods/package-2.png",
  "/images/goods/package-3.png"
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomStarted, setZoomStarted] = useState(false);

  // 첫 번째 이미지 슬로우 줌 시작
  useEffect(() => {
    let secondFrame;

    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setZoomStarted(true);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) {
        cancelAnimationFrame(secondFrame);
      }
    };
  }, []);

  // 메인 이미지 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2900);

    return () => clearInterval(timer);
  }, []);

  const [packageIndex, setPackageIndex] = useState(0);



  // ===================================
  // PACKAGE IMAGE AUTO SLIDER
  // ===================================

  useEffect(() => {
    const timer = setInterval(() => {
      setPackageIndex((prev) => (prev + 1) % packageImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  

  useEffect(() => {
    const ctx = gsap.context(() => {
    
      // HERO - 첫 진입 시 중앙에서 양옆으로 마스크 리빌
gsap.fromTo(
  ".hero-slider",
  {
    clipPath: "inset(0 50% 0 50%)",
  },
  {
    clipPath: "inset(0 0% 0 0%)",
    duration: 1.5,
    ease: "power3.inOut",
    delay: 1.4,
  }
);
      
      
    gsap.from(".brand-message .brand-line", {
      y: 45,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".brand-message",
        start: "top 75%",
        toggleActions: "restart none none reverse",
      },
    });

    gsap.from(".brand-message p", {
      y: 25,
      opacity: 0,
      duration: 1,
      delay: 0.35,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".brand-message",
        start: "top 75%",
        toggleActions: "restart none none reverse",
      },
      
    });

// HOW WE CHOOSE - 제목 리빌 → 설명 텍스트 등장
const howTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".how-we-choose",
    start: "top 75%",
    toggleActions: "restart none none reverse",
  },
});

// 1. EAT → LIFE → EARTH 연속적인 가로 리빌
howTimeline.fromTo(
  ".how-item h3",
  {
    clipPath: "inset(0 100% 0 0)",
  },
  {
    clipPath: "inset(0 0% 0 0)",
    duration: 1.4,
    stagger: 0.55,
    ease: "none",
  }
);

// 2. 제목 애니메이션 종료 후 설명 텍스트 등장
howTimeline.from(
  ".how-description p",
  {
    y: 25,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
  },
  ">-0.5"
);
    
    
// BEST SELLER - 제목 → 구분선 → 제품 카드
const bestTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".best-seller",
    start: "top 50%",
    toggleActions: "restart none restart reverse",
  },
});

// 1. 제목은 제자리에서 나타남
bestTimeline.from(".best-heading-text", {
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
});

// 2. 위아래 선이 동시에 왼쪽에서 오른쪽으로 그려짐
bestTimeline.fromTo(
  ".best-heading-line",
  {
    scaleX: 0,
  },
  {
    scaleX: 1,
    duration: 1,
    ease: "power2.inOut",
  },
  "-=0.2"
);

// 3. 제품 카드가 자연스럽게 올라오면서 등장
bestTimeline.from(".best-item", {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
}, "-=0.1");
      
// PACKAGE & GOODS - 패키지 → 굿즈 순차 등장
const goodsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".package-goods",
    start: "top 85%",
    toggleActions: "restart none restart reverse",
  },
});

// 1. 왼쪽 패키지 이미지
goodsTimeline.fromTo(
  ".package-slider",
  {
    x: -35,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1.1,
    ease: "power3.out",
  }
);

// 2. 오른쪽 굿즈 2개 순차 등장
goodsTimeline.fromTo(
  ".goods-item",
  {
    y: 30,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.2,
    ease: "power3.out",
  },
  "-=0.5"
);

// gsap.context 닫기
});

return () => ctx.revert();
}, []);
  

  return (
    <div className="home">
      <section className="hero-slider">
        {slides.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`NOMERO 브랜드 메인 비주얼 ${index + 1}`}
            className={`hero-image ${
  currentSlide === index && zoomStarted ? "is-active" : ""
}`}
          />
        ))}

        <div className="hero-overlay">
          <div className="hero-brand">
  <img
    src="/images/nomero-main-logo.png"
    alt="NOMERO"
    className={`hero-brand-white ${currentSlide < 2 ? "is-active" : ""}`}
  />
  <img
    src="/images/nomero-main-logo-navy.png"
    alt=""
    aria-hidden="true"
    className={`hero-brand-navy ${currentSlide >= 2 ? "is-active" : ""}`}
  />
</div>

          <div className="hero-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`hero-dot ${
                  currentSlide === index ? "is-active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`${index + 1}번째 슬라이드 보기`}
              />
            ))}
          </div>
        </div>
            </section>

      {/* 브랜드 메시지 */}
      <section className="brand-message">
        <h1>
  <span className="brand-line">Stop counting.</span>
  <span className="brand-line">Start choosing,</span>
  <span className="brand-line">Nomero</span>
</h1>


        <p>
          우리는 정해진 숫자 대신 <br />
          나의 취향으로 먹을 것을 고르고, <br />
          <br />
          서둘러 넘기던 식사가 <br />
          머무르고 싶은 순간이 되는 세계를 <br />
          그립니다.
          <br />
          <br />
          맛과 감각, 그리고 지구까지 생각하는 <br />
          선택을 원하는 모든 사람에게  <br />
          열려있는 식물성 대체식 브랜드.
        </p>
      </section>

      {/* HOW WE CHOOSE */}
<section className="how-we-choose">
  <div className="how-heading">
    HOW WE CHOOSE
  </div>

  <div className="how-grid">
    <div className="how-item">
      <h3>EAT</h3>

      <div className="how-description">
        <p>오늘을 따라가는 선택.</p>

        <p>
          칼로리와 수치가 아닌, <br />
          오늘의 컨디션과 감각을 따라가는 식사.  
        </p>

        <p>
          노메로는 사용자의 취향을 기반으로 <br />
          감각적인 한 끼를 큐레이션합니다.
        </p>
      </div>
    </div>

    <div className="how-item">
      <h3>LIFE</h3>

      <div className="how-description">
        <p>일상에 스며드는 식사.</p>

        <p>
          식사는 지켜야 하는 기준이 아니라,<br />
          매일 자연스럽게 이어지는 선택.
        </p>

        <p>
          노메로는 바쁜 일상 속에서도<br />
          나만의 식사 리듬을 만들어갑니다.
        </p>
      </div>
    </div>

    <div className="how-item">
      <h3>EARTH</h3>

      <div className="how-description">
        <p>지구로 이어지는 흐름.</p>

        <p>
          나를 위한 한 끼가 자연스럽게<br />
          지구를 향한 흐름으로 이어지도록. 
        </p>

        <p>
          노메로 리포트는<br />
          나의 선택이 만든 변화를<br />
          구체적인 수치로 보여줍니다.
        </p>
      </div>
    </div>
  </div>
      </section>
      

      {/* BEST SELLER */}
<section className="best-seller">
  <div className="best-heading">
  <span className="best-heading-text">BEST SELLER</span>
  <span className="best-heading-line top"></span>
  <span className="best-heading-line bottom"></span>
</div>

  <div className="best-grid">
    {bestSellers.map((product) => (
      <Link
  to={
    product.id === "whole-grain-suede"
      ? "/shop/whole-grain-suede"
      : "#"
  }
  className="best-item"
  key={product.id}
  onClick={(e) => {
    if (product.id !== "whole-grain-suede") {
      e.preventDefault();
    }
  }}
>
        <span className="best-line">{product.line}</span>

        <div className="best-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="best-info">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      </Link>
    ))}
  </div>
      </section>
      

      {/* PACKAGE & GOODS */}
<section className="package-goods">
  {/* 왼쪽 패키지 슬라이더 */}
  <div className="package-slider">
    {packageImages.map((image, index) => (
      <img
        key={image}
        src={image}
        alt={`NOMERO 패키지 ${index + 1}`}
        className={`package-slide ${
          index === packageIndex ? "active" : ""
        }`}
      />
    ))}
  </div>

  {/* 오른쪽 굿즈 */}
  <div className="goods-list">
    <div className="goods-item">
      <div className="goods-text">
        <h3>Lv.2&nbsp;&nbsp;Veil ✳</h3>
        <span className="goods-category">soap</span>
      </div>

      <img
        src="/images/goods/goods-1.png"
        alt="NOMERO 비누 굿즈"
        className="goods-image"
      />

      <span className="goods-point">+ 40</span>
    </div>

    <div className="goods-item">
      <div className="goods-text">
        <h3>Lv.6&nbsp;&nbsp;Cell ✳</h3>
        <span className="goods-category">tumbler</span>
      </div>

      <img
        src="/images/goods/goods-2.png"
        alt="NOMERO 텀블러 굿즈"
        className="goods-image"
      />

      <span className="goods-point">+ 120</span>
    </div>
  </div>
</section>
    </div>
  );
}

export default Home;