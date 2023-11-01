"use client";

import React from "react";
import { signal, computed } from "@preact/signals-react";
import withMyAuth from "../../../../components/SessionCheck";
import {Lol} from "../../../../components/Lol";
// const count = signal(0);
const Profile = () => {

  return (
    <>
     <Lol/>
    </>
  );
};

export default Profile;
// export default withMyAuth(Profile);
