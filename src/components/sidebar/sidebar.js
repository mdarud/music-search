import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./sidebar.css";
import useWindowSize from "../../utils/utils";

const Sidebar = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 1080;
  return (
    <Menu
      disableCloseOnEsc={!isMobile}
      disableOverlayClick={!isMobile}
      disableAutoFocus
      noTransition={!isMobile}
      noOverlay={!isMobile}
      isOpen={!isMobile}
    >
      <h1
        className="brand-item"
        style={{ fontFamily: "monospace", fontWeight: "bold" }}
      >
        MusicBase
      </h1>
      <a className="menu-item" href="/">
        Chart
      </a>
      <a className="menu-item" href="/search">
        Search
      </a>
    </Menu>
  );
};

export default Sidebar;
