import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Briefcase, Building, MapPin, IndianRupee, Type, FileText, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
};

const CreateJobPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        companyName: '',
        location: '',
        salary: '',
        jobType: 'Full-Time',
        experienceLevel: 'Fresher',
        contactEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Convert salary to number
            const payload = { ...formData, salary: Number(formData.salary) };
            await api.post('/jobs', payload);
            toast.success('Job posted successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 700);
        } catch (error) {
            console.error('Error posting job:', error);
            toast.error(error.response?.data?.message || 'Failed to post job.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="min-h-screen bg-base-300/50 py-12 px-4 sm:px-8 relative overflow-hidden"
        >
            {/* Background Blob */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="card bg-base-100/90 backdrop-blur-xl shadow-2xl border border-base-content/10 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-primary to-secondary" />
                    <div className="card-body p-8 sm:p-12">
                        <h2 className="card-title text-4xl font-black mb-8 flex items-center gap-4 text-base-content tracking-tight">
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-primary to-secondary text-primary-content p-3 rounded-2xl shadow-lg shadow-primary/30"
                            >
                                <Briefcase size={28} />
                            </motion.div>
                            Post a New Job
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Job Title */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content/80 text-base">Job Title</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl h-14">
                                    <Type size={20} className="text-primary/70" />
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        className="grow font-medium"
                                        placeholder="e.g. Senior Frontend Developer"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Company Info row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-base-content/80 text-base">Company Name</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl h-14">
                                        <Building size={20} className="text-primary/70" />
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="grow font-medium"
                                            placeholder="e.g. Acme Corp"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-base-content/80 text-base">Location</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl h-14">
                                        <MapPin size={20} className="text-primary/70" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="grow font-medium"
                                            placeholder="e.g. Remote, San Francisco"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Details row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-base-content/80 text-base">Salary (₹)</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl h-14">
                                        <IndianRupee size={20} className="text-success/70" />
                                        <input
                                            type="number"
                                            name="salary"
                                            min="0"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            className="grow font-medium"
                                            placeholder="e.g. 120000"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-base-content/80 text-base">Job Type</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full bg-base-100 shadow-sm border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl h-14 font-bold text-base-content"
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            {/* Experience & Contact row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-base-content/80 text-base">Experience Level</span>
                                    </label>
                                    <div className="flex items-center w-full">
                                        <select
                                            className="select select-bordered w-full bg-base-100 shadow-sm border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl h-14 font-bold text-base-content"
                                            name="experienceLevel"
                                            value={formData.experienceLevel}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="Fresher">Fresher</option>
                                            <option value="Junior">Junior</option>
                                            <option value="Mid">Mid</option>
                                            <option value="Senior">Senior</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-base-content/80 text-base">Contact Email</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl h-14">
                                        <Mail size={20} className="text-info/70" />
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleChange}
                                            className="grow font-medium"
                                            placeholder="e.g. contact@company.com"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content/80 text-base">Job Description</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-4 left-4">
                                        <FileText size={20} className="text-primary/70" />
                                    </div>
                                    <textarea
                                        name="jobDescription"
                                        value={formData.jobDescription}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered w-full pl-12 h-40 text-base leading-relaxed py-4 bg-base-200/50 focus:bg-base-100 transition-colors rounded-xl font-medium"
                                        placeholder="Describe the responsibilities, requirements, and benefits..."
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-6 border-t border-base-200/50 mt-10">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="btn btn-primary w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-primary/80 border-none text-primary-content font-bold tracking-wide"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        'Publish Job Listing'
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CreateJobPage;