import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import axios from "axios";

export default function Paysuccess() {
  const [purchasNo, setPurchaseNo] = useState<string>();
  const [userToken, setUserToken] = useState<string>();
  const router = useRouter();
  console.log(router.query.pg_token);
  const pg_token = router.query.pg_token;

  const requestBody = {
    pg_token: pg_token,
    purchaseNumber: purchasNo,
  };

  useEffect(() => {
    const purchaseNumber = sessionStorage.getItem("purchaseNumber");
    const token = localStorage.getItem("Authorization");
    if (purchaseNumber !== undefined && purchaseNumber !== null) {
      setPurchaseNo(purchaseNumber);
    }
    if (token !== undefined && token !== null) {
      setUserToken(token);
    }
  }, []);

  useEffect(() => {
    if (pg_token !== undefined) {
      const getPaymentApprove = async () => {
        const res = await axios.post( 
          `https://api-billita.xyz/purchase/kakao/approve`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(res);
      };
      getPaymentApprove();
    }
  }, []);

  return <div>test - approval</div>;
}
