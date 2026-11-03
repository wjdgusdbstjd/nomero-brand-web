import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Article.css";

gsap.registerPlugin(ScrollTrigger);
const article = {
  category: "EARTH",
  title: "좋은 한 끼의 다음 기준",
  series: "EARTH - SERIES 2. <오늘의 식탁, 오늘의 지구>",
  date: "2026. 04. 16",
  author: "김정현",
  views: "3,250",
  image: "/images/magazine/magazine-04.png",
};

const paragraphs = [
  `라벨은 늘어나고, 약속은 많아졌다. 그런데 그 약속의 뒷면을 우리는 얼마나 알고 있을까.
마트의 진열대 앞에 서면, 이제는 익숙해진 문구들이 있다. 탄소중립. 저탄소. 넷제로. 친환경. 지속가능한. 라벨은 점점 늘어나고 있고, 색깔은 점점 초록에 가까워지고 있다. 마치 우리가 선택하는 한 끼가, 그 자체로 지구를 위한 결정이 될 수 있다고 말하는 것 같다.

그런데 이 라벨들의 뒷면을 들여다보면 이야기가 조금 달라진다. 탄소중립이라는 표현은 지금 이 순간에도 각기 다른 기준으로 쓰이고 있다. 어떤 브랜드는 원료 생산부터 유통, 폐기까지의 전 과정을 계산했다고 말하고, 어떤 브랜드는 생산 단계의 배출량만을 산정한다. 어떤 브랜드는 자체적으로 계산한 수치를 근거로 삼고, 어떤 브랜드는 제3자 인증기관의 검증을 받는다. 그리고 어떤 브랜드는, 실제로 배출량을 줄인 것이 아니라 다른 곳에 나무를 심거나 재생에너지 크레딧을 구매하는 방식으로 상쇄의 개념을 사용해 그 라벨을 얻는다.

같은 말인 것처럼 보이지만, 그 안에 담긴 실제의 무게는 다르다.
문제는 이 차이를 소비자가 알기 어렵다는 데 있다. 마트의 진열대 앞에서 라벨의 계산법을 확인할 수 있는 사람은 많지 않다. 우리는 대개 그 초록의 표시 하나를 믿고, 그것으로 우리 선택의 결이 지구를 향해 조금은 가벼워졌다고 안심한다. 라벨의 언어는 늘어났지만, 그 언어를 해석하는 문법은 아직 만들어지지 않았다.

세계 각국은 이 문법을 만들어가는 중이다. 유럽연합은 최근 몇 년 사이 탄소중립이나 넷제로 같은 마케팅 표현이 근거 없이 쓰이는 것을 규제하기 시작했다. 소비자가 오해할 수 있는 친환경 표현을 함부로 사용하지 못하도록 하는 방향이다. 국제 표준화 기구는 제품의 탄소 발자국을 계산하는 기준을 정하는 작업을 이어오고 있고, 국내에서도 저탄소 인증 제도가 운영되고 있지만 그 인증이 얼마나 엄격한지, 어떤 항목까지를 다루는지는 여전히 논의 중이다. 기준은 여러 개가 있고, 그 사이의 간극도 있다.

기준이 여럿이라는 사실은 우리에게 두 가지를 알려준다. 하나는 이 문제가 아직 완성되지 않은 논의 안에 있다는 것. 다른 하나는 소비자가 무엇을 믿고 무엇을 의심해야 할지, 스스로 판단해야 하는 몫이 여전히 크다는 것.
노메로 역시 이 질문 앞에 서 있다. 

우리는 한 끼가 만들어내는 탄소를 계산하고, 그 수치를 나무 그루 수와 자동차 주행 거리 같은 감각적인 단위로 환산해 보여준다. 그 계산의 근거는 국립산림과학원의 표준 탄소흡수량과 환경부의 배출계수 같은, 국내에서 통용되는 공식적인 자료다. 그러나 우리는 안다. 이 계산 방식이 세상의 모든 기준을 대신할 수는 없다는 것을. 어떤 방식으로 어디까지를 산정할지, 그 선택 자체가 이미 하나의 관점이라는 것을.

그래서 우리가 던지고 싶은 질문은 이것이다. 탄소중립 식품의 기준은 누가 정하는가. 정부인가, 국제 기구인가, 인증 기관인가, 아니면 브랜드 스스로인가. 그리고 그 기준이 여럿일 때, 우리는 무엇을 근거로 오늘의 한 끼를 선택하는가.

이 질문에 지금 완전한 답을 내릴 수 있는 사람은 없다. 그러나 답을 내릴 수 없다는 사실 자체가 중요한 정보다. 지금 우리가 마주하는 초록의 라벨들은 완성된 약속이 아니라, 만들어지고 있는 대화의 한 순간이다. 소비자의 신뢰가 쌓여가고, 기업의 계산이 정교해지고, 규제의 문법이 다듬어지는 그 대화의 한복판에 우리는 서 있다.

그렇다면 오늘의 우리에게 남는 몫은 무엇일까. 라벨을 무조건 의심하는 것도, 무조건 믿는 것도 답이 아닐지 모른다. 대신 라벨의 뒷면을 궁금해하는 태도, 그 계산이 어디서 왔는지 묻는 습관, 그리고 우리가 매일 하는 한 끼의 선택이 어떤 방식으로 그 대화 안에 들어가고 있는지를 감각하는 것. 그 정도가 지금 우리가 시작할 수 있는 자리다.
기준은 아직 완성되지 않았다. 그러나 기준을 함께 만들어가는 일은, 마트의 진열대 앞에서 라벨을 한 번 더 들여다보는 순간부터 시작될 수 있다.`,
];

