import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "ユーザが見つかりません", status: "warning" });
          }
        })
        .catch((e) => {
          showMessage({ title: "ログインに失敗しました", status: "warning" });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [history]
  );
  return { loading, login };
};
