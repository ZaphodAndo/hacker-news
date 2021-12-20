import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./NavBar.scss";

function NavBar() {
  return (
    <div className="nav-bar">
      <p>Hacker News</p>
      <ThemeToggle />
    </div>
  );
}

export default NavBar;
