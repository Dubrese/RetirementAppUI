import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import "./NavBar.css"

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
        <nav className="navbar">
            <h2>Retirement Planning App</h2>
            <div>
                {user ? (
                    <div>
                        <img src={user.imageUrl} alt="Profile" style={{ borderRadius: "50%", width: "40px", marginRight: "10px" }} />
                        <button onClick={handleLogout}>Sign Out</button>
                    </div>
                ) : (
                    <button onClick={() => handleLogin()}>Sign In with Google</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;