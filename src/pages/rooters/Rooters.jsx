import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import Home from "../home/Home";

import Create from "../create/Create";
import Setting from "../setting/Setting";
import Users from "../users/Users";
import Sidebar from "../../components/sidebar/Sidebar";
import Edit from "../edit/Edit";
import Theme from "../theme/Theme";
import ThemeProvider from "../theme/ThemeProvider";
import { useLocation } from "react-router-dom";

const Rooters = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(sessionStorage.getItem("username", user));
  });

  const loc = useLocation().pathname;

  return (
    <>
      {!user ? (
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      ) : (
        <>
          {loc.includes("/create") ? (
            <ThemeProvider>
              <Routes>
                <Route path="/create" element={<Create />} />
              </Routes>
            </ThemeProvider>
          ) : (
            <>
              {loc.includes("/edit") ? (
                <ThemeProvider>
                  <Routes>
                    <Route path="/edit/:id" element={<Edit />} />
                  </Routes>
                </ThemeProvider>
              ) : (
                <>
                  <ThemeProvider>
                    <Sidebar />

                    <Theme />
                    <Routes>
                      <Route exact path="/" element={<Home />} />

                      <Route path="/settings" element={<Setting />} />
                      <Route path="/users" element={<Users />} />
                    </Routes>
                  </ThemeProvider>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Rooters;
