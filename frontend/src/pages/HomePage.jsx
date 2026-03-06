import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import JobCard from '../components/JobCard';
import { Loader2, Search, MapPin, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const HomePage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        jobTitle: '',
        location: '',
        jobType: '',
        salary: ''
    });

    const fetchJobs = async (appliedFilters = filters) => {
        setLoading(true);
        try {
            const params = {};
            if (appliedFilters.jobTitle) params.jobTitle = appliedFilters.jobTitle;
            if (appliedFilters.location) params.location = appliedFilters.location;
            if (appliedFilters.jobType) params.jobType = appliedFilters.jobType;
            if (appliedFilters.salary) params.salary = appliedFilters.salary;

            const response = await api.get('/jobs', { params });
            setJobs(response.data);
            setError(null);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError('Failed to fetch jobs. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch with empty filters
        fetchJobs({
            jobTitle: '',
            location: '',
            jobType: '',
            salary: ''
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            jobTitle: '',
            location: '',
            jobType: '',
            salary: ''
        };
        setFilters(resetFilters);
        fetchJobs(resetFilters);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen bg-base-300/50 relative overflow-hidden"
        >
            {/* Background decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-6 tracking-tight leading-tight">
                        Find Your Dream Job
                    </h1>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto font-medium">
                        Explore thousands of opportunities and take the next step in your career with world-class companies.
                    </p>
                </motion.div>

                {/* Filter Box */}
                <motion.div variants={itemVariants} className="bg-base-100/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-base-content/5 border border-base-content/10 mb-16 relative z-20">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-base-content/80">Job Title</span></label>
                            <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl">
                                <Search size={18} className="text-primary/70" />
                                <input type="text" name="jobTitle" value={filters.jobTitle} onChange={handleChange} className="grow font-medium" placeholder="e.g. Developer" />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-base-content/80">Location</span></label>
                            <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl">
                                <MapPin size={18} className="text-secondary/70" />
                                <input type="text" name="location" value={filters.location} onChange={handleChange} className="grow font-medium" placeholder="City or Remote" />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-base-content/80">Min Salary (₹)</span></label>
                            <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl">
                                <IndianRupee size={18} className="text-success/70" />
                                <input type="number" name="salary" value={filters.salary} onChange={handleChange} className="grow font-medium" placeholder="e.g. 50000" min="0" />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-base-content/80">Job Type</span></label>
                            <div className="flex items-center w-full">
                                <select
                                    name="jobType"
                                    value={filters.jobType}
                                    onChange={handleChange}
                                    className="select select-bordered w-full bg-base-100 shadow-sm border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl font-bold text-base-content"
                                >
                                    <option value="">All Types</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full pt-2 lg:pt-0">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn btn-primary flex-1 rounded-xl shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-primary/80 border-none text-primary-content">Search</motion.button>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={handleReset} className="btn btn-outline flex-1 rounded-xl bg-base-100 border-base-300 hover:bg-base-200 hover:border-base-400 text-base-content">Reset</motion.button>
                        </div>
                    </form>
                </motion.div>

                {loading ? (
                    <motion.div variants={itemVariants} className="flex justify-center items-center py-32">
                        <Loader2 className="animate-spin text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" size={64} />
                    </motion.div>
                ) : error ? (
                    <motion.div variants={itemVariants} className="flex justify-center items-center py-20">
                        <div className="alert alert-error max-w-md shadow-xl rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-base-content/5" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="relative z-10 font-semibold">{error}</span>
                        </div>
                    </motion.div>
                ) : jobs.length === 0 ? (
                    <motion.div variants={itemVariants} className="text-center py-24 bg-base-100/50 backdrop-blur-sm rounded-3xl shadow-sm border border-base-200/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-base-100 to-base-200/50" />
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-content/30">
                                <Search size={40} />
                            </div>
                            <h3 className="text-3xl font-bold text-base-content/80 mb-3 tracking-tight">No jobs found</h3>
                            <p className="text-lg text-base-content/60 mb-8 max-w-md mx-auto">Try adjusting your filters or checking back later for new opportunities.</p>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleReset} className="btn btn-primary btn-outline rounded-xl px-8 shadow-sm">
                                Clear Filters
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {jobs.map((job) => (
                            <motion.div key={job._id} variants={itemVariants} layoutId={`job-card-${job._id}`}>
                                <JobCard job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default HomePage;