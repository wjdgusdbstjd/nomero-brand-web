import {
  HashRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Magazine from "./pages/Magazine";
import Article from "./pages/Article";
import WholeGrainSuede from "./pages/WholeGrainSuede";
import UmamiBlack from "./pages/UmamiBlack";
import VitaminWedge from "./pages/VitaminWedge";

import "./App.css";


function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  

  // ===================================
  // HEADER - SMART SCROLL INTERACTION
  // ===================================

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    let isHidden = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      // 페이지 최상단에서는 항상 헤더 표시
      if (currentScrollY <= 80) {
        isHidden = false;
        header.classList.remove("header-hidden");
      }

      // 작은 스크롤 움직임에는 반응하지 않음
      else if (Math.abs(difference) > 5) {
        if (difference > 0 && !isHidden) {
          // 아래로 스크롤 → 헤더 숨기기
          isHidden = true;
          header.classList.add("header-hidden");
        } else if (difference < 0 && isHidden) {
          // 위로 스크롤 → 헤더 표시
          isHidden = false;
          header.classList.remove("header-hidden");
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  // 페이지 이동 시 헤더 다시 표시
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    header.classList.remove("header-hidden");
  }, [pathname]);

  
useEffect(() => {
  // HOME 페이지에서만 헤더 등장 애니메이션 실행
  if (pathname !== "/") return;

  const header = headerRef.current;
  if (!header) return;

  const ctx = gsap.context(() => {

      const tl = gsap.timeline();

      // 01. 로고 등장
      
tl.from(".logo", {
  y: 15,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  clearProps: "transform",
});


      // 02. 메뉴 순차 등장
      tl.from(
        ".nav-link",
        {
          y: 12,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // 03. 헤더 하단 구분선 등장
      tl.fromTo(
        header,
        { "--header-line-scale": 0 },
        {
          "--header-line-scale": 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.9"
      );
    }, header);

    
return () => ctx.revert();
}, [pathname]);


  return (
    <header className="header" ref={headerRef}>
      <NavLink to="/" className="logo">
        ✳
      </NavLink>

      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          SHOP
        </NavLink>

        <NavLink
          to="/magazine"
          className={({ isActive }) =>
            isActive || pathname.startsWith("/article/")
              ? "nav-link active"
              : "nav-link"
          }
        >
          MAGAZINE
        </NavLink>
      </nav>
    </header>
  );
}



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <HashRouter>
      <ScrollToTop />

      <Header />

      <main className="page">
        <Routes>
  <Route path="/" element={<Home />} />

  <Route path="/shop" element={<Shop />} />

  <Route
  path="/shop/savory-green"
  element={<ProductDetail />}
          />
          <Route
  path="/shop/whole-grain-suede"
  element={<WholeGrainSuede />}
          />
          <Route path="/shop/umami-black" element={<UmamiBlack />} />
          <Route
  path="/shop/vitamin-wedge"
  element={<VitaminWedge />}
/>

  <Route path="/magazine" element={<Magazine />} />

  {/* MAGAZINE 기사 상세 페이지 */}
  <Route path="/article/4" element={<Article />} />

  {/* 존재하지 않는 페이지 */}
  <Route
    path="*"
    element={<h2>페이지를 찾을 수 없습니다.</h2>}
  />
</Routes>
      </main>
    </HashRouter>
  );
}

export default App;