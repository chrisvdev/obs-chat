import React from "react";

export default function Img() {
  return <div>Img</div>;
}

import { useState } from "react";
const ImageComponent = ({ src }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {" "}
      {loading && <CustomLoader />}{" "}
      <img
        src={src}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? "none" : "block" }}
      />{" "}
    </>
  );
};
