import { locationState } from "@/state/location";
import { timeState } from "@/state/rentalTime";
import { locationType } from "@/types/location";
import { timeType } from "@/types/rentalDataType";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";

export default function KakaoMap() {
  // 사용자 위치
  const [currentLat, setCurrentLat] = useState<number>(0);
  const [currentLng, setCurrentLng] = useState<number>(0);

  // 초기에 지도가 포커스 되는 위치
  const [initLoc, setInitLoc] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });

  // 차량 세부에서 넘어올 경우 차량의 위치(리코일)
  const [carLocation, setCarLocation] = useRecoilState(locationState);

  // 사용자가 지도를 움직였을 때 센터의 위치
  const [center, setCenter] = useState({
    latitude: 0,
    longitude: 0,
  });

  // api로 이용가능 차량 조회할 때 쓸 위치 - default: 초기 지도 포커스 위치
  const [reqLocation, setReqLocation] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });

  const [zoneList, setZoneList] = useState();
  const [recoilTime, setRecoilTime] = useRecoilState<timeType>(timeState);

  const router = useRouter();

  console.log("recoil로 넘어온 차 위치 : ", carLocation);

  useEffect(() => {
    setRecoilTime({
      startTime: dayjs().format("YYYY-MM-DD HH:mm"),
      endTime: dayjs().add(2, "hour").format("YYYY-MM-DD HH:mm"),
    });
  }, []);
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const time = new Date(position.timestamp);
            setCurrentLat(position.coords.latitude);
            setCurrentLng(position.coords.longitude);
            if (carLocation.latitude == 0 && carLocation.longitude == 0) {
              setInitLoc({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            } else {
              setInitLoc({
                latitude: carLocation.latitude,
                longitude: carLocation.longitude,
              });
            }
            setRecoilTime({
              startTime: dayjs().format("YYYY-MM-DD HH:mm"),
              endTime: dayjs().add(2, "hour").format("YYYY-MM-DD HH:mm"),
            });
            setReqLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            console.log("렌더링됨");
            // console.log(`현재위도 : ${position.coords.latitude}`);
            // console.log(`현재경도 : ${position.coords.longitude}`);
            setCarLocation({
              latitude: 0,
              longitude: 0,
            });
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    };

    getLocation();
  }, []);

  const centerChangeHandler = (map: kakao.maps.Map) => {
    setCenter({
      latitude: map.getCenter().getLat(),
      longitude: map.getCenter().getLng(),
    });
    setReqLocation({
      latitude: center.latitude,
      longitude: center.longitude,
    });
  };

  console.log("init : ", initLoc);
  console.log("reqLoc : ", reqLocation);

  // console.log("세팅된 현재 위도 : ", currentLat);

  useEffect(() => {
    if (reqLocation.latitude !== 0 && reqLocation.longitude !== 0) {
      const getData = async () => {
        const result = await axios.get(
          `https://api-billita.xyz/billitazone/filter?sDate=${recoilTime.startTime}&eDate=${recoilTime.endTime}&lat=${reqLocation.latitude}&lng=${reqLocation.longitude}`
        );
        console.log("데이터: ", result);
        // console.log("센터 좌표 :", center);
        console.log("설정한 시간: ", recoilTime);
        console.log("reqLoc : ", reqLocation);
      };
      getData();
    }
  });

  console.log(recoilTime);
  const overLayClickHandler = () => {};

  return initLoc.latitude == 0 && initLoc.longitude == 0 ? (
    <></>
  ) : (
    <>
      <Map
        center={{ lat: initLoc.latitude, lng: initLoc.longitude }}
        style={{ width: "100%", height: "100vh" }}
        level={4}
        onCenterChanged={centerChangeHandler}
      >
        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
          // 커스텀 오버레이가 표시될 위치입니다
          position={{
            lat: currentLat - 0.001,
            lng: currentLng - 0.001,
          }}
        >
          {/* 커스텀 오버레이에 표시할 내용입니다 */}
          <div
            className="label"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "70%",
              color: "white",
              backgroundColor: "var(--billita-blue)",
              textAlign: "center",
            }}
            onClick={overLayClickHandler}
          >
            <span style={{ fontSize: "0.9rem", lineHeight: "40px" }}>3</span>
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
}
function setRecoilTime(arg0: { startTime: any; endTime: any }) {
  throw new Error("Function not implemented.");
}
