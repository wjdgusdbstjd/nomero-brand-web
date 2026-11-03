import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// UmamiBlack.jsx
import "./ProductDetail.css";
import "./VitaminWedge.css";

gsap.registerPlugin(ScrollTrigger);

function VitaminWedge() {
  const { productId } = useParams();

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
      id: "Sweet Berry",
      name: "Sweet Berry",
      price: "₩ 6,490",
      image: "/images/products/snack-3.png",
    },
    {
      id: "Spicy Amber",
      name: "Spicy Amber",
      price: "₩ 5,700",
      image: "/images/products/snack-1.png",
    },
    {
      id: "Protein Slab",
      name: "Protein Slab",
      price: "₩ 8,890",
      image: "/images/products/product-4.png",
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
    <div className="product-detail vitamin-wedge">

      {/* 상단 제품 제목 */}
      
<div className="detail-heading">
  <p>
    SHOP <span>●</span> DIGESTIBLE LINE
  </p>
  <h1>VITAMIN WEDGE</h1>
</div>


      {/* 상세 페이지 2열 레이아웃 */}
      <div className="detail-layout">

        {/* 왼쪽: 스크롤되는 상세 콘텐츠 */}
        <div className="detail-content">

          
<section className="detail-main-image">
  <img
    src="/images/products/body-2.png"
    alt="Vitamin Wedge"
  />
</section>


          
<section className="detail-visual" ref={visualRef}>
  
<img
  src="/images/detail/VITAMIN-WEDGE-visual.png"
  alt="Vitamin Wedge 블랙페퍼 크럼블 비주얼"
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
      <h3>정교하게 갈아 넣은 삼각형 모듈</h3>
      <p>
        블랙페퍼 추출물과 코엔자임 Q10을 삼각형의 모듈에 정교하게 갈아 넣습니다. 원료의 밀도가 살아있어, 한 조각 안에서 정돈된 영양의 감각이 또렷하게 이어지는 콤팩트한 형태를 완성합니다.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>하루의 균형을 이어가는 블랙페퍼 추출물</h3>
      <p>
        블랙페퍼 추출물이 함께 배합된 다른 영양소의 흡수를 자연스럽게 뒷받침하며, 정돈된 균형을 만들어냅니다. 놓치기 쉬운 미세 영양소의 흐름을 한 모듈 안에서 부담 없이 채우세요.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>균형을 완성하는 코엔자임 Q10</h3>
      <p>
        코엔자임 Q10이 함께 배합되어, 한 모듈 안의 정돈된 영양의 균형이 얹힙니다. 놓치기 쉬운 영양을 자연스럽게 더해, 
하루의 리듬을 부담 없이 이어갑니다.
      </p>
    </div>

  </div>
</section>




          


<section
  className="detail-ingredients"
  ref={ingredientsTextRef}
>
  <img
    src="/images/detail/VITAMIN-WEDGE-ingredients.png"
    alt="Vitamin Wedge 블랙페퍼 원료 화보"
    className="detail-ingredients-image"
  />

  <div className="detail-ingredients-text">
    <p>(Black Pepper</p>
    <p>Coenzyme Q10)</p>
  </div>
</section>




          

          


<section className="detail-ingredient-list" ref={ingredientRef}>
  <div className="detail-ingredient-diagram">

    {/* 위쪽 첫 번째 라벨 */}
    <div className="ingredient-label ingredient-label-top label-kale">
      <span>Kale/Spinach</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 위쪽 두 번째 라벨 */}
    <div className="ingredient-label ingredient-label-top label-protein">
      <span>Plant-based Protein</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 위쪽 세 번째 라벨 */}
    <div className="ingredient-label ingredient-label-top label-amino">
      <span>9 Essential Amino Acids</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 원료 이미지 */}
    <img
      src="/images/detail/VITAMIN-WEDGE-ingredient-list.png"
      alt="Vitamin Wedge 원료 인포그래픽"
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
      <span>Potassium</span>
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
      <h3>AM 09:00</h3>
      <p>
        하루의 균형을 여는 한 조각
        <br />
        아침 식사만으로는 놓치기 쉬운 영양의 균형을 챙기고 싶은 순간. Vitamin Wedge의 삼각형 모듈이 콤팩트한 형태로 영양을 자연스럽게 채워줍니다. 하루의 첫 리듬을 정돈된 균형으로 열어보세요.
      </p>
    </div>
  </div>

  {/* PM 12:30 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle evening"></span>
    </div>
    <div className="detail-timeline-text">
      <h3>PM 02:00</h3>
      <p>
        오후의 흐름 사이 필요한 부스팅
        <br />
        점심 이후 흐름 사이 짧은 공백을 채우고 싶은 순간. Vitamin Wedge의 콤팩트한 한 조각이 부담 없이 정돈된 감각을 이어줍니다. 필요한 순간에 손에 잡히는 편안한 균형을 경험해보세요.
      </p>
    </div>
  </div>

  {/* PM 07:30 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle evening"></span>
    </div>
    <div className="detail-timeline-text">
      <h3>PM 06:00</h3>
      <p>
        활동 전후의 감각적인 균형
        <br />
        저녁 활동을 앞두거나 마친 뒤 놓치기 쉬운 영양을 자연스럽게 채우고 
싶은 순간. Vitamin Wedge의 정돈된 결이 활동의 리듬을 지탱합니다.
      </p>
    </div>
  </div>

</div>


{/* 하단 추천 문구 */}
<div className="detail-timeline-ending">
  <h3>
    VITAMIN WEDGE
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
      블랙페퍼 추출물과 코엔자임 Q10이 삼각형의 콤팩트한 모듈에 응축된 
