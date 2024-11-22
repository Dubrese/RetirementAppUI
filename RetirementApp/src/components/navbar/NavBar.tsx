import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import "./NavBar.css";
import { AppBar, Toolbar, IconButton, Avatar, Typography, Button, Box } from "@mui/material";

const Navbar = ({ user, setUser }: any) => {
  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = {
          id: data.sub,
          name: data.name,
          email: data.email,
          imageUrl: data.picture,
        };
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4f46e5", padding: "0 16px 16px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Retirement Planning App
        </Typography>
        <Box display="flex" alignItems="center">
          {user ? (
            <>
              <Avatar src={user.imageUrl} alt="Profile" sx={{ marginRight: "8px" }} />
              <Button onClick={handleLogout} sx={{ color: "#4f46e5", backgroundColor: "#fff" }}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => handleLogin()} sx={{ color: "#4f46e5", backgroundColor: "#fff" }}>
              Sign In with Google
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
