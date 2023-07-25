/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import useRefreshToken from "../hooks/useRefreshToken";
import { getUser } from "../redux/userSlice";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  /* useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${token}`);
  }, [isLoading]); */

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return isLoading ? <Loading /> : <Outlet />;
}

export default PersistLogin;
