import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Loading from '../components/Loading.jsx';
import { AppContext } from '../context/AppContext.jsx';
import { assets,jobsApplied } from '../assets/assets.js';
import moment from 'moment';
import JobCard from '../components/JobCard.jsx';

// Helper: convert salary to K, M, etc.
const kConvert = (num) => {
  if (!num) return "N/A";
  if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
  if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

function ApplyJob() {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  // Fetch the job by ID
  const fetchJob = () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      console.log("Job fetched:", data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) fetchJob();
  }, [id, jobs]);

  if (!JobData) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          {/* Job Header Section */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={JobData.companyId?.image || assets.default_company}
                alt=""
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{JobData.title}</h1>

                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId?.name || "Unknown Company"}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {kConvert(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button className="bg-blue-600 p-2.5 px-10 text-white rounded">
                Apply Now
              </button>
              <p className="mt-1 text-gray-600">
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full">
              <h2 className="text-xl font-semibold py-2">Job Description</h2>
              <div
                dangerouslySetInnerHTML={{ __html: JobData.description }}
                className="rich-text "
              />
              <div className="px-14 pb-10">
                <button className="bg-blue-600 p-2.5 px-10 text-white rounded">
                  Apply Now
                </button>
              </div>
              {/* Right Section More Jobs */}
              {/* Job Description + More Jobs Section */}
<div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-10">
  
  {/* LEFT: Job Description */}
  <div className="flex-1">
    <h2 className="text-xl font-semibold py-2">Job Description</h2>
    <div
      dangerouslySetInnerHTML={{ __html: JobData.description }}
      className="rich-text"
    />
    <div className="py-6">
      <button className="bg-blue-600 p-2.5 px-10 text-white rounded">
        Apply Now
      </button>
    </div>
  </div>

  {/* RIGHT: More Jobs Sidebar */}
  <div className="w-full lg:w-[30%] bg-sky-50 border border-sky-200 rounded-xl p-5 sticky top-20 h-fit shadow-sm">
    <h2 className="text-lg font-semibold mb-4">
      More jobs from {JobData.companyId?.name || "this company"}
    </h2>

    {jobs
      .filter(
        (job) =>
          job._id !== JobData._id &&
          (
            job.companyId === JobData.companyId?._id ||
            job.companyId?._id === JobData.companyId?._id
          )
      )
      .slice(0, 4)
      .map((job, index) => (
        <div key={index} className="mb-4">
          <JobCard job={job} />
        </div>
      ))}

    {/* Empty State */}
    {jobs.filter(
        (job) =>
          job._id !== JobData._id &&
          (
            job.companyId === JobData.companyId?._id ||
            job.companyId?._id === JobData.companyId?._id
          )
      ).length === 0 && (
      <p className="text-gray-500">No more jobs from this company.</p>
    )}
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyJob;
