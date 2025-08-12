import { useState, useEffect } from "react"
import { ShoppingBag, Gift, Crown } from "lucide-react"
import { toast } from "react-toastify"
import { useNavigate, useLocation } from "react-router-dom"

// --- Product Arrays ---
const basicProducts = [
  { id: "b1", name: "Wireless Earbuds", description: "Compact wireless earbuds with noise isolation", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 750 },
  { id: "b2", name: "Fitness Tracker", description: "Basic fitness and sleep tracking band", image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 850 },
  { id: "b3", name: "Portable Bluetooth Speaker", description: "Compact speaker with 8-hour battery life", image: "https://images.unsplash.com/photo-1608043345857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 900 },
  { id: "b4", name: "Power Bank 20000mAh", description: "High capacity portable charger for your devices", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 950 },
  { id: "b5", name: "Amazon Gift Card", description: "Gift card for your next purchase", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 800 },
  { id: "b6", name: "Smart LED Bulb Set", description: "Color-changing smart light bulbs (Pack of 2)", image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 700 },
  { id: "b7", name: "Phone Accessories Kit", description: "Phone case, screen protector, and wireless charger", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 600 },
  { id: "b8", name: "Wireless Mouse & Keyboard", description: "Ergonomic wireless combo set", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1000 },
  { id: "b9", name: "Desk Organizer Set", description: "Premium wooden desk organizer with multiple compartments", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 550 },
  { id: "b10", name: "Streaming Subscription Bundle", description: "6-month subscription to popular streaming services", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 500 },
]

const premiumProducts = [
  { id: "p1", name: "Noise Cancelling Headphones", description: "Premium over-ear headphones with active noise cancellation", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1200 },
  { id: "p2", name: "Smart Watch Series 8", description: "Advanced fitness and notification smartwatch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1450 },
  { id: "p3", name: "Wireless Charging Station", description: "3-in-1 fast wireless charger for phone, watch, and earbuds", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1100 },
  { id: "p4", name: "Mechanical Gaming Keyboard", description: "RGB backlit mechanical keyboard with premium switches", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1350 },
  { id: "p5", name: "Premium Gift Card Bundle", description: "Multiple gift cards for popular retailers", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1500 },
  { id: "p6", name: "Portable SSD 1TB", description: "High-speed external solid state drive", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1250 },
  { id: "p7", name: "Smart Home Security Camera", description: "4K security camera with night vision and app control", image: "https://images.unsplash.com/photo-1558002038105-e2e2e2e2e2e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1150 },
  { id: "p8", name: "Premium Wireless Earbuds Pro", description: "Professional earbuds with spatial audio", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1400 },
  { id: "p9", name: "Graphics Drawing Tablet", description: "Professional drawing tablet with pressure sensitivity", image: "https://images.unsplash.com/photo-1626144395666-4f17e36640df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1300 },
  { id: "p10", name: "Gaming Subscription Pro", description: "1-year subscription to premium gaming services", image: "https://images.unsplash.com/photo-1586182987320-4f17e36640df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 1050 },
]

const ultimateProducts = [
  { id: "u1", name: "iPad Air 10.9-inch", description: "Latest iPad Air with M1 chip and 256GB storage", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2800 },
  { id: "u2", name: "Samsung Galaxy A54", description: "Mid-range smartphone with excellent camera and 128GB storage", image: "https://images.unsplash.com/photo-1598327105666-5b8935f63d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2500 },
  { id: "u3", name: "PlayStation 5 Controller + Games", description: "DualSense controller with 2 popular PS5 games", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2200 },
  { id: "u4", name: "Sony WH-1000XM5", description: "Industry-leading noise cancelling headphones", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2400 },
  { id: "u5", name: "Premium Brand Gift Cards", description: "High-value gift cards for luxury brands and electronics", image: "https://images.unsplash.com/photo-1563013544829-5e65395b66cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 3000 },
  { id: "u6", name: "HomePod Mini + Smart Lights", description: "Smart speaker with complete smart lighting setup", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2300 },
  { id: "u7", name: "DJI Mini 3 Drone", description: "Compact camera drone with 4K video recording", image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2700 },
  { id: "u8", name: "Apple Watch Series 9", description: "Latest Apple Watch with GPS and cellular connectivity", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2600 },
  { id: "u9", name: 'ASUS Portable Monitor 15.6"', description: "4K portable monitor with USB-C connectivity", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2100 },
  { id: "u10", name: "MacBook Air M1 (Refurbished)", description: "Certified refurbished MacBook Air with M1 chip", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", worth: 2900 },
]

function MysteryBox() {
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [selectedBoxType, setSelectedBoxType] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    if (query.get("payment_status") === "success") {
      setPaymentSuccess(true)
      const boxType = query.get("box_type")
      if (boxType) setSelectedBoxType(boxType)
      toast.success("Payment successful! You can now claim your mystery box.")
    }
  }, [location])

  const handlePayment = async (boxType) => {
    setLoading(true)
    setSelectedBoxType(boxType)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mystery-box-payment`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boxType }),
      })
      const data = await response.json()
      if (response.ok && data.url) {
        const redirectUrl = new URL(data.url)
        if (!redirectUrl.searchParams.has("box_type")) {
          redirectUrl.searchParams.append("box_type", boxType)
          window.location.href = redirectUrl.toString()
        } else {
          window.location.href = data.url
        }
      } else {
        toast.error(data.message || "Failed to initiate payment")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = () => {
    let productList = []
    if (selectedBoxType === "Basic") productList = basicProducts
    else if (selectedBoxType === "Premium") productList = premiumProducts
    else if (selectedBoxType === "Ultimate") productList = ultimateProducts
    else productList = basicProducts

    if (!productList.length) {
      toast.error("No product available for this box!")
      return
    }
    const randomIndex = Math.floor(Math.random() * productList.length)
    const randomProduct = productList[randomIndex]
    navigate("/prize", { state: { prize: randomProduct, boxType: selectedBoxType } })
  }

  const boxesData = [
    {
      type: "Basic",
      price: "₹500",
      description: "A surprise selection of basic items worth ₹500-1000",
      icon: <ShoppingBag className="w-12 h-12 mb-4 text-red-500 dark:text-red-400" />,
      color: "bg-red-600 hover:bg-red-700",
      darkColor: "dark:bg-red-700 dark:hover:bg-red-800",
      borderColor: "border-red-200 dark:border-red-900",
      textColor: "text-red-700 dark:text-red-300",
    },
    {
      type: "Premium",
      price: "₹1000",
      description: "Premium quality mystery items worth ₹1000-1500",
      icon: <Gift className="w-12 h-12 mb-4 text-yellow-500 dark:text-yellow-400" />,
      color: "bg-yellow-500 hover:bg-yellow-600",
      darkColor: "dark:bg-yellow-600 dark:hover:bg-yellow-700",
      borderColor: "border-yellow-200 dark:border-yellow-900",
      textColor: "text-yellow-700 dark:text-yellow-300",
    },
    {
      type: "Ultimate",
      price: "₹2000",
      description: "Exclusive premium items worth ₹2000-3000",
      icon: <Crown className="w-12 h-12 mb-4 text-green-500 dark:text-green-400" />,
      color: "bg-green-600 hover:bg-green-700",
      darkColor: "dark:bg-green-700 dark:hover:bg-green-800",
      borderColor: "border-green-200 dark:border-green-900",
      textColor: "text-green-700 dark:text-green-300",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Mystery Box</h1>
      <div className="flex flex-wrap gap-8 justify-center mb-12">
        {boxesData.map((box) => (
          <div
            key={box.type}
            className={`rounded-xl border-2 ${box.borderColor} p-6 w-72 flex flex-col items-center shadow-lg bg-white dark:bg-gray-800 transition-all duration-300`}
            style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
          >
            {box.icon}
            <div className={`text-xl font-semibold mb-2 ${box.textColor}`}>{box.type}</div>
            <div className="text-lg font-bold mb-2">{box.price}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">{box.description}</div>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-white mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${box.color} ${box.darkColor} transition-all duration-300 hover:scale-105`}
              disabled={loading}
              onClick={() => handlePayment(box.type)}
            >
              {loading && selectedBoxType === box.type ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

      {paymentSuccess && (
        <div className="flex flex-col items-center mt-8">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZWJtZnRtZWJtZnRtZWJtZnRtZWJtZnRtZWJtZnRtZWJtZnRtZQ/3o7TKUn3XY4xXc2aly/giphy.gif"
            alt="Mystery Box"
            className="w-48 h-48 mb-6"
            style={{ transition: "transform 0.8s" }}
          />
          <button
            className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800 text-lg mt-4 transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-pink-400 hover:to-red-500"
            style={{ transition: "all 0.3s" }}
            onClick={handleClaim}
          >
            Claim Your Mystery Box
          </button>
        </div>
      )}
    </div>
  )
}

export default MysteryBox
