"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import { addClaimedProduct, removePendingBox } from "../store/mysteryBoxSlice"

const ClaimBox = () => {
  const [isOpening, setIsOpening] = useState(false)
  const [prizeRevealed, setPrizeRevealed] = useState(false)
  const [claimedPrize, setClaimedPrize] = useState(null)
  const [boxAnimation, setBoxAnimation] = useState("idle")
  const dispatch = useDispatch()
  const pendingBoxes = useSelector((state) => state.mysteryBox.pendingBoxes)

  // Check if we have a pending box from URL params
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get("payment_status") === "success") {
      // Payment was successful, we can proceed
      toast.success("Payment successful! You can now claim your mystery box.")
    }
  }, [])

  const handleOpenBox = async (boxId) => {
    setIsOpening(true)
    setBoxAnimation("shake")

    try {
      // First animation phase - box shaking
      setTimeout(() => {
        setBoxAnimation("open")

        // Second animation phase - box opening
        setTimeout(async () => {
          // Call API to claim mystery box
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/claim-mystery-box`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ boxId }),
          })

          const data = await response.json()

          if (response.ok && data.success) {
            // If we don't have real data, use sample data
            const sampleProducts = [
              {
                _id: "1",
                productName: "Premium Headphones",
                description: "High-quality noise cancelling headphones worth ₹15,000",
                productImage: ["/images/headphones.jpg"],
                worth: "₹15,000",
              },
              {
                _id: "2",
                productName: "Smart Watch",
                description: "Latest smartwatch with health tracking features worth ₹8,500",
                productImage: ["/images/smartwatch.jpg"],
                worth: "₹8,500",
              },
              {
                _id: "3",
                productName: "Amazon Gift Card",
                description: "Gift card worth ₹2,000 for your next purchase",
                productImage: ["/images/giftcard.jpg"],
                worth: "₹2,000",
              },
              {
                _id: "4",
                productName: "Wireless Earbuds",
                description: "Premium wireless earbuds with charging case worth ₹5,000",
                productImage: ["/images/earbuds.jpg"],
                worth: "₹5,000",
              },
              {
                _id: "5",
                productName: "iPhone 15 Pro",
                description: "The latest iPhone with advanced features worth ₹120,000",
                productImage: ["/images/iphone.jpg"],
                worth: "₹120,000",
              },
            ]

            // Use API data or fallback to sample data
            const prizeData = data.claimedProduct || sampleProducts[Math.floor(Math.random() * sampleProducts.length)]

            dispatch(addClaimedProduct(prizeData))
            dispatch(removePendingBox(boxId))
            setClaimedPrize(prizeData)

            // Final animation phase - reveal prize
            setTimeout(() => {
              setPrizeRevealed(true)
              setBoxAnimation("revealed")
              toast.success("Congratulations! You won a prize 🎉")
            }, 1000)
          } else {
            toast.error(data.message || "Failed to claim box")
            setIsOpening(false)
            setBoxAnimation("idle")
          }
        }, 2000) // Box opening animation time
      }, 1500) // Box shaking animation time
    } catch (error) {
      toast.error("Error claiming box")
      setIsOpening(false)
      setBoxAnimation("idle")
    }
  }

  // Get the appropriate box image based on animation state
  const getBoxImage = () => {
    switch (boxAnimation) {
      case "shake":
        return "/images/box-shake.gif"
      case "open":
        return "/images/box-opening.gif"
      case "revealed":
        return "/images/box-open.png"
      default:
        return "/images/box-closed.png"
    }
  }

  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-center">Mystery Box Claim</h1>

      <AnimatePresence>
        {!prizeRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              {isOpening ? "Opening Your Mystery Box..." : "Ready to Open Your Mystery Box?"}
            </h2>

            <motion.div
              className="relative w-80 h-80 mb-8"
              initial={{ scale: 1 }}
              animate={{
                scale: boxAnimation === "shake" ? [1, 1.05, 0.95, 1.05, 1] : 1,
                rotateZ: boxAnimation === "shake" ? [-5, 5, -5, 5, 0] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: boxAnimation === "shake" ? Number.POSITIVE_INFINITY : 0,
                repeatType: "loop",
              }}
            >
              <img
                src={getBoxImage() || "/placeholder.svg"}
                alt="Mystery Box"
                className="w-full h-full object-contain"
              />

              {boxAnimation === "open" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-4xl">✨</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {!isOpening && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenBox(pendingBoxes[0]?._id || "sample-box-id")}
                disabled={isOpening}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg"
              >
                Open Mystery Box
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {prizeRevealed && claimedPrize && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.5,
              }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 rounded-2xl shadow-2xl w-full max-w-md mb-8"
            >
              <div className="bg-white rounded-2xl p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mb-4 text-3xl"
                >
                  🎉
                </motion.div>
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  Congratulations!
                </motion.h3>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="relative mb-6 rounded-lg overflow-hidden shadow-lg"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={claimedPrize.productImage[0] || `/placeholder.svg?height=300&width=400`}
                    alt={claimedPrize.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {claimedPrize.worth || "₹10,000"}
                  </div>
                </motion.div>

                <motion.h4
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="text-2xl font-bold mb-2"
                >
                  {claimedPrize.productName}
                </motion.h4>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="text-gray-600"
                >
                  {claimedPrize.description}
                </motion.p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => (window.location.href = "/my-prizes")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              View My Prizes
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ClaimBox
