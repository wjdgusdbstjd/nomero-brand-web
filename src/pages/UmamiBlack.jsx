import { useState, useRef, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// UmamiBlack.jsx
import "./ProductDetail.css";
import "./UmamiBlack.css";

gsap.registerPlugin(ScrollTrigger);


function UmamiBlack() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isPurchaseExpanded, setIsPurchaseExpanded] = useState(false);



  // 메인 카피 인터랙션
  const visualRef = useRef(null);
  const oliveRef = useRef(null);
  const ingredientRef = useRef(null);
  const timelineRef = useRef(null);
  const editorialRef = useRef(null);
  const purchaseRef = useRef(null);
  const recommendRef = useRef(null);
  const ingredientsTextRef = useRef(null);



useEffect(() => {
  const section = visualRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {

    // 기존 4줄 텍스트
    const lines = section.querySelectorAll(
      ".detail-visual-line:not(.detail-nomero-line)"
    );

    // NOMERO! 개별 글자
    const letters = section.querySelectorAll(".nomero-letter");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "restart none restart reset",
      },
    });

    // 1. 기존 텍스트 아래에서 위로 등장
    tl.fromTo(
      lines,
      {
        y: 35,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      }
    );

    // 2. NOMERO! 한 글자씩 오른쪽에서 왼쪽으로 등장
    tl.fromTo(
      letters,
      {
        x: 35,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.09,
        ease: "power3.out",
      },
      "-=0.2"
    );

  }, section);

  return () => ctx.revert();
}, []);


  
  
  // ===================================
// INTERACTION 02
// 제품 설명 텍스트 순차 등장
// ===================================

useEffect(() => {
  const section = oliveRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      ".detail-olive-item",
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.22,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "restart none none reset",
        },
      }
    );
  }, section);

  return () => ctx.revert();
}, []);
  
  
  
  
  // ===================================
// INTERACTION 03
// 원료 인포그래픽 순차 등장
// ===================================

useEffect(() => {
  const section = ingredientRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const image = section.querySelector(
      ".detail-ingredient-list-image"
    );

    const lines = section.querySelectorAll(
      ".ingredient-line"
    );

    const labels = section.querySelectorAll(
      ".ingredient-label > span:not(.ingredient-line)"
    );

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.out",
      },
    });

    // 1. 원료 이미지 등장
    tl.fromTo(
      image,
      {
        opacity: 0,
        y: 35,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      }
    );

    // 2. 연결선이 펼쳐짐
    tl.fromTo(
      lines,
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.inOut",
      },
      "-=0.25"
    );

    // 3. 성분명 등장
    tl.fromTo(
      labels,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.35"
    );

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
      onLeaveBack: () => tl.pause(0),
    });
  }, section);

  return () => ctx.revert();
}, []);
  
  
  
  // ===================================
// INTERACTION 04
// 섭취 타임라인 인터랙션
// ===================================


useEffect(() => {
  const section = timelineRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const items = section.querySelectorAll(".detail-timeline-item");

    const tl = gsap.timeline({
      paused: true,
    });

    items.forEach((item, index) => {
      const circle = item.querySelector(".timeline-circle");
      const title = item.querySelector(".detail-timeline-text h3");
      const description = item.querySelector(".detail-timeline-text p");

      // 각 시간대의 등장 순서
      const startTime = index * 0.65;

      // 1. 원형 그래픽 등장
      tl.fromTo(
        circle,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
        },
        startTime
      );

      // 2. 시간 텍스트 등장
      tl.fromTo(
        title,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        startTime + 0.15
      );

      // 3. 설명 문장 등장
      tl.fromTo(
        description,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        startTime + 0.3
      );
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 65%",
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
      onLeaveBack: () => tl.pause(0),
    });

  }, section);

  return () => ctx.revert();
}, []);

  
  
  
  // ===================================
// INTERACTION 05
// 제품 화보 패럴랙스
// ===================================