function Article() {
  const articleRef = useRef(null);
  const progressRef = useRef(null);
  const [showTopButton, setShowTopButton] = useState(false);

  // ===================================
  // INTERACTION 01
  // ARTICLE HEADING REVEAL
  // ===================================

  useEffect(() => {
    const articlePage = articleRef.current;
    if (!articlePage) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        ".article-heading-left",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }
      )
        .fromTo(
          ".article-heading-right h1",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.4"
        )
        .fromTo(
          ".article-series",
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4"
        );
    }, articlePage);

    return () => ctx.revert();
  }, []);

  // ===================================
  // INTERACTION 02
  // ARTICLE PARAGRAPH FADE
  // ===================================

  useEffect(() => {
    const articlePage = articleRef.current;
    if (!articlePage) return;

    const ctx = gsap.context(() => {
      const paragraphs = gsap.utils.toArray(".article-body p");

      paragraphs.forEach((paragraph) => {
        gsap.fromTo(
          paragraph,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, articlePage);

    return () => ctx.revert();
  }, []);

  // ===================================
  // INTERACTION 03
  // READING PROGRESS + TOP BUTTON
  // ===================================

  useEffect(() => {
    const articlePage = articleRef.current;
    const progress = progressRef.current;

    if (!articlePage || !progress) return;

    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progressValue =
        scrollableHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / scrollableHeight))
          : 0;

      gsap.set(progress, {
        scaleX: progressValue,
      });

      setShowTopButton(scrollTop > 500);
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="article-page" ref={articleRef}>

      {/* READING PROGRESS */}
<div className="article-progress" aria-hidden="true">
  <div
    className="article-progress-bar"
    ref={progressRef}
  />
      </div>
      

      <section className="article-heading">
        <div className="article-heading-left">
          <Link to="/magazine" className="article-back">
            MAGAZINE
          </Link>

          <span className="article-heading-divider">|</span>
          <span className="article-category">{article.category}</span>
        </div>

        <div className="article-heading-right">
          <h1>{article.title}</h1>
          <span className="article-series">{article.series}</span>
        </div>
      </section>

      <article className="article-content">
        <div className="article-meta">
          <div className="article-meta-item">
            <span>Year</span>
            <strong>{article.date}</strong>
          </div>

          <div className="article-meta-item">
            <span>Author</span>
            <strong>{article.author}</strong>
          </div>

          <div className="article-meta-item">
            <span>Views</span>
            <strong>{article.views}</strong>
          </div>
        </div>

        <div className="article-hero">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="article-body">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="article-footer">
          <h5>
            &lt;지구의 결&gt;은 노메로 매거진이 발행하는 에세이
            시리즈입니다. 한 끼의 선택이 개인과 지구 사이에 남기는
            결을 감각적으로 기록합니다.
          </h5>

          <div className="line"></div>

          <p>Editor. 김정현 Photography by Chat GPT</p>
        </footer>
            </article>

      {/* BACK TO TOP */}
      <button
        type="button"
        className={`article-top-button ${showTopButton ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="페이지 맨 위로 이동"
      >
        TOP
        {/* <span aria-hidden="true">↑</span> */}
      </button>

    </main>
  );
}

export default Article;