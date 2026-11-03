import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProductDetail.css";

gsap.registerPlugin(ScrollTrigger);

function ProductDetail() {
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
    gsap.from(".detail-visual-line", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
  trigger: section,
  start: "top 75%",
  toggleActions: "restart none restart reset",
},
    });
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
      id: "umami-black",
      name: "Umami Black",
      price: "₩ 7,890",
      image: "/images/products/Digestible-5.png",
    },
    {
      id: "green",
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
    <div className="product-detail">

      {/* 상단 제품 제목 */}
      <div className="detail-heading">
        <p>SHOP <span>●</span>
          DIGESTIBLE</p>
        
        <h1>SAVORY GREEN</h1>
      </div>

      {/* 상세 페이지 2열 레이아웃 */}
      <div className="detail-layout">

        {/* 왼쪽: 스크롤되는 상세 콘텐츠 */}
        <div className="detail-content">

          <section className="detail-main-image">
            <img
              src="/images/products/Digestible-4.png"
              alt="Savory Green"
            />
          </section>

          
<section className="detail-visual" ref={visualRef}>
  <img
    src="/images/detail/savory-green-leaves.png"
    alt="신선한 채소 이미지"
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
      <h3>케일과 시금치의 진한 풍미</h3>
      <p>
                  버케일과 시금치 추출물이 채소 본연의 결을 응축해 한 큐브 안 <br />
                  에 담깁니다. 원료가 품은 진한 풍미가 이어져, 씹을수록 채소의 <br />
                  청량한 감각이 또렷하게 남는 밀도 있는 식감을 완성합니다.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>균형 잡힌 감각을 이어가는 칼륨</h3>
      <p>
                  케일과 시금치가 품은 칼륨이 짜고 무거운 뒷맛 없이 담백한 균형을 <br />
                  만들어냅니다. 과잉된 염분에 무거워진 하루의 흐름 대신, 채소가 만 <br />
                  들어내는 가벼운 감각을 경험하세요.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>균형을 완성하는 식물성 단백질</h3>
      <p>
                  식물성 단백질이 함께 배합되어, 채소의 풍미 위에 정돈된 영양의 <br />
                  균형이 얹힙니다. 놓치기 쉬운 단백질을 자연스럽게 더해, 하루의 <br />
                  리듬을 부담 없이 이어갑니다.
      </p>
    </div>

  </div>
</section>


          
<section
  className="detail-ingredients"
  ref={ingredientsTextRef}
>

  <img
    src="/images/detail/savory-ingredients.png"
    alt="Savory Green 제품 화보"
    className="detail-ingredients-image"
  />

  <div className="detail-ingredients-text">
  <p>(Kale/Spinach Extract</p>
  <p>Potassium</p>
  <p>Plant-based Protein)</p>
</div>

</section>


          

          

{/* SAVORY GREEN 원료 구성 */}
<section
  className="detail-ingredient-list"
  ref={ingredientRef}
>
  <div className="detail-ingredient-diagram">

    {/* 위쪽 텍스트 */}
    <div className="ingredient-label ingredient-label-top label-kale">
      <span>Kale/Spinach</span>
      <span className="ingredient-line"></span>
    </div>

    <div className="ingredient-label ingredient-label-top label-protein">
      <span>Plant-based Protein</span>
      <span className="ingredient-line"></span>
    </div>

    <div className="ingredient-label ingredient-label-top label-amino">
      <span>9 Essential Amino Acids</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 원료 이미지 한 장 */}
    <img
      src="/images/detail/savory-ingredient-list.png"
      alt="케일, 크럼블, 식물성 단백질, 칼륨, 필수 아미노산 원료"
      className="detail-ingredient-list-image"
    />

    {/* 아래쪽 텍스트 */}
    <div className="ingredient-label ingredient-label-bottom label-crumble">
      <span className="ingredient-line"></span>
      <span>Crumble</span>
    </div>

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

  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle morning"></span>
    </div>

    <div className="detail-timeline-text">
      <h3>AM 08:00</h3>
      {/* <h4>청량하게 시작하는 담백한 아침</h4> */}
      <p>
        청량하게 시작하는 담백한 아침 <br />
        아침의 첫 감각이 자극적이지 않고 청량하게 이어지길 원하는 하루. <br />
        Savory Green의 채소 결이 만드는 담백한 풍미로 하루를 부드럽게
        열어 <br />
        보세요. 자극 없이 이어지는 청량함이 아침의 리듬을 편안하게
        잡아줍니다.
      </p>
    </div>
  </div>

  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle lunch"></span>
    </div>

    <div className="detail-timeline-text">
      <h3>PM 12:30</h3>
      {/* <h4>자극적인 외식 대신 담백한 점심</h4> */}
      <p>
        자극적인 외식 대신 담백한 점심 <br />
        짜고 무거운 외식으로 오후가 처지는 대신, Savory Green의 <br />
        채소 결을 선택해보세요. 담백한 풍미와 깔끔한 균형이
        오후의 <br />
        리듬을 편안하게 이어줍니다.
      </p>
    </div>
  </div>

  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle evening"></span>
    </div>

    <div className="detail-timeline-text">
      <h3>PM 07:30</h3>
      {/* <h4>가볍게 마무리하는 저녁</h4> */}
      <p>
        가볍게 마무리하는 저녁 <br />
        하루 종일 자극적인 식사가 이어진 뒤, 마지막은 담백하게
        닫고 싶은 저녁. <br />
        Savory Green의 청량한 결이 무겁지 않은
        편안한 마무리를 완성합니 <br />
        다. 채소 본연의 풍미와 함께
        하루를 차분하게 닫아보세요.
      </p>
    </div>
  </div>

