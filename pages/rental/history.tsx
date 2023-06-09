import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalLogNotExist from "@/components/pages/rental/RentalLogNotExist";
import RentalHistory from "@/components/pages/history/RentalHistory";
import AuthRecoilChecker from "@/components/util/AuthRecoilChecker";
import { authState } from "@/state/authState";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { MyRentalCarType } from "@/types/rentalDataType";

export default function RentHistory() {
  const [auth, setAuth] = useRecoilState(authState);
  const [rentalData, setRentalData] = useState<MyRentalCarType[]>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!auth.auth && AuthRecoilChecker() && typeof window !== "undefined") {
      setAuth({
        auth: true,
        token: localStorage.getItem("token") as string,
        uid: localStorage.getItem("uid") as string,
        nickName: localStorage.getItem("nickName") as string,
        email: localStorage.getItem("email") as string,
        profileImageUrl: localStorage.getItem("profileImageUrl") as string,
      });
    }
  }, []);

  useEffect(() => {
    console.log(auth.token, "auth.token");
    console.log(auth.uid, "auth.uid");
    const getRentalAllData = async () => {
      const res = await fetch(`${API_URL}/rental/ALL`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          uid: auth.uid,
        },
      });
      console.log(res, "res");
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setRentalData(data);
    };
    getRentalAllData();
  }, [auth.token, auth.uid]);

  return (
    <main>
      <section>
        {rentalData && rentalData.length > 0
          ? rentalData.map((data: MyRentalCarType) => (
              <RentalHistory rentalData={data} key={data.rentalId} />
            ))
          : "이용 내역이 없습니다."}
      </section>
    </main>
  );
}

RentHistory.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="이용 내역">{Page}</SimpleBackLayout>;
};