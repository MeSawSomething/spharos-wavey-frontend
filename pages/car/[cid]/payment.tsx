import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BookListDataType } from "@/types/carDataType";
import PageLoader from "@/components/ui/PageLoader";

export default function Payment() {
  const router = useRouter();
  const vehicleId = router.query.cid;
  const [bookIdData, setBookIdData] = useState<string | null>();
  const [bookData, setBookData] = useState<BookListDataType>();
  const [uidData, setUidData] = useState<string>();
  const [userToken, setUserToken] = useState<string>();

  const state = {
    next_redirect_pc_url: "",
    tid: "",
    params: {},
  };

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const token = localStorage.getItem("Authorization");
    if (uid !== undefined && uid !== null) {
      setUidData(uid);
    }
    if (token !== undefined && token !== null) {
      setUserToken(token);
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

  const readyRequestBody = {
    uuid: uidData,
    vehicleId: Number(vehicleId),
    carName: bookData?.carName,
    carBrandName: bookData?.carBrand,
    startDate: bookData?.startDate,
    endDate: bookData?.endDate,
    startZone: 1, //typeError
    returnZone: 1,
    price: bookData?.defaultPrice, //추후 바꿔야함
    insuranceId: bookData?.insuranceId,
    reward: 1000,
  };

  console.log("readyRequestBody", readyRequestBody);

  useEffect(() => {
    const bookId = sessionStorage.getItem("bookId");
    if (bookId !== undefined) {
      setBookIdData(bookId);
      console.log("결제페이지에서 예약번호조회11", bookIdData, bookId);
    }
  }, []);

  useEffect(() => {
    if (bookData !== undefined) {
      const getPaymentReady = async () => {
        console.log(readyRequestBody);
        console.log(userToken);
        const res = await axios.post(
          `https://api-billita.xyz/purchase/kakao/ready`,
          readyRequestBody,
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        sessionStorage.setItem("tid", res.data.tid);
        console.log(res.data.purchaseNumber);
        sessionStorage.setItem("purchaseNumber", res.data.purchaseNumber);
        router.push(res.data.next_redirect_pc_url)
      };
      getPaymentReady();
    }
  }, [bookData]);

  return <div>payment test page</div>;
}
