import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Magazine.css";

gsap.registerPlugin(ScrollTrigger);

const magazineArticles = [
  {
    id: 1,
    category: "EAT",
    title: "마감과 점심 사이",
    series: "EAT - SERIES 1. <한 끼의 무게>",
    image: "/images/magazine/magazine-01.png",
  },
  {
    id: 2,
    category: "EAT",
    title: "집밥에서 8년쯤 멀어졌다",
    series: "EAT - SERIES 2. <한 끼의 무게>",
    image: "/images/magazine/magazine-02.png",
  },
  {
    id: 3,
    category: "EARTH",
    title: "우리가 먹은 만큼의 숲",
    series: "EARTH - SERIES 1. <오늘의 식탁, 오늘의 지구>",
    image: "/images/magazine/magazine-03.png",
  },
  {
    id: 4,
    category: "EARTH",
    title: "좋은 한 끼의 다음 기준",
    series: "EARTH - SERIES 2. <오늘의 식탁, 오늘의 지구>",
    image: "/images/magazine/magazine-04.png",
  },
  {
    id: 5,
    category: "EARTH",
    title: "먹고 나면, 아무것도 남지 않게",
    series: "EARTH - SERIES 3. <오늘의 식탁, 오늘의 지구>",
    image: "/images/magazine/magazine-05.png",
  },
  {
    id: 6,
    category: "LIFE",
    title: "운동선수의 시즌 오프 식단 24시간",
    series: "LIFE - SERIES 1. <한 사람의 식탁>",
    image: "/images/magazine/magazine-06.png",
  },
  {
    id: 7,
    category: "LIFE",
    title: "서른 번의 하루, NOMERO와",
    series: "LIFE - SERIES 2. <한 사람의 식탁>",
    image: "/images/magazine/magazine-07.png",
  },
  {
    id: 8,
    category: "LIFE",
    title: "혼자 먹는 식탁의 소리",
    series: "LIFE - SERIES 3. <한 사람의 식탁>",
    image: "/images/magazine/magazine-08.png",
  },
];

const categories = [
  { label: "전체보기", value: "ALL" },
  { label: "EAT", value: "EAT" },
  { label: "EARTH", value: "EARTH" },
  { label: "LIFE", value: "LIFE" },
];

function Magazine() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const magazineIntroRef = useRef(null);

  const magazineGridRef = useRef(null);

  const categoryContainerRef = useRef(null);
  const categoryUnderlineRef = useRef(null);

  const filteredArticles =
    activeCategory === "ALL"
      ? magazineArticles
      : magazineArticles.filter(
          (article) => article.category === activeCategory
      );
  
  const changeCategory = (category) => {
  if (category === activeCategory) return;

  const grid = magazineGridRef.current;

  if (!grid) {
    setActiveCategory(category);
    return;
  }

  // 기존 페이드 애니메이션 중복 방지
  gsap.killTweensOf(grid);

  // 기존 기사 목록 사라짐
  gsap.to(grid, {
    opacity: 0,
    duration: 0.2,
    ease: "power2.in",

    onComplete: () => {
      setActiveCategory(category);
    },
  });
};
  
  // ===================================
// INTERACTION 02
// MAGAZINE INTRO REVEAL
// ===================================

useEffect(() => {
  const intro = magazineIntroRef.current;
  if (!intro) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    // 01. MAGAZINE 타이틀
    tl.fromTo(
      ".magazine-title",
      {
        opacity: 0,
        y: 55,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
      }
    )

    // 02. 카테고리 순차 등장
    .fromTo(
      ".magazine-category",
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
      },
      "-=0.65"
    )

    // 03. 소개 문구 등장
    .fromTo(
      ".magazine-description",
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      },
      "-=0.35"
    );
  }, intro);

  return () => ctx.revert();
}, []);
  
  
  
  // ===================================
// INTERACTION 03
// MAGAZINE CARD SIMPLE REVEAL
// ===================================

useEffect(() => {
  const grid = magazineGridRef.current;
  if (!grid) return;

  // 카테고리 변경 후 그리드 다시 표시
  gsap.set(grid, { opacity: 1 });

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray(".magazine-card");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    ScrollTrigger.refresh();

  }, grid);

  return () => ctx.revert();
}, [activeCategory]);
  
  
  // ===================================
// INTERACTION 04-1
// CATEGORY UNDERLINE SLIDE
// ===================================

useEffect(() => {
  const container = categoryContainerRef.current;
  const underline = categoryUnderlineRef.current;

  if (!container || !underline) return;

  const activeButton = container.querySelector(
    ".magazine-category.active"
  );

  if (!activeButton) return;

  const containerRect = container.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();

  const left = buttonRect.left - containerRect.left;
  const width = buttonRect.width;

  gsap.to(underline, {
    x: left,
    width: width,
    duration: 0.55,
    ease: "power3.out",
  });
}, [activeCategory]);

  return (
    <main className="magazine-page">

      {/* MAGAZINE 상단 영역 */}
      <section className="magazine-intro" ref={magazineIntroRef}>
        <h1 className="magazine-title">MAGAZINE</h1>

        <div
  className="magazine-categories"
  ref={categoryContainerRef}
>
  {categories.map((category) => (
    <button
      key={category.value}
      type="button"
      className={`magazine-category ${
        activeCategory === category.value ? "active" : ""
      }`}
      onClick={() => changeCategory(category.value)}
    >
      {category.label}
    </button>
  ))}

  {/* 카테고리를 따라 움직이는 밑줄 */}
  <span
    className="magazine-category-underline"
    ref={categoryUnderlineRef}
    aria-hidden="true"
  />
</div>

        <p className="magazine-description">
          노메로 매거진은 브랜드의 언어로 오늘의 식문화를 기록합니다. 한 끼가 만들어내는 감각의 순간부터, 그 선택이 이어지는 일상의 결, 그리고 지구를 향한 흐름까지 노메로 매거진은 브랜드가 걸어가는 길과 함께, 새로운 식문화가 어떻게 우리의 일상을 채워가는지를 함께 기록해나가는 공간입니다.
        </p>
      </section>

      {/* 매거진 기사 목록 */}
      <section className="magazine-list">
        <div className="magazine-grid" ref={magazineGridRef}>
          {filteredArticles.map((article) => (
            <Link
              to={article.id === 4 ? "/article/4" : "/magazine"}
              className="magazine-card"
              key={article.id}
            >
              <div className="magazine-card-image">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="magazine-card-info">
                <h2>{article.title}</h2>
                <p>{article.series}</p>
              </div>
            </Link>
          ))}

          
        </div>
      </section>

    </main>
  );
}

export default Magazine;