import React from "react";

function Avatars({ user, size }) {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    verticalAlign: "sub",
    borderRadius: "50%",
    backgroundColor: "white",
  };
  return (
    <div style={{ display: "inline" }}>
      <img
        src={`https://avatars.dicebear.com/api/initials/${user}.svg`}
        alt=""
        style={avatarStyle}
      />
    </div>
  );
}

export default Avatars;
