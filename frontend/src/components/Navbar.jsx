import React from 'react';
import { Link, useLocation } from 'react-router';
import { Briefcase, PlusCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const isCreatePage = location.pathname === '/create';

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="navbar bg-base-100/70 backdrop-blur-xl shadow-sm border-b border-base-content/5 sticky top-0 z-50 px-4 sm:px-8"
        >
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl gap-2 normal-case hover:bg-base-200/50 rounded-2xl transition-all duration-300">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="bg-gradient-to-br from-primary to-secondary text-primary-content p-2 rounded-xl shadow-lg shadow-primary/20"
                    >
                        <Briefcase size={20} />
                    </motion.div>
                    <span className="font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/70">
                        JobPortal
                    </span>
                </Link>
            </div>
            <div className="flex-none gap-2">
                {!isCreatePage ? (
                    <Link to="/create">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary btn-sm sm:btn-md gap-2 rounded-xl shadow-lg shadow-primary/30 border-none bg-gradient-to-r from-primary to-primary/80 hover:to-primary"
                        >
                            <PlusCircle size={18} />
                            <span className="hidden sm:inline font-semibold tracking-wide">Post a Job</span>
                            <span className="sm:hidden font-semibold">Post</span>
                        </motion.button>
                    </Link>
                ) : (
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-ghost bg-base-200/50 hover:bg-base-300 btn-sm sm:btn-md gap-2 rounded-xl font-semibold transition-colors"
                        >
                            <Search size={18} />
                            <span className="hidden sm:inline">Find Jobs</span>
                            <span className="sm:hidden">Jobs</span>
                        </motion.button>
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default Navbar;