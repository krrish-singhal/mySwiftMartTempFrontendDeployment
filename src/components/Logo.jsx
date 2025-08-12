import { Link } from "react-router-dom"
import logoImage from '../assets/image.png'

const Logo = () => {
  return (
    <div className="flex items-center h-20">
      <Link to="/" className="hover:scale-105 transition-transform duration-300">
        <img
          src={logoImage}
          alt="Swift Mart Logo"
          className="h-16 w-auto object-contain cursor-pointer filter drop-shadow-lg"
        />
      </Link>
    </div>
  )
}

export default Logo
