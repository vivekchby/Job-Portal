import React from 'react'
import NavBar from '../components/Navbar.jsx'
import { assets, jobsApplied } from '../assets/assets.js'
import moment from 'moment'
import Footer from '../components/Footer.jsx'

function Applications() {
  const [isEdit, setIsEdit] = React.useState(false)
  const [resume, setResume] = React.useState(null)

  const handleSave = () => {
    if (resume) {
      alert(`Resume "${resume.name}" uploaded successfully!`)
    } else {
      alert('Please select a resume first.')
    }
    setIsEdit(false)
  }
return (
  <>
    <NavBar />
    <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
      {/* Resume Section */}
      <h2 className="text-xl font-semibold mb-4">Your Resume</h2>

      <div className="flex gap-3 mb-6 mt-3 items-center">
        {isEdit ? (
          <>
            <label
              htmlFor="resumeUpload"
              className="flex items-center cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
            >
              <img
                src={assets.profile_upload_icon}
                alt="Upload Icon"
                className="w-5 h-5 mr-2"
              />
              {resume ? resume.name : "Select Resume"}
            </label>

            <input
              id="resumeUpload"
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="hidden"
            />

            <button
              onClick={handleSave}
              className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
            >
              Save
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <a
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
              href="#"
            >
              Resume
            </a>
            <button
              onClick={() => setIsEdit(true)}
              className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Job Applications Table */}
      <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Company</th>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 flex items-center gap-2">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-8 h-8 rounded-full"
                    />
                    {job.company}
                  </td>
                  <td className="py-2 px-4">{job.title}</td>
                  <td className="py-2 px-4">{job.location}</td>
                  <td className="py-2 px-4">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 font-medium">
                    <span className={`${job.status==='Accepted' ? 'text-green-800 bg-green-100 border border-green-200 px-3 py-1.5 rounded' : job.status==='Pending' ? 'text-yellow-800 bg-yellow-100 border border-yellow-200 px-3 py-1.5 rounded' : 'text-red-800 bg-red-100 border border-red-200' } px-4 py-1.5 rounded`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : (null)
            )}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
  </>
);
}

export default Applications