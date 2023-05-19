import { headerMenuType } from "@/types/headerType";
import Image from "next/image";
import React from "react";

export default function MenuItem(props: {
  menuItem: headerMenuType;
  discription?: boolean;
  status?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
}) {
  return (
    <>
      <li onClick={props.onClick}>
        <div style={{ width: `${props.width}`, margin: "auto" }}>
          <Image
            src={props.menuItem.icon}
            width={200}
            height={200}
            alt={props.menuItem.name}
            priority
          />
        </div>
        {props.discription && props.discription === true ? (
          <p
            style={{ fontSize: "0.8rem", textAlign: "center", opacity: "90%" }}
          >
            {props.status}
          </p>
        ) : (
          ""
        )}
      </li>
    </>
  );
}

