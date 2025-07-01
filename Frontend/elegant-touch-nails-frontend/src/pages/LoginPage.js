import React from "react";
import LoginDialog from "../components/LoginDialog";

export default function LoginPage() {
  return (
    <div style={styles.pageContainer}>
      <h2>Login to Elegant Touch Nails</h2>
      <LoginDialog />
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
};
