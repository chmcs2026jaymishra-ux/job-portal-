import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Building, MapPin, DollarSign, Briefcase, Calendar, ChevronLeft, Loader2, Mail, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
};

const JobDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/jobs/${id}`);
                setJob(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching job details:', err);
                setError('Failed to load job details. It might have been removed.');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                await api.delete(`/jobs/${id}`);
                toast.success("Job deleted successfully");
                setTimeout(() => {
                    window.location.href = '/';
                }, 700);
            } catch (error) {
                console.error('Error deleting job:', error);
                toast.error("Failed to delete job");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-base-300/50">
                <Loader2 className="animate-spin text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" size={64} />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 bg-base-300/50">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="alert alert-error max-w-md shadow-xl rounded-2xl relative overflow-hidden mb-8"
                >
                    <div className="absolute inset-0 bg-base-content/5" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="relative z-10 font-semibold">{error || 'Job not found'}</span>
                </motion.div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.href = '/'} className="btn btn-outline rounded-xl bg-base-100">
                    <ChevronLeft size={20} /> Back to Home Page
                </motion.button>
            </div>
        );
    }

    // Formatting date
    const postedDate = job.createdAt
        ? new Date(job.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'Recently';

    const updatedDate = job.updatedAt
        ? new Date(job.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : null;

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-base-300/50 py-12 px-4 sm:px-8 relative overflow-hidden"
        >
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <motion.button
                        whileHover={{ x: -5 }}
                        onClick={() => window.location.href = '/'}
                        className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content normal-case rounded-xl transition-all"
                    >
                        <ChevronLeft size={18} />
                        <span className="font-semibold">Back to Home Page</span>
                    </motion.button>
                    <div className="flex gap-3">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(`/edit-job/${id}`)} className="btn btn-primary btn-outline btn-sm rounded-xl px-4 shadow-sm font-semibold border-2">Edit</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDelete} className="btn btn-error btn-sm text-error-content rounded-xl px-4 shadow-sm font-semibold">Delete</motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="card bg-base-100/90 backdrop-blur-md shadow-xl border border-base-content/10 overflow-hidden"
                        >
                            <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent" />
                            <div className="card-body p-8 sm:p-10">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                    <div className="max-w-xl">
                                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-base-content to-base-content/70 mb-4 tracking-tight leading-tight">{job.jobTitle}</h1>
                                        <div className="flex items-center gap-3 text-xl font-semibold text-primary">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Building size={24} />
                                            </div>
                                            {job.companyName}
                                        </div>
                                    </div>
                                    <div className="badge badge-primary badge-outline badge-lg pt-1 pb-1 font-semibold">{job.jobType}</div>
                                </div>

                                <div className="divider my-4 border-base-200" />

                                <div className="prose max-w-none text-base-content/80 mt-6">
                                    <h3 className="text-2xl font-bold mb-6 text-base-content">About the Role</h3>
                                    <div className="whitespace-pre-wrap leading-relaxed text-lg font-medium">
                                        {job.jobDescription}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="card bg-base-100/90 backdrop-blur-md shadow-xl border border-base-content/10 sticky top-28"
                        >
                            <div className="card-body p-8">
                                <h3 className="font-bold text-2xl mb-6 text-base-content tracking-tight">Job Overview</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/20 p-3 rounded-xl text-primary shadow-inner">
                                            <MapPin size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-1">Location</p>
                                            <p className="font-bold text-base-content/90">{job.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-success/20 p-3 rounded-xl text-success shadow-inner">
                                            <DollarSign size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-1">Salary</p>
                                            <p className="font-extrabold text-success">${job.salary?.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-secondary/20 p-3 rounded-xl text-secondary shadow-inner">
                                            <Briefcase size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-1">Job Type</p>
                                            <p className="font-bold text-base-content/90">{job.jobType}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-warning/20 p-3 rounded-xl text-warning shadow-inner">
                                            <GraduationCap size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-1">Experience</p>
                                            <p className="font-bold text-base-content/90">{job.experienceLevel}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-info/20 p-3 rounded-xl text-info shadow-inner">
                                            <Mail size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-1">Contact</p>
                                            <p className="font-bold"><a href={`mailto:${job.contactEmail}`} className="text-info hover:text-info-content transition-colors underline decoration-2 underline-offset-4">{job.contactEmail}</a></p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-base-200 p-3 rounded-xl text-base-content/60 shadow-inner">
                                            <Calendar size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-1">Created At</p>
                                            <p className="font-bold text-base-content/90">{postedDate}</p>
                                        </div>
                                    </div>

                                    {updatedDate && job.updatedAt !== job.createdAt && (
                                        <div className="flex items-start gap-4">
                                            <div className="bg-base-200 p-3 rounded-xl text-base-content/60 shadow-inner">
                                                <Calendar size={22} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-1">Updated At</p>
                                                <p className="font-bold text-base-content/90">{updatedDate}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="divider my-6 border-base-200" />

                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary w-full text-lg rounded-xl h-14 bg-gradient-to-r from-primary to-primary/80 border-none shadow-lg shadow-primary/30 text-primary-content font-bold tracking-wide">
                                    Apply Now
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default JobDetailPage;