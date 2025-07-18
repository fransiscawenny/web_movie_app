import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function AnimationPageWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // fade in + slide up
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} // fade out + slide up
            transition={{ duration: 0.3 }}
            className="min-h-screen"
        >
            {children}
        </motion.div>
    );
}
