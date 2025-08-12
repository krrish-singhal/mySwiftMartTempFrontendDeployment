
"use client"

import { useSelector } from "react-redux"
import { Package } from "lucide-react"
import { motion } from "framer-motion"

const MysteryBoxIcon = () => {
  const pendingBoxes = useSelector((state) => state.mysteryBox?.pendingBoxes || [])

  return (
    <motion.div whileHover={{ scale: 1.1 }} className="relative flex items-center gap-2">
      <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      {pendingBoxes.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-blue-600 text-white w-5 h-5 text-sm rounded-full flex items-center justify-center font-bold shadow-lg"
        >
          {pendingBoxes.length}
        </motion.div>
      )}
    </motion.div>
  )
}

export default MysteryBoxIcon
