"use client"

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const MainTitle = ({styles, text} : {styles: any, text: any}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500);
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    

    return(
        <>
            <h2 style={styles} className="main--title">
                <motion.div 
                    initial={{ minWidth: "0px" }}
                    whileInView={{ minWidth: isSmallScreen ? "25px" : "60px" }}
                    transition={{ duration: 1 }}>
                <span style={{ 
                    content: "''",
                    display: "block",
                    height: "3px",
                    backgroundColor: "#002f34",
                    borderRadius: "3px"
                }}></span>
                </motion.div>
                {text}
                <motion.div 
                    initial={{ minWidth: "0px" }}
                    whileInView={{ minWidth: isSmallScreen ? "25px" : "60px" }}
                    transition={{ duration: 1 }}>
                <span style={{ 
                    content: "''",
                    display: "block",
                    height: "3px",
                    backgroundColor: "#002f34",
                    borderRadius: "3px"
                }}></span>
                </motion.div>
            </h2>
        </>
    )
}