import React from 'react';
import { Link } from 'react-router';
import { MapPin, IndianRupee, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="card bg-base-100/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 border border-base-200/50 hover:border-primary/30 group"
        >
            <div className="card-body p-6">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <h2 className="card-title text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2">
                        {job.jobTitle}
                    </h2>
                    <div className="badge badge-primary badge-outline whitespace-nowrap">{job.jobType}</div>
                </div>

                <div className="flex flex-col gap-3 mt-4 text-base-content/70 font-medium">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-base-200 rounded-md text-base-content/60">
                            <Building size={16} />
                        </div>
                        <span className="truncate">{job.companyName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-base-200 rounded-md text-base-content/60">
                            <MapPin size={16} />
                        </div>
                        <span className="truncate">{job.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-success/10 rounded-md text-success">
                            <IndianRupee size={16} />
                        </div>
                        <span className="font-semibold text-success">₹{job.salary.toLocaleString()}</span>
                    </div>
                </div>

                <div className="card-actions justify-end mt-6 pt-4 border-t border-base-200/50">
                    <Link to={`/job/${job._id}`} className="w-full">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-primary w-full bg-gradient-to-r from-primary to-primary/80 hover:to-primary border-none shadow-md shadow-primary/20"
                        >
                            View Details
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;