useEffect(() => {
  const section = editorialRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const topImage = section.querySelector(
      ".photo-top img"
    );

    const bottomImage = section.querySelector(
      ".photo-bottom img"
    );

    // 첫 번째 화보: 아래에서 위로 이동
    gsap.fromTo(
      topImage,
      {
        yPercent: 8,
      },
      {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    // 두 번째 화보: 위에서 아래로 이동
    gsap.fromTo(
      bottomImage,
      {
        yPercent: -15,
      },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      }
    );

    gsap.fromTo(
  ".detail-editorial-text.text-left",
  {
    x: -70,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 65%",
      toggleActions: "restart none none reset",
    },
  }
);

// 오른쪽 텍스트 → 오른쪽에서 등장
gsap.fromTo(
  ".detail-editorial-text.text-right",
  {
    x: 70,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1.1,
    delay: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 65%",
      toggleActions: "restart none none reset",
    },
  }
);
    

  }, section);

  return () => ctx.revert();
}, []);
  
  
  
  // ===================================
// INTERACTION 06
// 구매 영역 정보 순차 등장
// ===================================

useEffect(() => {
  const section = purchaseRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const elements = [
      section.querySelector("h2"),
      section.querySelector(".detail-description"),
      section.querySelector(".detail-tags"),
      section.querySelector(".detail-price"),
      section.querySelector(".detail-buttons"),
    ].filter(Boolean);

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 18,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.15,
      }
    );
  }, section);

  return () => ctx.revert();
}, []);
  
  
  // ===================================
// INTERACTION 08
// 추천 섹션 텍스트 순차 등장
// ===================================

useEffect(() => {
  const section = recommendRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const eyebrow = section.querySelector(
      ".recommend-reveal-eyebrow"
    );

    const title = section.querySelector(
      ".recommend-reveal-title"
    );

    const descriptions = section.querySelectorAll(
      ".recommend-reveal-description"
    );

    const background = section.querySelector(
      ".recommend-reveal-background"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "restart none none reset",
      },
    });

    // 1. 작은 영문 제목
    if (eyebrow) {
      tl.fromTo(
        eyebrow,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
        }
      );
    }

    // 2. 메인 제목
    if (title) {
      tl.fromTo(
        title,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // 3. 설명 문장 3줄
    if (descriptions.length) {
      tl.fromTo(
        descriptions,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    // 4. 배경 영문 타이포
    if (background) {
      tl.fromTo(
        background,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power1.out",
        },
        0.2
      );
    }
  }, section);

  return () => ctx.revert();
}, []);
  
  
  
  
  // ===================================
// INTERACTION 09
// 원료 텍스트 순차 등장
// ===================================

useEffect(() => {
  const section = ingredientsTextRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      ".detail-ingredients-text p",
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "restart none none reset",
        },
      }
    );
  }, section);

  return () => ctx.revert();
}, []);

    // 추천 제품 데이터
  const recommendedProducts = [
    {
      id: "Fiber Cube",
      name: "Fiber Cube",
      price: "₩ 5,580",
      image: "/images/products/product-2.png",
    },
    {
      id: "savory-green",
      name: "Savory Green",
      price: "₩ 6,960",
      image: "/images/products/Digestible-4.png",
    },
    {
      id: "Forest Green",
      name: "Forest Green",
      price: "₩ 6,300",
      image: "/images/products/Digestible-2.png",
    },
  ];

const [activeProduct, setActiveProduct] = useState(1);
const [slideDirection, setSlideDirection] = useState(0);
const [isSliding, setIsSliding] = useState(false);

const slideTimer = useRef(null);

