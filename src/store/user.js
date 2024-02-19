import { create } from "zustand";
import { immer } from "zustand/middleware/immer"; //改变值-
import axios from "axios";
import { persist } from "zustand/middleware"; //缓存到本地
// create 返 回值是一个hook函数
const useUserStore = create(
  persist(
    immer(function (setSatae, getSatae) {
      return {
        user: { name: "simae", age: 18, info: {} },
        firstName: "abc",
        async setUserlongin() {
          const res = await axios.post("路径");
          setSatae((state) => {
            state.user.info = res.data;
          });
        },
        setUserAge() {},
        setUserName(name) {
          setSatae((satae) => {
            satae.user.name = getSatae().firstName + name;
          });
        },
      };
    }),
    { name: "user-State" }
  )
);

export default useUserStore;
