import React from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";
import axios from "axios";

export default function DetailLayout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const cid = router.query.cid;
  const handleLicensePage = () => {
    router.push(`/car/${cid}/license`);
    sessionStorage.removeItem("carDetail");
  };

  const handleLoginPage = () => {
    sessionStorage.setItem("carDetail", `car/${cid}`);
    router.push("/login");
  };

  const swalPopLoginToGo = () => {
    Swal.fire({
      text: "로그인이 필요합니다.",
      icon: "success",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    });
  };

  
  const handleCheckCanBook = () => {
    // 예약가능여부 확인 api
    alert("예약가능여부 해당 스텝에서 확인");

    // const getCanBook = async () => {
    //   const token = "Bearer " + localStorage.getItem("Authorization");
    //   const uid = localStorage.getItem("uid");
    //   await fetch(
    //     `https://api-billita.xyz/rental/can-rental`, {
    //       method: "GET",
    //       headers: {
    //         Authorization: token,
    //         uid: uid,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if(res.status === true) // 이건 res 찍어보고 수정해야함
    //       console.log("예약가능");
    //   })
      
  };

  const isLogin = () => {
    if (
      !localStorage.getItem("Authorization") &&
      !localStorage.getItem("uid")
    ) {
      swalPopLoginToGo();
      handleLoginPage();
    } else {
      handleCheckCanBook();
      handleLicensePage();
    }
  };
  const handleCheckNextStep = () => {
    isLogin();
  };

  return (
    <>
      <DetailHeader />
      <div>{props.children}</div>
      <BottomFixedContainer backgroundColor="transparent">
        <Button
          btnType={"button"}
          btnEvent={() => handleCheckNextStep()}
          shadow={true}
        >
          예약하기
        </Button>
      </BottomFixedContainer>
    </>
  );
}