</div>

{/* 하단 추천 문구 */}
<div className="detail-timeline-ending">
  <h3>
    SAVORY GREEN
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
      케일과 시금치가 만들어내는 채소 본연의 담백한 풍미로, 
      <br />
      매일의 식사에 자극 없는 청량한 감각을 더하고 싶으신 분
    </p>

    <p>
      채소가 품은 칼륨이 짜고 무거운 뒷맛 없이 담백한 균형을 만들어내는 
      <br />
      흐름 안에서, 부담 없이 정돈된 하루를 안정적으로 이어가고 싶으신 분
    </p>

    <p>
      식사만으로는 놓치기 쉬운 식물성 단백질을 한 큐브 안에 담아, 
      <br />
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
    src="/images/detail/savory-editorial-bg.png"
    alt=""
    className="detail-editorial-bg"
  />

  <div className="detail-editorial-inner">

    {/* 오른쪽 위 제품 화보 */}
    <div className="detail-editorial-photo photo-top">
      <img
        src="/images/detail/savory-editorial-01.png"
        alt="SAVORY GREEN 제품 화보"
      />
    </div>

    {/* 왼쪽 아래 제품 화보 */}
    <div className="detail-editorial-photo photo-bottom">
      <img
        src="/images/detail/savory-editorial-02.png"
        alt="SAVORY GREEN 디저트 단면 화보"
      />
    </div>

    {/* 왼쪽 상단 영문 텍스트 */}
    <p className="detail-editorial-text text-left">
      One Savory Green saves 
      <br />
      about 1.5 kg of CO₂ per 
      <br />
      meal. A small choice for 
      <br />
      you, a lighter impact on 
      <br />
      the planet.
    </p>

    {/* 오른쪽 하단 영문 텍스트 */}
    <p className="detail-editorial-text text-right">
      Fill your day with the 
      <br />
      fresh, clean notes of 
      <br />
      kale and spinach.
      <br />
      For a light, 
      <br />
      comforting meal 
      <br />
      without the excess, 
      <br />
      choose Savory Green 
      <br />
      — Stop counting. 
      <br />
      Start choosing.
    </p>

  </div>
          </section>
          

          {/* SAVORY GREEN 추천 제품 */}
<section className="detail-recommend" ref={recommendRef}>

  <div className="detail-recommend-heading">
  <h2 className="recommend-title">
    <span className="recommend-reveal-eyebrow">
      SAVORY GREEN
    </span>
    <br />
    <span className="recommend-reveal-title">
      비슷한 제품을 추천해 드려요
    </span>
  </h2>

  <p>
    <span className="recommend-reveal-description">
      Savory Green은 Digestible 라인의 제품입니다.
    </span>
    <br />
    <span className="recommend-reveal-description">
      자극 없이 담백하게 이어지는 결, 장의 리듬을 자연스럽게 정돈하는 한 끼.
    </span>
    <br />
    <span className="recommend-reveal-description">
      Digestible 라인의 다른 제품도 함께 살펴보세요.
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
      position === "center" && product.id === "umami-black"
        ? "pointer"
        : "default",
  }}
  onClick={() => {
    if (
      position === "center" &&
      product.id === "umami-black" &&
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

            {/* <h2>
              채소의 풍미를 응축한 염분 밸런스식
            </h2> */}


<div className="detail-purchase-header">
  <h2>
    채소의 풍미를 응축한 염분 밸런스식
  </h2>

  <div className="detail-price">
    ₩ 6,990
  </div>
</div>


            
<p
  id="mobile-purchase-description"
  className={`detail-description ${
    isPurchaseExpanded ? "expanded" : ""
  }`}
>

              Savory Green은 단순히 허기를 채우는 것을 넘어,  우리 몸의 전해질 밸런
              스를 무너뜨리는 과잉된 염분을 조절하고  본연의 가벼운 라인을 되찾아주기 위해 설계되었습니다.
            </p>

            
<div className="detail-tags">
  <span>케일/시금치 추출물</span>
  <span className="bar">|</span>
  <span>칼륨</span>
  <span className="bar">|</span>
  <span>식물성 단백질</span>
</div>

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


            {/* <div className="detail-price">
              ₩ 6,990
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

export default ProductDetail;
