import React from 'react'
import { motion } from 'framer-motion'

const Title = ({ title, subTitle, align }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className={`flex flex-col justify-center items-center text-center ${align === 'left' ? 'md:items-start md:text-left' : ''
                }`}
        >
            <motion.h1
                className='text-4xl md:text-[40px] font-bold text-gray-800'
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {title}
            </motion.h1>

            <motion.p
                className='text-sm md:text-base text-gray-500 mt-2 max-w-[700px]'
                whileHover={{ scale: 1.01 }}
            >
                {subTitle}
            </motion.p>
        </motion.div>
      
    )
}

export default Title
