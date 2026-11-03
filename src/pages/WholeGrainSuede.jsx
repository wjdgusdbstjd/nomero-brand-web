import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// WholeGrainSuede.jsx
import "./ProductDetail.css";
import "./WholeGrainSuede.css";

gsap.registerPlugin(ScrollTrigger);

function WholeGrainSuede() {
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
      id: "Clean White",
      name: "Clean White",
      price: "₩ 8,990",
      image: "/images/products/meal-4.png",
    },
    {
      id: "Iron Red",
      name: "Iron Red",
      price: "₩ 8,950",
      image: "/images/products/meal-2.png",
    },
    {
      id: "Sweet Root",
      name: "Sweet Root",
      price: "₩ 7,780",
      image: "/images/products/meal-5.png",
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
    <div className="product-detail whole-grain-suede">

      {/* 상단 제품 제목 */}
      <div className="detail-heading">
  <p>
    SHOP <span>●</span> MEAL LINE
  </p>
  <h1>WHOLE GRAIN SUEDE</h1>
</div>

      {/* 상세 페이지 2열 레이아웃 */}
      <div className="detail-layout">

        {/* 왼쪽: 스크롤되는 상세 콘텐츠 */}
        <div className="detail-content">

          <section className="detail-main-image">
  <img
    src="/images/products/product-1.png"
    alt="Whole Grain Suede"
  />
</section>

          
<section className="detail-visual" ref={visualRef}>
  <img
    src="/images/detail/WHOLE GRAIN SUEDE-pea.png"
    alt="Whole Grain Suede 완두콩 비주얼"
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
      <h3>오래 이어지는 든든함</h3>
      <p>
        복합 탄수화물이 천천히 에너지로 전환되며 오랜 시간 든든함을 유지시켜 줍니다. 짧게 채우고 금세 허기지는 스낵이 아닌, 하루의 흐름을 지탱해주는 진짜 한 끼입니다.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>균형 잡힌 단백질 구성</h3>
      <p>
        식물성 완두 단백질이 부드럽게 녹아들어, 든든함 뒤에 남는 무거움 없이 가볍고 정돈된 만족감을 완성합니다. 통곡물의 풍미 위에 얹힌 담백한 단백질이 식사의 밸런스를 잡아줍니다.
      </p>
    </div>

    <div className="detail-olive-item">
      <h3>하루의 식이섬유, 한 끼로</h3>
      <p>
        식이섬유 12g이 한 큐브 안에 담겨 있어, 챙기기 어려운 하루의 섬유질을 자연스럽게 채워줍니다. 통곡물과 함께 어우러진 섬유질이 식사 후의 무거움 대신 가볍고 편안한 여운을 남깁니다.
      </p>
    </div>

  </div>
</section>


          
<section
  className="detail-ingredients"
  ref={ingredientsTextRef}
>
  <img
    src="/images/detail/WHOLE GRAIN-ingredients.png"
    alt="Whole Grain Suede 원료 화보"
    className="detail-ingredients-image"
  />

  <div className="detail-ingredients-text">
    <p>(Complex carbohydrates</p>
    <p>Pea protein</p>
    <p>12g dietary fiber)</p>
  </div>
</section>


          

          

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
      <span>Crumble</span>
      <span className="ingredient-line"></span>
    </div>

    <div className="ingredient-label ingredient-label-top label-amino">
      <span>Plant-based Protein</span>
      <span className="ingredient-line"></span>
    </div>

    {/* 원료 이미지 */}
    <img
      src="/images/detail/WHOLE GRAIN-ingredient-list.png"
      alt="Whole Grain Suede 원료 인포그래픽"
      className="detail-ingredient-list-image"
    />

    {/* 아래쪽 텍스트 */}
    <div className="ingredient-label ingredient-label-bottom label-crumble">
      <span className="ingredient-line"></span>
      <span>Potassium</span>
    </div>

    <div className="ingredient-label ingredient-label-bottom label-potassium">
      <span className="ingredient-line"></span>
      <span>9 Essential Amino Acids</span>
    </div>

  </div>
</section>


{/* WHEN U EAT SAVORY GREEN */}
<section className="detail-when" ref={timelineRef}>
  <div className="detail-when-title">
    
{/* 시간대별 섭취 타임라인 */}
<div className="detail-timeline-list">

  {/* 아침 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle morning"></span>
    </div>

    <div className="detail-timeline-text">
      <h3>AM 08:00</h3>
      <p>
        하루의 시작을 여는 단단한 아침 <br />
바쁜 아침, 타협 없는 든든함이 필요할 때 출근 준비로 쫓기는 아침, 물에 타 먹는 가벼운 쉐이크로는 점심까지 버티기 힘들다면 
홀그레인 스웨이드의 묵직함을 선택하세요.
      </p>
    </div>
  </div>

  {/* 점심 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle lunch"></span>
    </div>

    <div className="detail-timeline-text">
      <h3>PM 12:30</h3>
      <p>
        흐트러짐 없는 에너지를 위한 점심 <br />
자극적이고 더부룩한 외식 대신, 내 몸을 위한 깨끗한 선택. 
거친 통곡물이 주는 밀도 높은 포만감으로 치열한 오후를 
버텨낼 에너지를 단단하게 채웁니다.
      </p>
    </div>
  </div>

  {/* 저녁 */}
  <div className="detail-timeline-item">
    <div className="detail-timeline-marker">
      <span className="timeline-circle evening"></span>
    </div>

    <div className="detail-timeline-text">
      <h3>PM 07:30</h3>
      <p>
        하루를 마무리하는 온전한 저녁 <br />
지친 하루의 끝, 무엇을 먹을지 고민하는 것조차 버거울 때가 있습니다. 
복잡한 계산은 내려놓으세요. 오직 내 몸이 원하는 영양과 밀도 높은 
식감만을 담아낸, 가장 편안하고 든든한 한 끼입니다.
      </p>
    </div>
  </div>

</div>

{/* 하단 추천 문구 */}
<div className="detail-timeline-ending">
  <h3>
    WHOLE GRAIN SUEDE
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
      천천히 풀리는 복합 탄수화물이 만들어내는 오랜 든든함으로 
하루의 흐름을 지탱해줄 진짜 한 끼를 찾으시는 분 
    </p>

    <p>
      식물성 완두 단백질이 부드럽게 어우러진 담백한 밸런스로 든든함과 가벼움이 함께 완성되는 식사의 감각을 경험하고 싶으신 분
    </p>

    <p>
      챙기기 쉽지 않은 하루의 식이섬유 12g을 한 입 크기의 큐브 안에 담아, 
별도의 준비나 번거로움 없이 자연스럽게 채우고 싶으신 분
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
    src="/images/detail/WholeGrain-editorial-bg.png"
    alt=""
    className="detail-editorial-bg"
  />

  <div className="detail-editorial-inner">

    {/* 오른쪽 위 제품 화보 */}
    <div className="detail-editorial-photo photo-top">
      <img
        src="/images/detail/WholeGrain-editorial-01.png"
        alt="SAVORY GREEN 제품 화보"
      />
    </div>

    {/* 왼쪽 아래 제품 화보 */}
    <div className="detail-editorial-photo photo-bottom">
      <img
        src="/images/detail/WholeGrain-editorial-02.png"
        alt="SAVORY GREEN 디저트 단면 화보"
      />
    </div>

    {/* 왼쪽 상단 영문 텍스트 */}
    <p className="detail-editorial-text text-left">
       One Whole Grain Suede <br />
       saves about 1.5 kg of CO₂ <br />
       per meal. A small choice <br />
       for you, a lighter impact on <br />
       the planet.
    </p>

    {/* 오른쪽 하단 영문 텍스트 */}
    <p className="detail-editorial-text text-right">
      FRediscover the feeling of a <br />
      real meal with Whole Grain <br />
      Suede, crafted with the <br />
      authentic texture of whole <br />
      grains. <br />
      For a grounded meal that <br />
      keeps you steady through <br />
      busy days, choose Whole <br />
       Grain Suede 
    </p>

  </div>
          </section>
          

          {/* SAVORY GREEN 추천 제품 */}
<section className="detail-recommend" ref={recommendRef}>

  <div className="detail-recommend-heading">
  <h2 className="recommend-title">
    <span className="recommend-reveal-eyebrow">
      UMAMI BLACK
    </span>
    <br />
    <span className="recommend-reveal-title">
      비슷한 제품을 추천해 드려요
    </span>
  </h2>

  <p>
    <span className="recommend-reveal-description">
      UMAMI BLACK은 Digestible 라인의 제품입니다. 
    </span>
    <br />
    <span className="recommend-reveal-description">
      발효의 깊은 결이 장의 흐름을 부드럽게 돕는, 진하지만 가벼운 마무리.
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
    <h2>통곡물 베이스의 묵직한 식사</h2>

    {/* <div className="detail-price">
      ₩ 6,500
    </div> */}
  </div>


            

<p
  id="mobile-purchase-description"
  className={`detail-description ${isPurchaseExpanded ? "expanded" : ""}`}
>

  정제되지 않은 통곡물을 그대로 담아, <br />
  씹을수록 고소함이 살아나는 밀도 높은 식감을 구현했습니다. <br />
  가벼운 스낵이 아닌, 진정한 식사로서의 만족감을 선사합니다.
</p>



            <div className="detail-tags">
              <span>복합 탄수화물</span>
              <span className="bar">|</span>
              <span>완두 단백질</span>
              <span className="bar">|</span>
              <span>식이섬유 12g</span>
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



            <div className="detail-price">
  ₩ 6,500
</div>

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

export default WholeGrainSuede;
