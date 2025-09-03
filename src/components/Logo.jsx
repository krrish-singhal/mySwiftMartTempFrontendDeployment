import logoImage from '../assets/image.png'

const Logo = () => {
  return (
    <div className="flex items-center h-20 cursor-pointer hover:scale-105 transition-transform duration-300">
      <img
        src={logoImage}
        alt="Swift Mart Logo"
        className="h-16 w-auto object-contain filter drop-shadow-lg"
      />
    </div>
  )
}

export default Logo
