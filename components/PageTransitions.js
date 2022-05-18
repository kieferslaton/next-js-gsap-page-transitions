import styled, { keyframes } from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { SwitchTransition } from "react-transition-group";

const MainComponent = styled.div`
  background: white;
`;

const PageTransitions = ({ children, route, routingPageOffset }) => {
  const [transition, setTransition] = useState();

  const handleExit = (e, routingPageOffset, route) => {
    setTransition(true);
    gsap
      .timeline()
      .set(e, {
        y: -routingPageOffset,
      })
      .to(e, {
        scale: 0.7,
        duration: 0.5,
      })
      .to(e, {
        xPercent: -100,
        duration: 0.5,
      });
  };

  const handleEnter = (e) => {
    const q = gsap.utils.selector(e);
    gsap
      .timeline()
      .from(e, {
        xPercent: 100,
        duration: 0.5,
      })
      .from(e, {
        scale: 0.7,
        duration: 0.5,
      })
      .from(q("h1"), {
        autoAlpha: 0,
        xPercent: 10,
      });
  };

  return (
    <div className={transition && "transitioning"}>
      <SwitchTransition>
        <CSSTransition
          key={route}
          classNames={`page`}
          timeout={1000}
          onEnter={handleEnter}
          onExit={(e) => handleExit(e, routingPageOffset, route)}
          onEntered={() => setTransition(false)}
        >
          <MainComponent>{children}</MainComponent>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default PageTransitions;
