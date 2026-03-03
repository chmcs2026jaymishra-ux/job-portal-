import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Briefcase, Building, MapPin, DollarSign, Type, FileText, Mail, Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
};

const EditJobPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
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

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/jobs/${id}`);
                const job = response.data;
                setFormData({
                    jobTitle: job.jobTitle || '',
                    jobDescription: job.jobDescription || '',
                    companyName: job.companyName || '',
                    location: job.location || '',
                    salary: job.salary || '',
                    jobType: job.jobType || 'Full-Time',
                    experienceLevel: job.experienceLevel || 'Fresher',
                    contactEmail: job.contactEmail || '',
                });
            } catch (error) {
                console.error('Error fetching job details:', error);
                toast.error('Failed to load job details for editing.');
                navigate('/');
            } finally {
                setInitialLoading(false);
            }
        };

        fetchJob();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { ...formData, salary: Number(formData.salary) };
            await api.put(`/jobs/${id}`, payload);
            toast.success('Job updated successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 700);
        } catch (error) {
            console.error('Error updating job:', error);
            toast.error(error.response?.data?.message || 'Failed to update job.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-base-300/50">
                <Loader2 className="animate-spin text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" size={64} />
            </div>
        );
    }

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
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="card bg-base-100/90 backdrop-blur-xl shadow-2xl border border-base-content/10 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-secondary to-accent" />
                    <div className="card-body p-8 sm:p-12">
                        <h2 className="card-title text-4xl font-black mb-8 flex items-center gap-4 text-base-content tracking-tight">
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-secondary to-accent text-secondary-content p-3 rounded-2xl shadow-lg shadow-secondary/30"
                            >
                                <Save size={28} />
                            </motion.div>
                            Edit Job Listing
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Job Title */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content/80 text-base">Job Title</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl h-14">
                                    <Type size={20} className="text-secondary/70" />
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
                                        <Building size={20} className="text-secondary/70" />
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
                                        <MapPin size={20} className="text-secondary/70" />
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
                                        <span className="label-text font-bold text-base-content/80 text-base">Salary ($)</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl h-14">
                                        <DollarSign size={20} className="text-success/70" />
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
                                        <FileText size={20} className="text-secondary/70" />
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
                            <div className="flex gap-4 pt-6 border-t border-base-200/50 mt-10">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={() => navigate(`/job/${id}`)}
                                    className="btn btn-outline flex-1 text-lg rounded-xl h-14 bg-base-100 font-bold border-2"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="btn btn-primary flex-1 text-lg h-14 rounded-xl shadow-lg shadow-secondary/20 bg-gradient-to-r from-secondary to-accent border-none text-primary-content font-bold tracking-wide"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        'Save Changes'
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

export default EditJobPage;
