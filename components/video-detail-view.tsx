import { Button } from "@/components/ui/button";
import { TitleBar } from "@/components/ui/title-bar";
import { Video } from "@/lib/types";
import { PageTransition } from "@/components/ui/page-transition";
import { motion, AnimatePresence } from "framer-motion";

// Custom Check Icon for the Modal from JSON
const SuccessCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  const [note, setNote] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[20px] p-6 w-full max-w-[341px] flex flex-col items-center gap-6 shadow-2xl"
    >
       {/* Icon */}
       <Button onClick={onClose} className="w-full h-[54px] rounded-[10px] bg-foreground text-background hover:bg-foreground/90 text-base font-medium">
         Ok
       </Button>
    </motion.div>
  )
}

  if (isFeedbackOpen) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
         <AnimatePresence>
            <VideoCompleteModal onReplay={handleReplay} onClose={handleCloseModal} />
         </AnimatePresence>
      </div>
    );
  }

  return (
    <PageTransition className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <TitleBar title="Video Details" />

        </div>
      </div>

    </PageTransition>
  );
}