const moveProduct = (direction) => {
  if (isSliding) return;

  setIsSliding(true);
  setSlideDirection(direction);

  slideTimer.current = window.setTimeout(() => {
    setActiveProduct((prev) =>
      (prev + direction + recommendedProducts.length) %
      recommendedProducts.length
    );

    setSlideDirection(0);
    setIsSliding(false);
  }, 50);
};


  return (
    <div className="product-detail umami-black">

      {/* 상단 제품 제목 */}
      <div className="detail-heading">
  <p>
    SHOP <span>●</span> DIGESTIBLE LINE
  </p>
  <h1>UMAMI BLACK</h1>
</div>

      {/* 상세 페이지 2열 레이아웃 */}
      <div className="detail-layout">

        {/* 왼쪽: 스크롤되는 상세 콘텐츠 */}
        <div className="detail-content">

          <section className="detail-main-image">
  <img
    src="/images/products/Digestible-5.png"
  />
</section>

          
<section className="detail-visual" ref={visualRef}>
  <img
    src="/images/detail/UMAMI-BLACK-visual.png"
    alt="Umami Black 버섯 메인 비주얼"
    className="detail-visual-image"
  />

  <h2 className="detail-visual-title">
    <span className="detail-visual-line">Stop</span>
    <span className="detail-visual-line">Counting.</span>
    <span className="detail-visual-line">Start</span>
    <span className="detail-visual-line">Choosing.</span>

    
<span className="detail-visual-line detail-nomero-line">
  <span className="detail-nomero">
    {"NOMERO!".split("").map((letter, index) => (
      <span className="nomero-letter" key={index}>
        {letter}
      </span>
    ))}
  </span>
</span>

  </h2>
</section>


          

<section className="detail-olive" ref={oliveRef}>
  <div className="detail-olive-inner">

    <div className="detail-olive-item">
      <h3>버섯과 발효의 깊은 감칠맛</h3>
      <p>
        버섯과 발효 성분이 응축된 결이 한 큐브 안에 담깁니다. 원료 본연의 진한 감칠맛이 살아있어, 씹을수록 발효된 풍미의 깊이가 또렷하게 이어지는 밀도 있는 식감을 완성합니다.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>하루의 흐름을 지탱하는 필수 아미노산</h3>
      <p>
        필수 아미노산 9종이 균형 있게 배합되어, 하루의 에너지 대사에 자연스럽게 관여하며 든든한 흐름을 만들어냅니다. 놓치기 쉬운 아미노산의 균형을 한 끼 안에서 자연스럽게 채우세요.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>균형을 완성하는 베타글루칸과 아연</h3>
      <p>
        버섯 세포벽에서 추출한 베타글루칸과 아연이 함께 배합되어, 감칠맛의 풍미 위에 정돈된 영양의 균형이 얹힙니다. 놓치기 쉬운 영양을 자연스럽게 더해, 하루의 리듬을 부담 없이 이어갑니다.
      </p>
    </div>

  </div>
</section>



          

<section
  className="detail-ingredients"
  ref={ingredientsTextRef}
>
  <img
    src="/images/detail/UMAMI-BLACK-ingredients.png"
    alt="Umami Black 버섯 원료 화보"
    className="detail-ingredients-image"
  />

  <div className="detail-ingredients-text">
    <p>(Beta-glucan</p>
    <p>9 Essential Amino Acids</p>
    <p>Zinc)</p>
  </div>
</section>



          

          

<section className="detail-ingredient-list" ref={ingredientRef}>
  <div className="detail-ingredient-diagram">

    {/* 위쪽 첫 번째 라벨 */}
    <div className="ingredient-label ingredient-label-top label-kale">
      <span>mushroom</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 위쪽 두 번째 라벨 */}
    <div className="ingredient-label ingredient-label-top label-protein">
      <span>Beta-glucan</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 위쪽 세 번째 라벨 */}
    <div className="ingredient-label ingredient-label-top label-amino">
      <span>9 Essential Amino Acids</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 원료 이미지 */}
    <img
      src="/images/detail/UMAMI-BLACK-ingredient-list.png"
      alt="Umami Black 원료 인포그래픽"
      className="detail-ingredient-list-image"
    />

    {/* 아래쪽 첫 번째 라벨 */}
    <div className="ingredient-label ingredient-label-bottom label-crumble">
      <span className="ingredient-line"></span>
      <span>Crumble</span>
    </div>

    {/* 아래쪽 두 번째 라벨 */}
    <div className="ingredient-label ingredient-label-bottom label-potassium">
      <span className="ingredient-line"></span>
      <span>Zinc</span>
    </div>

  </div>
</section>



{/* WHEN U EAT SAVORY GREEN */}
<section className="detail-when" ref={timelineRef}>
  <div className="detail-when-title">
    
{/* 시간대별 섭취 타임라인 */}

