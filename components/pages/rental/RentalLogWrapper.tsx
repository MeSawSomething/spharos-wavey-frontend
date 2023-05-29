import React, { useEffect, useState } from "react";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import { RentalDataType } from "@/types/rentalDataType";
import style from "./RentalWrapper.module.css";
import Separator from "@/components/ui/Separator";
import { useRouter } from "next/router";
import axios from "axios";

export default function RentalWrapper(props: { data: RentalDataType }) {
  const data = props.data;
  console.log(`rentalWrapper data : `, data);
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [nextDrawer, setNextDrawer] = useState(false);
  const handleDrawer = () => setDrawer(true);
  

  // const handleRegisterRental = () => {
  //   setDrawer(false);
  //   const postData = async () => {
  //     const result = await axios.post(
  //       "https://api-billita.xyz/booklist",
  //       {
  //         carId: router.query.carId,
  //         startDate: router.query.startDate,
  //         endDate: router.query.endDate,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  //         },
  //       }
  //     );
  //     console.log("data : ", result.data);
  //     console.log("img url : ", result.data.frameInfo.image);
  //   };
  //   postData();
  // }


  const handleCancel = () => {
    console.log(router.query.bookId);
    setDrawer(false);
    const getData = async () => {
      const result = await axios.delete(
        `https://api-billita.xyz/rental/${router.query.bookId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );
      console.log("data : ", result.data);
      console.log("img url : ", result.data.frameInfo.image);
    };
    getData();
  };

  return (
    <main>
      {drawer && (
        <Drawer
          open={drawer}
          PaperProps={{
            sx: {
              width: "auto",
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <ModalForm title="대여 취소" />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => handleCancel()}
                shadow={true}
                color={"var(--billita-secondary)"}
                border="1px solid var(--billita-secondary)"
                fontWeight="bold"
                backgroundColor="var(--billita-white)"
              >
                대여 취소하기
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}

      <RentalTop data={data} />
      <RentalMiddle data={data} />
      <Separator gutter={7.5} />
      <BottomFixedContainer>
        <div className={style.twoBtnWrap}>
          <Button
            btnType={"reset"}
            btnEvent={() => setDrawer(true)}
            shadow={true}
            backgroundColor="var(--billita-white)"
            color="var(--billita-secondary)"
            border="1px solid var(--billita-secondary)"
            fontWeight="bold"
          >
            대여취소
          </Button>
          <Button
            btnType={"button"}
            btnEvent={() => alert("action")}
            shadow={true}
          >
            스마트키
          </Button>
        </div>
      </BottomFixedContainer>
    </main>
  );
}
