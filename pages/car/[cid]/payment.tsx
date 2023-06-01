import { BookListDataType } from "@/types/carDataType";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function payment() {
  const router = useRouter();
  const vehicleId = router.query.cid;
  const [bookIdData, setBookIdData] = useState<string | null>();
  const [bookData, setBookData] = useState<BookListDataType>();
  const [uidData, setUidData] = useState<string>();

  const state = {
    next_redirect_pc_url: "",
    tid: "",
    params: {},
  };

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      setUidData(uid);
    }
  }, []);

  useEffect(() => {
    console.log("결제페이지에서 예약번호조회22", bookIdData);
    if (bookIdData !== undefined) {
      const getBookData = async () => {
        console.log("결제페이지에서 예약번호조회33", bookIdData);
        const res = await fetch(
          `https://api-billita.xyz/booklist/information/${bookIdData}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setBookData(data);
      };
      getBookData();
    }
  }, [bookIdData]);
  
  const requestParameter = {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: bookData?.carName,
    quantity: 1,
    total_amount: bookData?.defaultPrice,
    tax_free_amount: 0,
    approval_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/approval`,
    fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/cancel`,
  };

  console.log("RequestParameter", requestParameter);

  useEffect(() => {
    const bookId = sessionStorage.getItem("bookId");
    if (bookId !== undefined) {
      setBookIdData(bookId);
      console.log("결제페이지에서 예약번호조회11", bookIdData, bookId);
      console.log(typeof bookIdData);
    }
  }, []);

  useEffect(() => {
    const getPaymentReady = async () => {
      console.log("test");
      const res = await axios.post(
        `https://kapi.kakao.com/v1/payment/ready`,
        requestParameter,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      console.log(res);
      state.next_redirect_pc_url = res.data.next_redirect_pc_url;
      state.tid = res.data.tid;
      state.params = res.data.params;
      console.log(state);
      window.location.href = state.next_redirect_pc_url;
    };
    getPaymentReady();
  }, [bookData]);

  const paymentRequestBody = {
    uuid: uidData,
    vehicleId: vehicleId,
    carName: bookData?.carName,
    carBrandName: bookData?.carBrand,
    startDate: bookData?.startDate,
    endDate: bookData?.endDate,
    startZone: bookData?.billitaZone,
    returnZone: bookData?.billitaZone,
    price: bookData?.defaultPrice, //추후 바꿔야함
    insuranceId: bookData?.insuranceId,
  };

  return <div>payment test page</div>;
}