<div className="detail-timeline-list">

  {/* AM 08:00 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle morning"></span>
    </div>
    <div className="detail-timeline-text">
      <h3>AM 08:00</h3>
      <p>
        진한 감각으로 시작하는 아침
        <br />
        가벼운 아침으로는 아쉬운 하루의 시작. Umami Black의 발효된 감칠맛이 아침의 첫 감각을 깊이 있게 채워줍니다. 자극적이지 않지만 진한 풍미로 하루의 리듬을 안정적으로 열어보세요.
      </p>
    </div>
  </div>

  {/* PM 12:30 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle evening"></span>
    </div>
    <div className="detail-timeline-text">
      <h3>PM 12:30</h3>
      <p>
        밀도 있는 감칠맛의 점심
        <br />
        바쁜 점심의 반복 속에서 깊이 있는 풍미가 그리운 하루. 
Umami Black의 발효 결이 만드는 진한 감칠맛으로 점심의 
감각을 새롭게 이어보세요. 든든함과 감각적 여운이 함께 완성됩니다.
      </p>
    </div>
  </div>

  {/* PM 07:30 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle evening"></span>
    </div>
    <div className="detail-timeline-text">
      <h3>PM 07:30</h3>
      <p>
        진한 여운으로 마무리하는 저녁
        <br />
        하루의 마지막을 감각적인 결로 닫고 싶은 저녁. Umami Black의 
발효된 감칠맛과 균형 잡힌 영양이 하루의 마무리에 진한 여운을 남깁니다. 시간이 만들어낸 풍미와 함께 하루를 편안하게 닫아보세요.
      </p>
    </div>
  </div>

</div>


{/* 하단 추천 문구 */}
<div className="detail-timeline-ending">
  <h3>
    UMAMI BLACK
    <br />
    <span>이런 분들께 추천합니다</span>
  </h3>
</div>

  </div>
</section>



          {/* SAVORY GREEN 비주얼 이미지 */}
<section className="detail-motion">
  <img
    src="/images/detail/savory-green-visual.png"
    alt="SAVORY GREEN 제품 비주얼"
    className="detail-motion-image"
  />
          </section>
          

          {/* SAVORY GREEN 브랜드 메시지 */}

<section className="detail-message">
  <div className="detail-message-inner">

    <p>
      버섯과 발효 성분이 응축된 깊은 감칠맛의 풍미로, 매일의 식사에 
자극이 아닌 시간의 결이 만들어낸 진한 감각을 더하고 싶으신 분
    </p>

    <p>
      필수 아미노산 9종이 균형 있게 어우러진 흐름 안에서, 든든하고 정돈된 만족감을 안정적으로 이어가고 싶으신 분 
    </p>

    <p>
      식사만으로는 놓치기 쉬운 베타글루칸과 아연을 한 큐브 안에 담아, 
별도의 영양제 없이 균형 잡힌 영양을 감각적으로 채우고 싶으신 분
    </p>

  </div>
</section>

          


          {/* SAVORY GREEN 제품 화보 */}
<section
  className="detail-editorial"
  ref={editorialRef}
>

  {/* 배경 이미지 */}
  <img
    src="/images/detail/UMAMI-BLACK-editorial-bg.png"
    alt=""
    className="detail-editorial-bg"
  />

  <div className="detail-editorial-inner">

    {/* 오른쪽 위 제품 화보 */}
    <div className="detail-editorial-photo photo-top">
      <img
        src="/images/detail/UMAMI-BLACK-editorial-1.png"
        alt="SAVORY GREEN 제품 화보"
      />
    </div>

    {/* 왼쪽 아래 제품 화보 */}
    <div className="detail-editorial-photo photo-bottom">
      <img
        src="/images/detail/UMAMI-BLACK-editorial-2.png"
        alt="SAVORY GREEN 디저트 단면 화보"
      />
    </div>

    {/* 왼쪽 상단 영문 텍스트 */}
    <p className="detail-editorial-text text-left">
      One Umami Black cube <br />
      saves about 1.5 kg of CO₂ <br />
      per meal. A small choice <br />
      for you, a lighter impact on <br />
      the planet.
    </p>

    {/* 오른쪽 하단 영문 텍스트 */}
    <p className="detail-editorial-text text-right">
      Fill your day with <br />
      umami, deepened <br />
      by time. Choose <br />
      Umami Black. Stop <br />
      counting. Start <br />
      choosing.
    </p>

  </div>
          </section>
          

          {/* SAVORY GREEN 추천 제품 */}
<section className="detail-recommend" ref={recommendRef}>

  <div className="detail-recommend-heading">
  <h2 className="recommend-title">
    <span className="recommend-reveal-eyebrow">
      WHOLE GRAIN SUEDE
    </span>
    <br />
    <span className="recommend-reveal-title">
      비슷한 제품을 추천해 드려요
    </span>
  </h2>

  <p>
    <span className="recommend-reveal-description">
      Whole Grain Suede는 Meal 라인의 제품입니다. 
    </span>
    <br />
    <span className="recommend-reveal-description">
      숫자가 아닌 오늘의 컨디션을 따라 한 끼를 선택하는 
    </span>
    <br />
    <span className="recommend-reveal-description">
      여섯 가지 결. 같은 라인의 다른 선택도 살펴보세요.
    </span>
  </p>
