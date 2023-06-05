import { footerMenuData } from "@/datas/staticMenuDatas";
import { footerType } from "@/types/footerType";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { authState } from "@/state/authState";
import Image from "next/image";
import style from "@/components/layouts/Footer.module.css";

export default function Footer() {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    setAuth({
      auth: false,
      nickName: "",
      profileImageUrl: "",
      token: "",
      uid: "",
      email: "",
    });
  }
  return (
    <footer className={style.footer}>
      <nav>
        <ul>
          {footerMenuData.map((menuItem: footerType) => {
            return (
              
              auth.auth && menuItem.id === 3 ? 
                <li
                  key={menuItem.id}
                  onClick={() => handleLogOut()}
                  className={
                    router.pathname === menuItem.path ? style.active : ""
                  }
                >
                  <div className={style.footerIconContainer}>
                    <Image
                      src={
                        router.pathname === menuItem.path
                          ? menuItem.iconActive
                          : menuItem.icon
                      }
                      width={30}
                      height={30}
                      alt={menuItem.name}
                    />
                  </div>
                </li> 
              :
                <li
                  key={menuItem.id}
                  onClick={() => router.push(menuItem.path)}
                  className={
                    router.pathname === menuItem.path ? style.active : ""
                  }
                >
                  <div className={style.footerIconContainer}>
                    <Image
                      src={
                        router.pathname === menuItem.path
                          ? menuItem.iconActive
                          : menuItem.icon
                      }
                      width={30}
                      height={30}
                      alt={menuItem.name}
                    />
                  </div>
                </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
