import React from "react";
import Image from "next/image";
import style from "./RentalMiddle.module.css";
import Separator from "@/components/ui/Separator";
import { rentalDataType } from "@/types/rentalDataType";

export default function RentalMiddle(props: { data: rentalDataType }) {
  const data = props.data;
  console.log(props.data);
  const startDate = data.startDate.split("-");
  const endDate = data.endDate.split("-");


  return (
    <div className={style.middleWrap}>
      <div className={style.subWrap}>
        <div className={style.subtitle}>주행요금</div>
        <div className={style.fare}>{data.distancePrice}원/km</div>
      </div>
      <div className={style.description}>
        *주행요금은 반납 후 실주행거리에 따라 별도로 청구됩니다.
      </div>

      <Separator gutter={1.8} />

      <div className={style.subtitle}>대여시간</div>
      <div className={style.subWrap}>
        <div className={style.content}>
          {startDate[1]}월 {startDate[2]}일 {data.startTime} <span>- </span>
          {endDate[1]}월 {endDate[2]}일 {data.endTime}
        </div>
        <div className={style.subtitle}>총 1일 00시간</div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>주차장소</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여위치</div>
        <div className={style.arrowWrap}>
          <div className={style.location}>{data.billitazone}</div>
          <div className={style.arrow}>
            <Image
              src="/assets/images/icons/rightArrowGreyBold.svg"
              width="10"
              height="10"
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <div className={style.subWrap}>
        <div className={style.content}>반납위치</div>
        <div className={style.arrowWrap}>
          <div className={style.location}>{data.billitazone}</div>
          <div className={style.arrow}>
            <Image
              src="/assets/images/icons/rightArrowGreyBold.svg"
              width="10"
              height="10"
              alt="arrow"
            />
          </div>
        </div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>결제정보</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여요금</div>
        <div className={style.subtitle}>{data.defaultTimePrice.toLocaleString('kr-KO')}원</div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>결제수단</div>
      <div className={style.subWrap}>
        <div className={style.kakaopay}>카카오페이</div>
        <div className={style.subtitle}>{data.defaultTimePrice.toLocaleString('kr-KO')}원</div>
      </div>
    </div>
  );
}