정돈된 결로, 필요한 순간에 자연스럽게 영양의 균형을 채우고 싶으신 분
    </p>

    <p>
      블랙페퍼 추출물이 다른 영양소의 흐름을 뒷받침하는 방식으로, 놓치기 쉬운 균형을 부담 없이 이어가고 싶으신 분.
    </p>

    <p>
      한 조각 안에 코엔자임 Q10까지 함께 담아, 별도의 영양제 없이 
균형 잡힌 영양을 감각적으로 채우고 싶으신 분
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
  src="/images/detail/VITAMIN-WEDGE-editorial-bg.png"
  alt=""
  className="detail-editorial-bg"
/>


  <div className="detail-editorial-inner">

    {/* 오른쪽 위 제품 화보 */}
    <div className="detail-editorial-photo photo-top">
      <img
    src="/images/detail/VITAMIN-WEDGE-editorial-1.png"
    alt="Vitamin Wedge 에디토리얼 이미지 1"
  />
    </div>

    {/* 왼쪽 아래 제품 화보 */}
    <div className="detail-editorial-photo photo-bottom">
      <img
    src="/images/detail/VITAMIN-WEDGE-editorial-2.png"
    alt="Vitamin Wedge 에디토리얼 이미지 2"
  />
    </div>

    {/* 왼쪽 상단 영문 텍스트 */}
    <p className="detail-editorial-text text-left">
      One Vitamin Wedge saves <br />
      about 1.5 kg of CO₂ per <br />
      meal. A small choice for <br />
      you, a lighter impact on <br />
      the planet.
    </p>

    {/* 오른쪽 하단 영문 텍스트 */}
    <p className="detail-editorial-text text-right">
      Condensed into a single <br />
      wedge, Vitamin Wedge <br />
      brings balance to your day <br />
      with black pepper extract <br />
      and Coenzyme Q10. <br />
      For an effortless boost in <br />
      one compact bite, choose <br />
      Vitamin Wedge
    </p>

  </div>
          </section>
          

          {/* SAVORY GREEN 추천 제품 */}
<section className="detail-recommend" ref={recommendRef}>

  <div className="detail-recommend-heading">
  <h2 className="recommend-title">
    <span className="recommend-reveal-eyebrow">
      VITAMIN WEDGE
    </span>
    <br />
    <span className="recommend-reveal-title">
      비슷한 제품을 추천해 드려요
    </span>
  </h2>

  <p>
    <span className="recommend-reveal-description">
      Vitamin Wedge는 Body Healthy 라인의 제품입니다. 
    </span>
    <br />
    <span className="recommend-reveal-description">
      활동적인 하루의 리듬 속에서 몸의 균형을 자연스럽게 채우는 한 끼. 
    </span>
    <br />
    <span className="recommend-reveal-description">
      같은 라인의 다른 결도 살펴보세요.
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
  <h2>미세 영양소 보충용 모듈</h2>
  <div className="detail-price">₩ 6,780</div>
</div>



<p
  id="mobile-purchase-description"
  className={`detail-description ${
    isPurchaseExpanded ? "expanded" : ""
  }`}
>
  블랙페퍼 추출물과 코엔자임 Q10을 더해
  <br />
  22가지 영양의 정수를 삼각형의 모듈에 날카롭게 갈아 넣었습니다.
  <br />
  당신의 식단이 가진 부족함을 메우고 신체 시스템의 모든 회로를 선명하게 연결하세요.
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
              <span>블랙페퍼 추출물</span>
              <span className="bar">|</span>
              <span>코엔자임 Q10</span>
              {/* <span className="bar">|</span>
              <span>아연</span> */}
            </div>

            {/* <div className="detail-price">
  ₩ 6,780
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

export default VitaminWedge;
