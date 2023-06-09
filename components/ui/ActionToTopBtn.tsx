import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./ActionToTopBtn.module.css";

export default function CloseOrSlideBtn(props: { onClick?: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 300;
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enable smooth scrolling
    });
  };

  return (
    <div className={isVisible ? style.actionToTop : `${style.actionToTop} ${style.hidden}`} onClick={handleTopClick}>
      <div className={style.imgWrap}>
        <Image
          src="/assets/images/icons/chevrons-up.svg"
          width={200}
          height={200}
          alt="slideDownBtn"
        />
      </div>
    </div>
  );
}