</div>

  <div className="detail-recommend-slider">

    {/* 배경 타이포 */}
    <div className="detail-recommend-bgtext" aria-hidden="true">
      Stop
      <br />
      Counting.
      <br />
      Start Choosing,
      <br />
      NOMERO!
    </div>

    {/* 제품 이미지 */}
    <div className={`detail-recommend-track ${isSliding ? "is-sliding" : ""}`}>

  {recommendedProducts.map((product, index) => {
    const total = recommendedProducts.length;

    const relative =
      (index - activeProduct + total) % total;

    let position = "right";

    if (relative === 0) position = "center";
    if (relative === total - 1) position = "left";

    return (
      
<div
  key={product.id}
  className={`detail-recommend-product ${position}`}
  style={{
    "--slide-direction": slideDirection,
    cursor:
      position === "center" && product.id === "savory-green"
        ? "pointer"
        : "default",
  }}
  onClick={() => {
    if (
      position === "center" &&
      product.id === "savory-green" &&
      !isSliding
    ) {
      navigate(`/shop/${product.id}`);
      window.scrollTo(0, 0);
    }
  }}
>
  <img src={product.image} alt={product.name} />
</div>

    );
  })}

</div>

    {/* 이전 버튼 */}
    <button
      className="detail-recommend-arrow prev"
      type="button"
      onClick={() => moveProduct(-1)}
      aria-label="이전 제품"
    >
      <span></span>
    </button>

    {/* 다음 버튼 */}
    <button
      className="detail-recommend-arrow next"
      type="button"
      onClick={() => moveProduct(1)}
      aria-label="다음 제품"
    >
      <span></span>
    </button>

  </div>

  {/* 가운데 제품 정보 */}
  <div className="detail-recommend-info">
    <h3>{recommendedProducts[activeProduct].name}</h3>
    <p>{recommendedProducts[activeProduct].price}</p>
  </div>

</section>


          

        </div>

        {/* 오른쪽: 구매 정보 */}
        <aside className="detail-sidebar">
          <div className="detail-purchase" ref={purchaseRef}>

            
<div className="detail-purchase-header">
  <h2>버섯과 발효 성분의 감칠맛 식사</h2>
  <div className="detail-price">₩ 7,890</div>
</div>



<p
  id="mobile-purchase-description"
  className={`detail-description ${
    isPurchaseExpanded ? "expanded" : ""
  }`}
>

  버섯의 세포벽에서 추출한 고농축 베타글루칸은 
  <br />
  무너진 장내 면역 체계를 바로잡고, 외부 유해 환경으로부터 몸을 보호하는 
  <br />
  강력한 지지대 역할을 합니다.
</p>

            
<button
  type="button"
  className={`detail-expand-toggle ${
    isPurchaseExpanded ? "expanded" : ""
  }`}
  onClick={() => setIsPurchaseExpanded(!isPurchaseExpanded)}
  aria-expanded={isPurchaseExpanded}
  aria-controls="mobile-purchase-description"
>
  <span>
    {isPurchaseExpanded ? "설명 접기" : "제품 설명 더보기"}
  </span>
  <span className="detail-expand-arrow" aria-hidden="true">
    ⌃
  </span>
</button>

            
            <div className="detail-tags">
              <span>베타글루칸</span>
              <span className="bar">|</span>
              <span>필수 아미노산 9종</span>
              <span className="bar">|</span>
              <span>아연</span>
            </div>

            {/* <div className="detail-price">
  ₩ 7,890
</div> */}

            <div className="detail-buttons">
  <button className="detail-hover-button">
    <span className="button-label">
      장바구니
      <span className="button-arrow" aria-hidden="true">↗</span>
    </span>
  </button>

  <button className="detail-hover-button">
    <span className="button-label">
      구매하기
      <span className="button-arrow" aria-hidden="true">↗</span>
    </span>
  </button>
</div>

          </div>
        </aside>

      </div>
    </div>
  );
}

export default UmamiBlack;
