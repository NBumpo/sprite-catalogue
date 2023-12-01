import { Link } from "react-router-dom";

export default function PageHeader({ loggedUser, handleLogout }) {

    return (

        <header>

            <Link to="/" className="headerlink">
                Home
            </Link>

            <Link to="/addsprite" className="headerlink">
                Upload Sprite
            </Link>

            <Link to="" onClick={handleLogout} className="headerlink logoutlink">
                Logout
            </Link>



        </header>











    )
}