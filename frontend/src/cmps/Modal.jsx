import { motion } from "framer-motion";
import { Backdrop } from "./Backdrop";

export function Modal({ children, handleClose }) {
    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0
        },
        visible: {
            y: '0',
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: '100vh',
            opacity: 0
        }
    }
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={ev => ev.stopPropagation()}
                className='modal'
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                {children}
                <button className="modal-close" onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    )
}