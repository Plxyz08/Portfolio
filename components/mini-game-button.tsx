"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import MiniGameDialog from "./mini-game-dialog"
import { motion } from "framer-motion"

interface MiniGameButtonProps {
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  showText?: boolean
  className?: string
  isHero?: boolean
}

export default function MiniGameButton({
  variant = "outline",
  size = "default",
  showText = true,
  className = "",
  isHero = false,
}: MiniGameButtonProps) {
  const [isGameOpen, setIsGameOpen] = useState(false)

  return (
    <>
      <div className="relative">
        {isHero ? (
          <Button
            variant="secondary"
            size={size}
            onClick={() => setIsGameOpen(true)}
            className={`gap-2 ${className} bg-primary/10 hover:bg-primary/20 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-primary dark:text-blue-400 border border-primary/20 dark:border-blue-500/30`}
          >
            <Brain className="h-4 w-4" />
            {showText && "¡Conóceme más divirtiéndote!"}
          </Button>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant={variant} size={size} onClick={() => setIsGameOpen(true)} className={`gap-2 ${className}`}>
              <Brain className="h-4 w-4" />
              {showText && "Quiz Interactivo"}
            </Button>
          </motion.div>
        )}
      </div>

      <MiniGameDialog open={isGameOpen} onOpenChange={setIsGameOpen} />
    </>
  )
}

