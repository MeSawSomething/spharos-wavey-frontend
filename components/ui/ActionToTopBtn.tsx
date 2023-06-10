import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./ActionToTopBtn.module.css";

export default function CloseOrSlideBtn(props: { onClick?: () => void }) {

   const [scrollY, setScrollY] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }

  useEffect(() => {
    if (scrollY > 100) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [scrollY])


return (
  <div className={isActive ? `${style.scrollWrap} ${style.active}` : `${style.scrollWrap} ${style.close}`}>
    <div className={style.scrollBtn} onClick={handleTopClick}>
      <Image
        src="/assets/images/icons/chevrons-up.svg"
        alt="actionToTopButton"
        width={20}
        height={20}
        priority
      />
    </div>
  </div>
)
}