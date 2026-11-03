


import {
  Fragment,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";

import {
  Link,
  useLocation,
  useNavigationType,
} from "react-router-dom";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Shop.css";

gsap.registerPlugin(ScrollTrigger);


// 카테고리별 상품과 설명
const shopCategories = {
  meal: {
    label: "MEAL",
    description:
      "단순한 대응식을 넘어, 묵직한 포만감과 완벽한 영양 밸런스를 갖춘 정석적인 식사 라인입니다. 통곡물의 거친 식감과 깊은 풍미를 살려, 식사 시간이 주는 심리적 만족감까지 놓치지 않았습니다. 흔들리지 않는 하루의 중심을 잡고 싶을 때 선택하세요.",
    products: [
      {
        id: "whole-grain-suede",
        name: "Whole Grain Suede",
        image: "/images/products/meal-1.png",
      },
      {
        id: "iron-red",
        name: "Iron Red",
        image: "/images/products/meal-2.png",
      },
      {
        id: "nutty-terrine",
        name: "Nutty Terrine",
        image: "/images/products/meal-3.png",
      },
      {
        id: "clean-white",
        name: "Clean White",
        image: "/images/products/meal-4.png",
      },
      {
        id: "sweet-root",
        name: "Sweet Root",
        image: "/images/products/meal-5.png",
      },
      {
        id: "protein-marble",
        name: "Protein Marble",
        image: "/images/products/meal-6.png",
      },
    ],
  },

  
digestible: {
  label: "DIGESTIBLE",
  description:
    "Digestible Line은 소화 불량과 장내 불균형으로 일상의 리듬을 잃어버린 이들을 위해 설계되었습니다. 장이 편안해질 때 비로소 우리 몸의 모든 감각은 선명해집니다. 단순히 소화가 잘되는 성분을 넣는 것에 그치지 않고, 장내 환경을 근본적으로 개선하는 메커니즘을 담았습니다.",
  products: [
    {
      id: "fiber-cube",
      name: "Fiber Cube",
      image: "/images/products/Digestible-1.png",
    },
    {
      id: "forest-green",
      name: "Forest Green",
      image: "/images/products/Digestible-2.png",
    },
    {
      id: "icy-white",
      name: "Icy White",
      image: "/images/products/Digestible-3.png",
    },
    {
      id: "savory-green",
      name: "Savory Green",
      image: "/images/products/Digestible-4.png",
    },
    {
      id: "umami-black",
      name: "Umami Black",
      image: "/images/products/Digestible-5.png",
    },
  ],
},


  
snack: {
  label: "SNACK BOOSTER",
  description:
    "업무 사이의 짧은 휴식, 이동 중인 지하철, 혹은 밤샘 작업 중. 에너지가 고갈되는 순간을 놓치지 않고 즉각적인 부스트를 제공합니다. 단순한 당 충전이 아닌, 지속 가능한 활력을 위해 설계된 영양 레이어링을 경험하세요.",
  products: [
    {
      id: "spicy-amber",
      name: "Spicy Amber",
      image: "/images/products/snack-1.png",
    },
    {
      id: "clear-gold",
      name: "Clear Gold",
      image: "/images/products/snack-2.png",
    },
    {
      id: "sweet-berry",
      name: "Sweet Berry",
      image: "/images/products/snack-3.png",
    },
    {
      id: "purple-essense",
      name: "Purple Essense",
      image: "/images/products/snack-4.png",
    },
    {
      id: "velvet-opaque",
      name: "Velvet Opaque",
      image: "/images/products/snack-5.png",
    },
  ],
},


  
body: {
  label: "BODY HEALTHY",
  description:
    "Body Healthy는 운동을 즐기는 사용자나 기초 체력을 재건하고자 하는 이들을 위해, 단백질과 미네랄을 가장 효율적으로 골격근에 전달하도록 설계되었습니다.",
  products: [
    {
      id: "protein-slab",
      name: "Protein Slab",
      image: "/images/products/body-1.png",
    },
    {
      id: "vitamin-wedge",
      name: "Vitamin Wedge",
      image: "/images/products/body-2.png",
    },
    {
      id: "liquid-core",
      name: "Liquid Core",
      image: "/images/products/body-3.png",
    },
    {
      id: "carb-block",
      name: "Carb Block",
      image: "/images/products/body-4.png",
    },
    {
      id: "mineral-spike",
      name: "Mineral Spike",
      image: "/images/products/body-5.png",
    },
  ],
},

};


function Shop() {
  
const location = useLocation();
const navigationType = useNavigationType();

const shopStateKey = `nomero-shop:${location.key}`;

const shouldRestore = navigationType === "POP";

const [activeCategory, setActiveCategory] = useState(() => {
  if (shouldRestore) {
    const saved = sessionStorage.getItem(shopStateKey);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (shopCategories[parsed.category]) {
        return parsed.category;
      }
    }
  }

  return "meal";
});



  const shopIntroRef = useRef(null);
  const shopGridRef = useRef(null);
  const shopTabsRef = useRef(null);
const shopUnderlineRef = useRef(null);

  const currentCategory = shopCategories[activeCategory];




/* ===================================
   SHOP - HISTORY STATE RESTORE
=================================== */

const saveShopState = () => {
  sessionStorage.setItem(
    shopStateKey,
    JSON.stringify({
      category: activeCategory,
      scrollY: window.scrollY,
    })
  );
};

  
  
const latestShopState = useRef(null);

latestShopState.current = {
  category: activeCategory,
  key: shopStateKey,
};

useEffect(() => {
  return () => {
    const latest = latestShopState.current;
    if (!latest) return;

    sessionStorage.setItem(
      latest.key,
      JSON.stringify({
        category: latest.category,
        scrollY: window.scrollY,
      })
    );
  };
}, []);


useLayoutEffect(() => {
  if (!shouldRestore) {
    window.scrollTo(0, 0);
    return;
  }

  const saved = sessionStorage.getItem(shopStateKey);
  if (!saved) return;

  const { scrollY = 0 } = JSON.parse(saved);

  const frame = requestAnimationFrame(() => {
    window.scrollTo({
      top: scrollY,
      behavior: "instant",
    });
  });

  return () => cancelAnimationFrame(frame);
}, [shopStateKey, shouldRestore]);



// ===================================
// INTERACTION 03
// CATEGORY CHANGE FADE
// ===================================

  useEffect(() => {
  saveShopState();
}, [activeCategory]);

  
  

const changeCategory = (category) => {
  if (category === activeCategory) return;

  

  const grid = shopGridRef.current;


  if (!grid) {
    setActiveCategory(category);
    return;
  }

  gsap.killTweensOf(grid);

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
  // INTERACTION 01
  // SHOP INTRO REVEAL
  // ===================================

  useEffect(() => {
    const intro = shopIntroRef.current;
    if (!intro) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // 01. SHOP 타이틀
      tl.fromTo(
        ".shop-title",
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
        ".shop-tab",
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

      // 03. 카테고리 설명 등장
      .fromTo(
        ".shop-description",
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
  // INTERACTION 02
  // SHOP PRODUCT CARD REVEAL
  // ===================================

  useEffect(() => {
    const grid = shopGridRef.current;
if (!grid) return;

// 카테고리 변경 후 제품 목록 다시 표시
gsap.set(grid, { opacity: 1 });

const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(
        ".shop-product:not(.shop-product-empty)",
        grid
      );

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
  // INTERACTION 04
  // SHOP CATEGORY UNDERLINE SLIDE
  // ===================================

  useEffect(() => {
    const container = shopTabsRef.current;
    const underline = shopUnderlineRef.current;

    if (!container || !underline) return;

    const updateUnderline = () => {
      const activeButton = container.querySelector(
        ".shop-tab.active"
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
        overwrite: "auto",
      });
    };

    updateUnderline();

    // 화면 크기가 바뀌어도 밑줄 위치 유지
    window.addEventListener("resize", updateUnderline);

    return () => {
      window.removeEventListener("resize", updateUnderline);
      gsap.killTweensOf(underline);
    };
  }, [activeCategory]);


  return (
    <div className="shop-page" ref={shopIntroRef}>
      <h1 className="shop-title">SHOP</h1>

      
      
      
{/* 카테고리 메뉴 */}
<div className="shop-tabs" ref={shopTabsRef}>
  {Object.entries(shopCategories).map(([key, category]) => (
    <button
      key={key}
      type="button"
      className={`shop-tab ${
        activeCategory === key ? "active" : ""
      }`}
      onClick={() => changeCategory(key)}
    >
      {category.label}
    </button>
  ))}

  {/* 선택된 카테고리를 따라 움직이는 밑줄 */}
  <span
    className="shop-tab-underline"
    ref={shopUnderlineRef}
    aria-hidden="true"
  />
</div>


      {/* 카테고리 설명 */}
      <p className="shop-description">
        {currentCategory.description}
      </p>

      {/* 상품 목록 */}
      
<div
  className={`shop-grid shop-grid-${activeCategory}`}
  ref={shopGridRef}
>
  {currentCategory.products.map((product, index) => (
    <Fragment key={product.id}>
      {(
  (["digestible", "snack"].includes(activeCategory) && index === 4) ||
  (activeCategory === "body" && index === 1)
) && (
  <div className="shop-product shop-product-empty">
    <div className="shop-product-name">
      &nbsp;
    </div>

    <div className="shop-product-image"></div>
  </div>
)}

      


<Link
  to={`/shop/${product.id}`}
  className="shop-product"
  onClick={(e) => {
    const availableProducts = [
      "savory-green",
      "whole-grain-suede",
      "umami-black",
      "vitamin-wedge",
    ];

    if (!availableProducts.includes(product.id)) {
      e.preventDefault();
      return;
    }

    saveShopState();
  }}
>



        <div className="shop-product-name">
          {product.name}
        </div>

        <div className="shop-product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>
      </Link>
    </Fragment>
  ))}
</div>

    </div>
  );
}

export default Shop;
