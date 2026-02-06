import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

// Async Thunks
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/news-getNews`);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      console.log("News API Success:", data);
      return data;
    } catch (error) {
      console.error("News API Error:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const createNews = createAsyncThunk(
  "news/createNews",
  async (newsData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/news-createNews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });
      if (!response.ok) throw new Error("Failed to create news");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateNews = createAsyncThunk(
  "news/updateNews",
  async (newsData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/news-updateNews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });
      if (!response.ok) throw new Error("Failed to update news");
      return await response.json(); // Returning updated news
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (newsId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/news-deleteNews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: newsId }),
      });
      if (!response.ok) throw new Error("Failed to delete news");
      return newsId; // Return ID to remove from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// -- Jobs Thunks --
export const fetchJobs = createAsyncThunk(
  "news/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs-getJobs`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchJobDetail = createAsyncThunk(
  "news/fetchJobDetail",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs-getJobDetail?id=${jobId}`);
      if (!response.ok) throw new Error("Failed to fetch job detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createJob = createAsyncThunk(
  "news/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs-createJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      if (!response.ok) throw new Error("Failed to create job");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateJob = createAsyncThunk(
  "news/updateJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs-updateJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      if (!response.ok) throw new Error("Failed to update job");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteJob = createAsyncThunk(
  "news/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs-deleteJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: jobId }),
      });
      if (!response.ok) throw new Error("Failed to delete job");
      return jobId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// -- Updates Thunks --
export const fetchUpdates = createAsyncThunk(
  "news/fetchUpdates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/updates-getUpdates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error("Failed to fetch updates");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createUpdate = createAsyncThunk(
  "news/createUpdate",
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/updates-createUpdate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error("Failed to create update");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchNewsDetail = createAsyncThunk(
  "news/fetchNewsDetail",
  async (newsId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/news-getNewsDetail?id=${newsId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch news detail");
      const data = await response.json();
      console.log("News Detail API Success:", data);
      return data;
    } catch (error) {
      console.error("News Detail API Error:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const createNewsLine = createAsyncThunk(
  "news/createNewsLine",
  async (newsLineData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/news-createNewsLine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsLineData),
      });
      if (!response.ok) throw new Error("Failed to create news line");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchNewsLines = createAsyncThunk(
  "news/fetchNewsLines",
  async (newsId, { rejectWithValue }) => {
    try {
      // newsId is optional based on usage, appending if present
      const url = newsId
        ? `${BASE_URL}/news-getNewsLines?newsId=${newsId}`
        : `${BASE_URL}/news-getNewsLines`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news lines");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  currNewsDetail: null,
  currJobDetail: null,
  breakingNews: [
    "Results Expected Next Week",
    "New Tourism Package for Nellore Beach Destinations Launched",
    "Local Sports Team Qualifies for National Tournament",
    "APPSC Group 2 Main Examination Schedule Announced",
  ],
  jobsStatus: "idle", // idle, loading, succeeded, failed
  jobsError: null,
  govtJobs: [],
  privateJobs: [],
  internships: [],
  // Mock fallback data for when API fails
  mockGovtJobs: [
    {
      id: 1,
      title: "Junior Assistant",
      company: "AP District Court",
      location: "Nellore",
      postedDate: "Posted Today",
      description:
        "Clerical support for case records, data entry, front-desk assistance.",
      buttonType: "apply",
      salary: "₹25,000 / month",
      jobType: "Full-time",
      experience: "Fresher",
      skills: ["Data Entry", "Communication", "MS Office"],
      fullContent:
        "The AP District Court in Nellore is hiring for the position of Junior Assistant. This role involves managing case records, performing data entry tasks, and providing front-desk assistance to visitors. \n\n Candidates must have a bachelor's degree in any discipline and proficiency in local languages. This is a great opportunity to start a career in the judicial support system.",
    },
    {
      id: 2,
      title: "Village Revenue Officer",
      company: "Revenue Dept",
      location: "Naidupeta",
      postedDate: "2d ago",
      description:
        "Assist surveys, land records, grievance redressal at mandal level.",
      buttonType: "view",
      salary: "₹22,000 / month",
      jobType: "Full-time",
      experience: "0-1 years",
      skills: ["Surveying", "Record Keeping", "Public Administration"],
      fullContent:
        "The Revenue Department is seeking a dedicated Village Revenue Officer for the Naidupeta mandal. Key responsibilities include assisting with land surveys, maintaining revenue records, and addressing public grievances. \n\n Ideal candidates should have strong organizational skills and a willingness to work at the grassroots level. Previous experience in government administration is a plus.",
    },
    {
      id: 3,
      title: "Staff Nurse (District Hospital)",
      company: "Health Dept",
      location: "Kavali",
      postedDate: "1d ago",
      description:
        "Provide patient care, ward coordination, and basic diagnostics.",
      buttonType: "apply",
      salary: "₹35,000 / month",
      jobType: "Full-time",
      experience: "1-3 years",
      skills: ["Nursing", "Patient Care", "Emergency Response"],
      fullContent:
        "The District Hospital in Kavali requires qualified Staff Nurses to join their team. Responsibilities include providing high-quality patient care, coordinating ward activities, and performing basic diagnostic procedures. \n\n Valid nursing registration and relevant experience are mandatory. We offer a supportive work environment and opportunities for professional growth.",
    },
    {
      id: 4,
      title: "Assistant Engineer (Civil)",
      company: "R&B Dept",
      location: "Nellore",
      postedDate: "5d ago",
      description: "Site supervision, BOQ prep, and vendor coordination.",
      buttonType: "view",
      salary: "₹45,000 / month",
      jobType: "Full-time",
      experience: "2-5 years",
      skills: ["Civil Engineering", "Site Supervision", "AutoCAD"],
      fullContent:
        "The Roads & Buildings (R&B) Department is looking for an Assistant Engineer (Civil) for projects in Nellore. The role entails site supervision, preparation of Bills of Quantities (BOQ), and coordination with vendors and contractors. \n\n A degree in Civil Engineering and site experience are required. This is a challenging role suitable for dynamic professionals.",
    },
    {
      id: 13,
      title: "Primary School Teacher",
      company: "Govt School, Kovur",
      location: "Kovur",
      postedDate: "1d ago",
      description: "Teach Telugu and Math to primary standard students.",
      buttonType: "apply",
      salary: "₹28,000 / month",
      jobType: "Full-time",
      experience: "1-3 years",
      skills: ["Teaching", "Child Administration", "Telugu"],
      fullContent:
        "Government Primary School in Kovur is hiring dedicated teachers for Telugu and Mathematics. Candidates must have a B.Ed or D.Ed qualification and a passion for teaching young children.",
    },
    {
      id: 14,
      title: "Police Constable",
      company: "AP Police Dept",
      location: "Nellore City",
      postedDate: "3d ago",
      description:
        "Maintain law and order, patrol duties, and traffic management.",
      buttonType: "apply",
      salary: "₹24,000 / month",
      jobType: "Full-time",
      experience: "Fresher",
      skills: ["Physical Fitness", "Patrolling", "Public Safety"],
      fullContent:
        "AP Police Department is recruiting Constables for Nellore City. Duties include patrolling, traffic regulation, and maintaining public order. Physical efficiency tests and written exams are part of the selection process.",
    },
    {
      id: 15,
      title: "Forest Guard",
      company: "Forest Dept",
      location: "Venkatagiri",
      postedDate: "5d ago",
      description: "Protect forest resources and monitor wildlife.",
      buttonType: "view",
      salary: "₹20,000 / month",
      jobType: "Full-time",
      experience: "Fresher",
      skills: ["Wildlife", "Patrolling", "Fitness"],
      fullContent:
        "The Forest Department seeks Forest Guards for the Venkatagiri range. Responsibilities include preventing illegal poaching, monitoring wildlife movements, and forest fire prevention.",
    },
    {
      id: 16,
      title: "Postal Assistant",
      company: "India Post",
      location: "Atmakur",
      postedDate: "1w ago",
      description:
        "Handle mail sorting, customer queries, and banking services.",
      buttonType: "apply",
      salary: "₹25,500 / month",
      jobType: "Full-time",
      experience: "0-2 years",
      skills: ["Communication", "Computer Skills", "Mail Handling"],
      fullContent:
        "India Post is hiring Postal Assistants for the Atmakur Head Post Office. The role involves counter operations, mail processing, and promoting postal savings schemes.",
    },
    {
      id: 17,
      title: "Railway Clerk",
      company: "Southern Railway",
      location: "Nellore Junction",
      postedDate: "2d ago",
      description:
        "Ticket booking, reservation inquiries, and station records.",
      buttonType: "view",
      salary: "₹29,000 / month",
      jobType: "Full-time",
      experience: "1-4 years",
      skills: ["Typing", "Customer Service", "Railway Ops"],
      fullContent:
        "Southern Railway invites applications for Commercial Clerks at Nellore Junction. Key tasks include issuing tickets, handling reservation inquiries, and maintaining station records.",
    },
    {
      id: 18,
      title: "Anganwadi Worker",
      company: "WCD Dept",
      location: "Buchireddypalem",
      postedDate: "Today",
      description: "Maternal care, child nutrition, and pre-school education.",
      buttonType: "apply",
      salary: "₹11,500 / month",
      jobType: "Full-time",
      experience: "Fresher",
      skills: ["Child Care", "Nutrition", "Community Work"],
      fullContent:
        "Women and Child Development Department requires Anganwadi Workers in Buchireddypalem. The job involves monitoring child growth, providing supplementary nutrition, and conducting pre-school activities.",
    },
    {
      id: 19,
      title: "Public Librarian",
      company: "District Library",
      location: "Nellore",
      postedDate: "4d ago",
      description:
        "Manage book inventory, assist readers, and organize events.",
      buttonType: "view",
      salary: "₹22,000 / month",
      jobType: "Full-time",
      experience: "2 years",
      skills: ["Library Science", "Cataloging", "Event Org"],
      fullContent:
        "The District Central Library is looking for a qualified Librarian. Responsibilities include cataloging books, managing digital resources, and organizing reading events for the community.",
    },
  ],
  mockPrivateJobs: [
    {
      id: 5,
      title: "Logistics Executive",
      company: "Krishnapatnam Port",
      location: "Gudur",
      postedDate: "3+ yrs",
      description:
        "Coordinate yard operations, vendor communication, and MIS reporting.",
      buttonType: "apply",
      salary: "₹4-6 LPA",
      jobType: "Full-time",
      experience: "3+ years",
      skills: ["Logistics", "Supply Chain", "Vendor Management"],
      fullContent:
        "Krishnapatnam Port is hiring a Logistics Executive to oversee yard operations and vendor communications. The candidate will also be responsible for MIS reporting and ensuring smooth logistical flows. \n\n Experience in port operations or large-scale logistics is highly desirable. We offer a competitive package and a fast-paced work environment.",
    },
    {
      id: 6,
      title: "IT Support Engineer",
      company: "Regional HQ",
      location: "Nellore",
      postedDate: "Fresher",
      description:
        "Install and troubleshoot systems, respond to tickets, on-site support.",
      buttonType: "view",
      salary: "₹3-4 LPA",
      jobType: "Full-time",
      experience: "Fresher",
      skills: ["Hardware Support", "Networking", "Troubleshooting"],
      fullContent:
        "Regional HQ in Nellore is seeking an IT Support Engineer. The job involves installing and troubleshooting computer systems, responding to support tickets, and providing on-site technical assistance. \n\n Fresh graduates with a strong understanding of computer hardware and networking are encouraged to apply. Training will be provided.",
    },
    {
      id: 7,
      title: "Sales Associate (Retail)",
      company: "ElectroMart",
      location: "Nellore",
      postedDate: "Full-time",
      description: "Assist customers, manage billing, and stock shelves.",
      buttonType: "apply",
      salary: "₹15k / month + Incentives",
      jobType: "Full-time",
      experience: "0-2 years",
      skills: ["Sales", "Customer Service", "Retail"],
      fullContent:
        "ElectroMart is looking for energetic Sales Associates for its Nellore branch. Responsibilities include assisting customers with product selection, managing billing, and maintaining shelf stock. \n\n Excellent communication skills and a customer-centric attitude are essential. Previous retail experience is an added advantage.",
    },
    {
      id: 8,
      title: "QA Analyst",
      company: "Food Processing Unit",
      location: "Gudur",
      postedDate: "1-3 yrs",
      description: "Conduct lab tests, maintain QA logs, ensure compliance.",
      buttonType: "view",
      salary: "₹3.5-5 LPA",
      jobType: "Full-time",
      experience: "1-3 years",
      skills: ["Quality Assurance", "Lab Testing", "Compliance"],
      fullContent:
        "A leading Food Processing Unit in Gudur requires a QA Analyst. The role involves conducting laboratory tests, maintaining detailed QA logs, and ensuring compliance with food safety standards. \n\n A degree in Food Technology or Chemistry is preferred. Attention to detail and knowledge of safety regulations are critical for this role.",
    },
    {
      id: 20,
      title: "Junior Software Developer",
      company: "TechSolutions Pvt Ltd",
      location: "Nellore",
      postedDate: "2d ago",
      description:
        "Develop and maintain web applications using React and Node.js.",
      buttonType: "apply",
      salary: "₹3.5-5 LPA",
      jobType: "Full-time",
      experience: "0-2 years",
      skills: ["React", "Node.js", "JavaScript"],
      fullContent:
        "TechSolutions Pvt Ltd is hiring Junior Developers. You will work on full-stack web development projects. Mentorship provided for freshers.",
    },
    {
      id: 21,
      title: "Marketing Manager",
      company: "Nellore Retails",
      location: "Nellore",
      postedDate: "1w ago",
      description:
        "Plan marketing strategies and manage social media campaigns.",
      buttonType: "apply",
      salary: "₹5-7 LPA",
      jobType: "Full-time",
      experience: "3-5 years",
      skills: ["Marketing", "Social Media", "Strategy"],
      fullContent:
        "We are looking for an experienced Marketing Manager to lead our promotional campaigns. Must have a proven track record in retail marketing.",
    },
    {
      id: 22,
      title: "Senior Accountant",
      company: "AgriExports Ltd",
      location: "Kavali",
      postedDate: "3d ago",
      description: "Manage ledgers, tax filings, and financial reporting.",
      buttonType: "view",
      salary: "₹4-6 LPA",
      jobType: "Full-time",
      experience: "4+ years",
      skills: ["Tally", "GST", "Accounting"],
      fullContent:
        "AgriExports Ltd requires a Senior Accountant. Responsibilities include GST filing, balance sheet preparation, and internal auditing.",
    },
    {
      id: 23,
      title: "HR Executive",
      company: "Sunrise Hospitals",
      location: "Nellore",
      postedDate: "Today",
      description: "Recruitment, payroll processing, and employee relations.",
      buttonType: "apply",
      salary: "₹3 LPA",
      jobType: "Full-time",
      experience: "1-2 years",
      skills: ["Recruitment", "Payroll", "Communication"],
      fullContent:
        "Sunrise Hospitals is hiring an HR Executive. You will handle end-to-end recruitment for support staff and manage monthly payroll processing.",
    },
    {
      id: 24,
      title: "Delivery Partner",
      company: "FastDelivery",
      location: "Nellore City",
      postedDate: "Just now",
      description: "Deliver packages to customers. Own vehicle required.",
      buttonType: "apply",
      salary: "₹18,000 / month",
      jobType: "Contract",
      experience: "Fresher",
      skills: ["Driving", "Navigation", "Time Mgmt"],
      fullContent:
        "Join FastDelivery as a delivery partner. Flexible shifts available. Must have a valid two-wheeler license and smartphone.",
    },
    {
      id: 25,
      title: "Graphic Designer",
      company: "CreativeAds Agency",
      location: "Nellore",
      postedDate: "4d ago",
      description: "Design logos, brochures, and social media posts.",
      buttonType: "view",
      salary: "₹2.5-4 LPA",
      jobType: "Full-time",
      experience: "1-3 years",
      skills: ["Photoshop", "Illustrator", "Creativity"],
      fullContent:
        "CreativeAds Agency is looking for a creative Graphic Designer. Portfolio is mandatory. Work on branding projects for local businesses.",
    },
  ],
  mockInternships: [
    {
      id: 9,
      title: "Marketing Intern",
      company: "Local Tourism Board",
      location: "",
      postedDate: "6 weeks",
      description: "Assist campaigns, content calendars, and partner outreach.",
      buttonType: "apply",
      salary: "Stipend: ₹5,000 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["Social Media", "Content Creation", "Marketing"],
      fullContent:
        "The Local Tourism Board is offering a Marketing Internship. Interns will assist with promotional campaigns, manage content calendars, and reach out to potential partners. \n\n This is a great opportunity for students to gain hands-on experience in tourism marketing. Creativity and good communication skills are a must.",
    },
    {
      id: 10,
      title: "GIS Intern",
      company: "Urban Planning Cell",
      location: "",
      postedDate: "8 weeks",
      description:
        "Map civic assets and create simple dashboards for field teams.",
      buttonType: "view",
      salary: "Stipend: ₹7,000 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["GIS", "Mapping", "Data Analysis"],
      fullContent:
        "The Urban Planning Cell invites applications for a GIS Intern. The role involves mapping civic assets using GIS tools and creating simple dashboards for field teams. \n\n Geography or Urban Planning students with basic GIS knowledge are encouraged to apply. This internship offers valuable exposure to urban development projects.",
    },
    {
      id: 11,
      title: "Content Intern (Travel)",
      company: "Nelloriens Studio",
      location: "",
      postedDate: "8 weeks",
      description: "Create reels and guides about local attractions and food.",
      buttonType: "apply",
      salary: "Stipend: ₹6,000 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["Video Editing", "Writing", "Travel Blogging"],
      fullContent:
        "Nelloriens Studio is looking for a Content Intern (Travel) to create engaging reels and guides about local attractions and food. \n\n Passion for travel and food, along with basic video editing skills, is required. Join us to showcase the beauty of our region to the world.",
    },
    {
      id: 12,
      title: "Data Entry Intern",
      company: "Civic Records Cell",
      location: "",
      postedDate: "4 weeks",
      description: "Digitize forms, maintain spreadsheets, basic QC.",
      buttonType: "view",
      salary: "Unpaid",
      jobType: "Internship",
      experience: "Student",
      skills: ["Typing", "Excel", "Attention to Detail"],
      fullContent:
        "The Civic Records Cell is looking for a Data Entry Intern. The primary tasks include digitizing physical forms, maintaining spreadsheets, and performing basic quality checks. \n\n This is an entry-level position suitable for students looking to gain office experience. Punctuality and accuracy are key.",
    },
    {
      id: 26,
      title: "HR Intern",
      company: "TechPark Inc",
      location: "Nellore",
      postedDate: "1 month",
      description: "Assist in screening resumes and coordinating interviews.",
      buttonType: "apply",
      salary: "Stipend: ₹8,000 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["HR", "Communication", "Scheduling"],
      fullContent:
        "Learn the basics of Human Resources at TechPark Inc. Interns will assist the recruitment team in screening candidates and scheduling interviews.",
    },
    {
      id: 27,
      title: "Graphic Design Intern",
      company: "PrintMagic",
      location: "Gudur",
      postedDate: "2 weeks",
      description: "Create print layouts and edit photos.",
      buttonType: "view",
      salary: "Stipend: ₹5,000 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["Design", "CorelDraw", "Photoshop"],
      fullContent:
        "PrintMagic offers an internship for design students. Gain real-world experience in print media design and layout formatting.",
    },
    {
      id: 28,
      title: "Web Development Intern",
      company: "StartWeb",
      location: "Remote",
      postedDate: "3 weeks",
      description: "Fix bugs and build small components for websites.",
      buttonType: "apply",
      salary: "Stipend: ₹10,000 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["HTML", "CSS", "JavaScript"],
      fullContent:
        "StartWeb is hiring remote interns for web development. Ideal for CS students looking to build their GitHub portfolio. Flexible hours.",
    },
    {
      id: 29,
      title: "Operations Intern",
      company: "LogiTrans",
      location: "Krishnapatnam",
      postedDate: "1 week",
      description: "Track shipments and update logistics data.",
      buttonType: "view",
      salary: "Stipend: ₹7,500 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["Logistics", "Excel", "Coordination"],
      fullContent:
        "LogiTrans is looking for interns to help with daily operations tracking. Exposure to port logistics and supply chain management provided.",
    },
    {
      id: 30,
      title: "Social Media Intern",
      company: "FashionHub",
      location: "Nellore",
      postedDate: "Today",
      description: "Manage Instagram and Facebook pages.",
      buttonType: "apply",
      salary: "Stipend: ₹4,000 / month",
      jobType: "Internship",
      experience: "Student",
      skills: ["Social Media", "Trends", "Content"],
      fullContent:
        "FashionHub needs a trendy intern to manage our social media presence. Create reels, posts, and engage with our followers.",
    },
    {
      id: 31,
      title: "Sales Intern",
      company: "AutoWorld",
      location: "Nellore",
      postedDate: "5 days",
      description: "Assist in showroom activities and customer interaction.",
      buttonType: "view",
      salary: "Stipend: ₹6,000 / month + Comm",
      jobType: "Internship",
      experience: "Student",
      skills: ["Sales", "Automobile", "Persuasion"],
      fullContent:
        "AutoWorld offers an internship in sales. Learn how to interact with customers and understand vehicle features. Performance-based incentives available.",
    },
  ],
  mockUpdatesFeedItems: [
    {
      id: 1,
      title: "AP Fisheries Dept: Field Assistant openings",
      category: "Jobs",
      icon: "bi-briefcase",
      timeLabel: "2 hrs ago",
      timeframe: "Last 7 days",
      location: "Nellore",
      scope: "District",
      description:
        "Applications open until Nov 12. 50 vacancies. Diploma preferred.",
      primaryAction: "View",
      secondaryAction: "Save",
      updatedAt: 9,
      engagementScore: 72,
      detail: {
        postedOn: "Oct 27 2025",
        meta: [
          { label: "Category", value: "Jobs" },
          { label: "Location", value: "Nellore" },
          { label: "Last date", value: "Nov 12" },
        ],
        highlights: [
          "Eligibility: Diploma / ITI. Age 18–32.",
          "Documents: Aadhaar, certificates, photos.",
          "Apply at district office or via online portal.",
        ],
      },
    },
    {
      id: 2,
      title: "Rain alert: Schools to function till noon",
      category: "News",
      icon: "bi-newspaper",
      timeLabel: "4 hrs ago",
      timeframe: "Today",
      location: "District",
      scope: "District",
      description:
        "IMD issues yellow alert for coastal AP. Commute with caution.",
      primaryAction: "Read",
      secondaryAction: "Share",
      updatedAt: 8,
      engagementScore: 64,
      detail: {
        postedOn: "Oct 27 2025",
        meta: [
          { label: "Issued by", value: "IMD" },
          { label: "Alert", value: "Yellow" },
          { label: "Coverage", value: "Entire district" },
        ],
        highlights: [
          "Morning schools operate till noon as precaution.",
          "Commuters advised to avoid peak-hour travel.",
          "Fishermen cautioned against venturing far from shore.",
        ],
      },
    },
    {
      id: 3,
      title: "Polytechnic Results: Revaluation dates released",
      category: "Results",
      icon: "bi-mortarboard",
      timeLabel: "Today",
      timeframe: "Today",
      location: "State",
      scope: "State",
      description:
        "Revaluation window from Oct 29 to Nov 2. Help desks available.",
      primaryAction: "Check",
      secondaryAction: "Download",
      updatedAt: 10,
      engagementScore: 81,
      detail: {
        postedOn: "Oct 27 2025",
        meta: [
          { label: "Window", value: "Oct 29 - Nov 2" },
          { label: "Fee", value: "₹500 per paper" },
          { label: "Support", value: "Help desks @ polytechnic colleges" },
        ],
        highlights: [
          "Use hall-ticket number to apply online.",
          "Original mark sheet mandatory for submission.",
          "Results expected within 15 days after window closes.",
        ],
      },
    },
    {
      id: 4,
      title: "Tourism: Weekend heritage walk slots added",
      category: "Tourism",
      icon: "bi-globe",
      timeLabel: "17 hrs ago",
      timeframe: "Last 7 days",
      location: "Nellore Fort",
      scope: "City",
      description: "Extra 30 slots available for Saturday evening walk.",
      primaryAction: "Book",
      secondaryAction: "Itinerary",
      updatedAt: 6,
      engagementScore: 55,
      detail: {
        postedOn: "Oct 26 2025",
        meta: [
          { label: "Slots", value: "30 added" },
          { label: "Timing", value: "Saturday, 5 PM" },
          { label: "Guide", value: "Local historians" },
        ],
        highlights: [
          "Includes complimentary audio device.",
          "Assemble at fort entrance 15 mins prior.",
          "Family-friendly with wheelchair support.",
        ],
      },
    },
    {
      id: 5,
      title: "Traffic advisory: One-way trial near Pogathota",
      category: "News",
      icon: "bi-megaphone",
      timeLabel: "Today",
      timeframe: "Today",
      location: "City",
      scope: "City",
      description: "Diversions between 6-9 PM. Expect delays on trunk road.",
      primaryAction: "Map",
      secondaryAction: "Remind",
      updatedAt: 7,
      engagementScore: 60,
      detail: {
        postedOn: "Oct 28 2025",
        meta: [
          { label: "Duration", value: "6-9 PM" },
          { label: "Stretch", value: "Pogathota main road" },
          { label: "Contact", value: "Traffic helpline 100" },
        ],
        highlights: [
          "One-way pilot to ease evening congestion.",
          "Use alternate routes via Magunta Layout.",
          "Public transport frequency increased during trial.",
        ],
      },
    },
    {
      id: 6,
      title: "Krishnapatnam Port: Night operations expanded",
      category: "Jobs",
      icon: "bi-briefcase",
      timeLabel: "18 min ago",
      timeframe: "Today",
      location: "Harbor",
      scope: "Regional",
      description: "Additional berths open 10 PM–5 AM to ease cargo movement.",
      primaryAction: "Open",
      secondaryAction: "Follow",
      updatedAt: 11,
      engagementScore: 78,
      detail: {
        postedOn: "Oct 29 2025",
        meta: [
          { label: "Shift", value: "10 PM – 5 AM" },
          { label: "Berths", value: "2 extra" },
          { label: "Ops", value: "Bulk + container" },
        ],
        highlights: [
          "Additional staffing requirements announced internally.",
          "Helpline available for fleet scheduling support.",
          "Goal: reduce average vessel wait time by 40 minutes.",
        ],
      },
    },
  ],
  updateCategoryTabs: [
    { label: "All", icon: "bi-bell" },
    { label: "Jobs", icon: "bi-briefcase" },
    { label: "News", icon: "bi-newspaper" },
    { label: "Results", icon: "bi-mortarboard" },
    { label: "Tourism", icon: "bi-globe" },
  ],
  updatesFilterOptions: {
    category: ["All", "Jobs", "News", "Results", "Tourism"],
    time: ["Last 7 days", "Today", "Last 30 days", "All time"],
    location: ["Global", "Regional", "State", "District", "City"],
    sort: ["Recent", "Popular"],
  },
  updatesQuickLinks: [
    { id: 1, icon: "bi-briefcase", label: "Latest Govt Jobs" },
    { id: 2, icon: "bi-mortarboard", label: "Exam Results & Schedules" },
    { id: 3, icon: "bi-newspaper", label: "Top News Today" },
    { id: 4, icon: "bi-globe", label: "Tourism Guides" },
  ],
  updatesTrendingTags: [
    "#nellore",
    "#jobs",
    "#results",
    "#traffic",
    "#tourism",
  ],
  updatesSavedItems: [
    { id: 1, label: "Scholarship applications open" },
    { id: 2, label: "Heritage walk slots added" },
    { id: 3, label: "Traffic advisory tonight" },
  ],
  updatesPaginationInfo: {
    current: 1,
    total: 14,
  },
  updatesStatusIndicators: [
    { id: 2, icon: "bi-chat-right", label: "Community comments open" },
    { id: 3, icon: "bi-bookmark-check", label: "Saved updates visible" },
  ],
  updatesFeedItems: [], // Main list associated with API
  updatesStatus: "idle", // idle, loading, succeeded, failed
  updatesError: null,
  jobsPage: {
    currentPage: 1,
    totalPages: 32,
    isLoading: false,
  },
  newsFeedFilters: [
    { id: "All", label: "All" },
    { id: "local", label: "Local", icon: "bi-house-door" },
    { id: "tourism", label: "Tourism", icon: "bi-sun" },
    { id: "international", label: "International", icon: "bi-globe2" },
  ],
  newsFeedArticles: [
    {
      id: 1,
      title: "Coastal cleanup drive this Sunday",
      categoryLabel: "Local",
      time: "2 hrs ago",
      filterCategory: "local",
      summary:
        "Volunteers are gathering this Sunday for a massive coastal cleanup drive to preserve our beautiful beaches. Participation is open to all.",
      fullContent:
        "Volunteers are gathering this Sunday for a massive coastal cleanup drive to preserve our beautiful beaches. This initiative, organized by local environmental groups, aims to remove plastic waste and debris from the shoreline. \n\n Participation is open to all residents, and necessary equipment such as gloves and bags will be provided. The event kicks off at 7 AM at the main beach entrance. Local businesses have also pledged to provide refreshments for the volunteers.",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&h=500&fit=crop",
    },
    {
      id: 2,
      title: "New flight routes to Chennai & Hyderabad",
      categoryLabel: "Travel",
      time: "4 hrs ago",
      filterCategory: "local",
      summary:
        "New daily flight services to Chennai and Hyderabad starting next month to boost local connectivity and support tourism.",
      fullContent:
        "Starting next month, new daily flight services to Chennai and Hyderabad will be operational. This move is expected to significantly boost local connectivity, making travel easier for business and leisure. \n\n The airport authority has confirmed that major airlines are participating in this expansion. This is a significant step towards supporting the growing tourism industry in the region, offering convenient options for travelers.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Markets rally after policy update",
      categoryLabel: "International",
      time: "Today",
      filterCategory: "international",
      summary:
        "Global markets show a positive trend following the recent economic policy announcements, with major indices closing higher.",
      fullContent:
        "Global markets have shown a strong positive trend immediately following the recent economic policy announcements. Major indices across Asia, Europe, and the Americas closed significantly higher. \n\n Analysts attribute this rally to increased investor confidence and the promise of regulatory reforms. Technology and manufacturing sectors saw the highest gains, signaling a robust outlook for the coming quarter.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Port throughput hits monthly record",
      categoryLabel: "Business",
      time: "1 hr ago",
      filterCategory: "international",
      summary:
        "Krishnapatnam Port records highest ever monthly cargo throughput, signaling strong trade growth and operational efficiency.",
      fullContent:
        "Krishnapatnam Port has recorded its highest-ever monthly cargo throughput, a milestone that underscores the region's growing importance in international trade. The surge is driven by increased handling of coal, fertilizers, and containerized cargo. \n\n Port officials cited improved operational efficiency and recent infrastructure upgrades as key factors. This breaking record signals strong trade growth and boosts the local economy.",
      image:
        "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Intermittent showers across district",
      categoryLabel: "Weather",
      time: "Today",
      filterCategory: "local",
      summary:
        "Meteorological department predicts intermittent showers across the district for the next 24 hours. Residents are advised to carry umbrellas.",
      fullContent:
        "The Meteorological department has predicted intermittent showers across the entire district for the next 24 hours. A low-pressure area forming in the Bay of Bengal is the primary cause. \n\n Residents are advised to carry umbrellas and drive carefully, as some low-lying areas might experience waterlogging. Fishermen have been warned not to venture deep into the sea until further notice.",
      image:
        "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=800&h=500&fit=crop",
    },
    {
      id: 6,
      title: "State volleyball qualifiers announced",
      categoryLabel: "Sports",
      time: "3 hrs ago",
      filterCategory: "international",
      summary:
        "Dates and venues for the State Volleyball qualifiers have been officially announced today. Teams are gearing up for the competition.",
      fullContent:
        "The official dates and venues for the highly anticipated State Volleyball qualifiers were announced today. The tournament will take place at the District Indoor Stadium starting next week. \n\n Teams from all over the state are gearing up for the intense competition. Selectors will be present to scout talent for the upcoming National Games, adding high stakes to every match.",
      image:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
    },
    {
      id: 7,
      title: "Polytechnic results: help desks set up",
      categoryLabel: "Education",
      time: "5 hrs ago",
      filterCategory: "tourism",
      summary:
        "Help desks have been established to assist students with Polytechnic results and revaluation queries near major colleges.",
      fullContent:
        "Special help desks have been established near major government and private colleges to assist students with their Polytechnic results. These desks will also handle queries regarding revaluation and supplementary exams. \n\n The initiative aims to reduce confusion and anxiety among students. Officials will be available from 9 AM to 5 PM to guide students through the necessary paperwork and online procedures.",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=500&fit=crop",
    },
    {
      id: 8,
      title: "Peak-hour traffic diversions tonight",
      categoryLabel: "Traffic",
      time: "Tonight",
      filterCategory: "tourism",
      summary:
        "Traffic diversions will be in place tonight during peak hours due to ongoing road maintenance work near the city center.",
      fullContent:
        "Motorists are advised that traffic diversions will be in place tonight during peak hours, specifically from 6 PM to 10 PM. This is due to urgent road maintenance work near the city center circle. \n\n Traffic police will be deployed to guide vehicles through alternate routes. Commuters are requested to plan their journeys accordingly and expect slight delays.",
      image:
        "https://images.unsplash.com/photo-1503785640985-f62e9378a7b6?w=800&h=500&fit=crop",
    },
    {
      id: 9,
      title: "Cultural fest lineup released",
      categoryLabel: "Events",
      time: "This Week",
      filterCategory: "tourism",
      summary:
        "The much-awaited cultural festival lineup is out, featuring top artists and traditional performances from across the state.",
      fullContent:
        "The organizers have finally released the lineup for the much-awaited annual Cultural Festival. The event will feature top artists, folk dancers, and traditional musicians from across the state. \n\n Highlights include a classical fusion concert on opening night and a grand street parade on the final day. Tickets are available online and at select venues starting tomorrow.",
      image:
        "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&h=500&fit=crop",
    },
    {
      id: 10,
      title: "New Eco-Park Proposed Near Penna River",
      categoryLabel: "Local",
      time: "Yesterday",
      filterCategory: "local",
      summary:
        "City council proposes a new eco-friendly park along the Penna riverbank to boost green cover and recreational spaces.",
      fullContent:
        "The City Council has unveiled plans for a sprawling new eco-park situated along the banks of the Penna River. The project aims to increase the city's green cover while providing a much-needed recreational space for families. \n\n Features will include jogging tracks, a botanical garden, and solar-powered lighting. Public consultations are scheduled for next week to gather feedback from residents.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop",
    },
    {
      id: 11,
      title: "Tech Summit 2025: Nellore edition",
      categoryLabel: "Business",
      time: "2 days ago",
      filterCategory: "business",
      summary:
        "Leading tech firms to gather in Nellore for a regional summit focused on digital transformation in tier-2 cities.",
      fullContent:
        "Nellore is set to host the regional edition of the prestigious Tech Summit 2025. The event will bring together CEOs and innovators from leading tech firms to discuss digital transformation opportunities in tier-2 cities. \n\n Key topics include smart city solutions, agritech innovations, and remote work infrastructure. Local startups will also have a platform to pitch their ideas to potential investors.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    },
    {
      id: 12,
      title: "District Hospital Upgrade Approved",
      categoryLabel: "Health",
      time: "3 days ago",
      filterCategory: "local",
      summary:
        "State government sanctions funds for upgrading the district hospital with advanced diagnostic equipment and more beds.",
      fullContent:
        "In a major boost to local healthcare, the state government has sanctioned significant funds for the upgrade of the District Hospital. The plan includes the installation of advanced diagnostic equipment like MRI and CT scan machines, and the addition of 100 new beds. \n\n Construction is expected to begin next month, with a target completion date of one year. This will greatly reduce the need for patients to travel to larger cities for specialized care.",
      image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=500&fit=crop",
    },
    {
      id: 13,
      title: "Farmers Market Digitalized",
      categoryLabel: "Business",
      time: "4 days ago",
      filterCategory: "local",
      summary:
        "Local farmers market adopts digital payments and online ordering system to reach wider customer base.",
      fullContent:
        "The historic weekly farmers market has taken a leap into the digital age. Vendors have now adopted digital payment methods, and a new online ordering system allows residents to have fresh produce delivered to their doorstep. \n\n The initiative, supported by a local cooperative, aims to help farmers reach a wider customer base and ensure fair pricing. Early feedback from both vendors and customers has been overwhelmingly positive.",
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=500&fit=crop",
    },
    {
      id: 14,
      title: "Library Renovation Completed",
      categoryLabel: "Education",
      time: "5 days ago",
      filterCategory: "education",
      summary:
        "The central public library reopens after extensive renovations, featuring a modern digital archive and study halls.",
      fullContent:
        "Book lovers rejoice! The Central Public Library has reopened its doors after extensive renovations. The upgraded facility now features a modern digital archive, comfortable study halls with Wi-Fi, and a dedicated children's section. \n\n Membership drives are currently underway with discounted rates for students. The library also plans to host weekly reading clubs and author meet-and-greet sessions.",
      image:
        "https://images.unsplash.com/photo-1507842217121-9e87bd229f27?w=800&h=500&fit=crop",
    },
    {
      id: 15,
      title: "City Marathon: Registrations Open",
      categoryLabel: "Sports",
      time: "Last Week",
      filterCategory: "sports",
      summary:
        'Registrations are now open for the annual City Marathon. Thousands expected to participate for the cause of "Clean City".',
      fullContent:
        "Registrations are officially open for this year's City Marathon. \"Run for a Clean City\" is the theme, aiming to raise awareness about waste management and environmental hygiene. \n\n Thousands of runners, including professional athletes and local enthusiasts, are expected to participate. The marathon will cover a scenic route through the city's historic landmarks and end at the stadium.",
      image:
        "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=500&fit=crop",
    },
    {
      id: 16,
      title: "University Announces New Courses",
      categoryLabel: "Education",
      time: "Last Week",
      filterCategory: "education",
      summary:
        "Regional University introduces new specialized courses in Data Science and Renewable Energy for the upcoming academic year.",
      fullContent:
        "The Regional University has announced the introduction of several new specialized courses for the upcoming academic year. Key additions include Bachelor's and Master's programs in Data Science, Artificial Intelligence, and Renewable Energy. \n\n The curriculum has been designed in collaboration with industry experts to ensure students are job-ready. Applications are now being accepted online.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
    },
    {
      id: 17,
      title: "Heritage Site Restoration Begins",
      categoryLabel: "Tourism",
      time: "Last Week",
      filterCategory: "tourism",
      summary:
        "Archaeological department starts restoration work on the ancient Ranganatha temple gates.",
      fullContent:
        "The Archaeological Department has commenced restoration work on the ancient gates of the Ranganatha Swamy Temple. The project aims to preserve the intricate carvings and structural integrity of this historic monument. \n\n Experts from across the country have been brought in to oversee the delicate process. The restoration is part of a larger initiative to boost heritage tourism in the district.",
      image:
        "https://images.unsplash.com/photo-1599520445667-bb96e1e81e3a?w=800&h=500&fit=crop",
    },
    {
      id: 18,
      title: "Local Artist Exhibit at Town Hall",
      categoryLabel: "Culture",
      time: "Last Week",
      filterCategory: "culture",
      summary:
        "A week-long exhibition showcasing paintings and sculptures by local artists opens at the Town Hall.",
      fullContent:
        "A week-long art exhibition showcasing the works of talented local artists has opened at the Town Hall. The exhibit features a diverse range of paintings, sculptures, and installations reflecting the region's culture and landscapes. \n\n Admission is free, and several pieces are available for purchase, with proceeds going to support local art schools. It's a must-visit for art enthusiasts.",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=500&fit=crop",
    },
    {
      id: 19,
      title: "Solar Power Plant Expansion",
      categoryLabel: "Business",
      time: "2 weeks ago",
      filterCategory: "business",
      summary:
        "Regional solar power plant announces expansion plans to double capacity by next year.",
      fullContent:
        "The regional solar power plant has announced ambitious plans to double its energy generation capacity by next year. The expansion will involve installing new high-efficiency solar panels across an additional 50 acres of land. \n\n This move is expected to significantly reduce the district's reliance on thermal power and create over 200 new jobs during the construction and maintenance phases.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
    },
    {
      id: 20,
      title: "Youth Sports Championship",
      categoryLabel: "Sports",
      time: "2 weeks ago",
      filterCategory: "sports",
      summary:
        "Inter-district youth sports championship concludes with Nellore topping the medal tally.",
      fullContent:
        "The Inter-District Youth Sports Championship concluded yesterday with a grand ceremony. Nellore athletes have made the city proud by topping the overall medal tally, securing gold in athletics, swimming, and kabaddi. \n\n The winners were felicitated by the District Collector, who announced scholarships for the top performers to support their future training.",
      image:
        "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&h=500&fit=crop",
    },
    {
      id: 21,
      title: "New Organic Farming Cooperative",
      categoryLabel: "Local",
      time: "2 weeks ago",
      filterCategory: "local",
      summary:
        "Farmers form a new cooperative to promote organic farming practices and direct-to-consumer sales.",
      fullContent:
        "In a bid to promote sustainable agriculture, over 100 local farmers have come together to form a new Organic Farming Cooperative. The cooperative will provide training on organic methods, facilitate certification, and set up direct-to-consumer sales channels. \n\n Consumers can look forward to chemical-free fruits and vegetables at affordable prices, while farmers enjoy better margins.",
      image:
        "https://images.unsplash.com/photo-1625246333195-f81961856126?w=800&h=500&fit=crop",
    },
  ],
  newsPage: {
    currentPage: 2,
    totalPages: 32,
    isLoading: false,
  },
  featuredArticle: {
    id: 1,
    title: "Port throughput hits monthly record",
    publishedDate: "27 Oct 2025",
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&h=600&fit=crop",
    summary:
      "Record cargo movement reported at Krishnapatnam Port driven by agri and mineral exports. Officials project steady growth into next quarter.",
  },
  liveNewsFeed: [
    {
      id: 1,
      title: "Breaking: Heavy rainfall alert issued for coastal AP",
      category: "Weather",
      time: "5 min ago",
      image:
        "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=400&h=250&fit=crop",
      actions: ["Open", "Share"],
    },
    {
      id: 2,
      title: "Krishnapatnam Port expands night operations",
      category: "Business",
      time: "18 min ago",
      image:
        "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&h=250&fit=crop",
      actions: ["Open", "Save"],
    },
    {
      id: 3,
      title: "Traffic eased after new one-way at Pogathota",
      category: "Local",
      time: "32 min ago",
      image:
        "https://images.unsplash.com/photo-1503785640985-f62e9378a7b6?w=400&h=250&fit=crop",
      actions: ["Open", "Discuss"],
    },
    {
      id: 4,
      title: "Scholarship applications open for PG students",
      category: "Education",
      time: "45 min ago",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&h=250&fit=crop",
      actions: ["Open", "Source"],
    },
  ],
  headlines: {
    list: [
      "AP Tourism adds weekend heritage walks",
      "City hospital inaugurates cardiac wing",
      "Fish prices dip after bumper catch",
    ],
    items: [
      {
        id: 1,
        title: "District T20 trials on Nov 3",
        category: "Sports",
        time: "Today",
        image:
          "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
      },
      {
        id: 2,
        title: "Temple fest traffic advisory",
        category: "Advisory",
        time: "1 hr ago",
        image:
          "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=400&h=250&fit=crop",
      },
    ],
  },
  liveNewsCount: 4,
  newsItems: [
    {
      id: 1,
      title: "City to host coastal cleanup drive",
      subtitle: "2 hrs ago",
      icon: "bi-broadcast",
      badge: "Nellore",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "National Games: State clinches 3 golds",
      subtitle: "Featured - 2h",
      icon: "bi-trophy",
      badge: "Sports",
      badgeColor: "light-blue",
    },
  ],
  publicInfo: [
    {
      id: 1,
      title: "Power shutdown schedule (Nov 29)",
      subtitle: "DISCOM",
      icon: "bi-bell",
      badge: "Notice",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "Light showers across district",
      subtitle: "IMD",
      icon: "bi-cloud-rain",
      badge: "Weather",
      badgeColor: "light-blue",
    },
  ],
  events: [
    {
      id: 1,
      title: "Tourism Festival Opening Night",
      subtitle: "Friday - Beach Road",
      icon: "bi-calendar-event",
      badge: "Free",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "Folk Music Evening",
      subtitle: "Saturday - Town Hall",
      icon: "bi-music-note-beamed",
      badge: "Cultural",
      badgeColor: "light-blue",
    },
  ],
  results: [
    {
      id: 1,
      title: "APPSC Group-4 provisional list",
      subtitle: "Download PDF",
      icon: "bi-file-earmark-text",
      badge: "Official",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "Polytechnic semester results",
      subtitle: "Check roll no.",
      icon: "bi-mortarboard",
      badge: "Academic",
      badgeColor: "light-blue",
    },
  ],
  sports: [
    {
      id: 1,
      title: "State wins 3 golds in athletics",
      subtitle: "2h ago - Featured",
      icon: "bi-clock",
      badge: "Read",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "School cricket league new format",
      subtitle: "Yesterday",
      icon: "bi-bookmark",
      badge: "Update",
      badgeColor: "light-blue",
    },
  ],
  foods: [
    {
      id: 1,
      title: "Nellore Chepala Pulusu",
      subtitle: "Traditional fish curry",
      icon: "bi-egg-fried",
      badge: "Local",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "Ghee Dosa (Ghee Dosa Town)",
      subtitle: "Famous street food",
      icon: "bi-cup-hot",
      badge: "Popular",
      badgeColor: "light-blue",
    },
  ],
  history: [
    {
      id: 1,
      title: "Origins of Simhapuri",
      subtitle: "From ancient trade to modern hub",
      icon: "bi-building",
      badge: "Read",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "Udayagiri Fort timeline",
      subtitle: "Key rulers & events",
      icon: "bi-castle",
      badge: "Archive",
      badgeColor: "light-blue",
    },
  ],
  famousstay: [
    {
      id: 1,
      title: "Seaside Resort - Mypadu",
      subtitle: "Family friendly - Beachfront",
      icon: "bi-house-door",
      badge: "Stay",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "Business Hotel - City Center",
      subtitle: "Near transport hub",
      icon: "bi-building",
      badge: "Business",
      badgeColor: "light-blue",
    },
  ],
  offers: [
    {
      id: 1,
      title: "Restaurant Week: Flat 20% off",
      subtitle: "Across select eateries",
      icon: "bi-percent",
      badge: "Limited",
      badgeColor: "light-blue",
    },
    {
      id: 2,
      title: "Bus Pass Discounts",
      subtitle: "Students & seniors",
      icon: "bi-bus",
      badge: "Save",
      badgeColor: "light-blue",
    },
  ],
  newsLines: [
    {
      id: 1,
      text: "Heavy traffic near Magunta Layout; expect delays",
      icon: "bi-lightning",
    },
    { id: 2, text: "Water maintenance 10am-2pm in Ward 5", icon: "bi-droplet" },
    {
      id: 3,
      text: "State-level volleyball trials on Saturday",
      icon: "bi-volleyball",
    },
  ],
  sponsored: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
      title: "Explore Maldives & Sri Lanka",
      subtitle: "Curated packages from Chennai",
      buttonText: "Book Now",
      buttonColor: "blue",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop",
      title: "Nellore Meals Festival",
      subtitle: "20% off this week",
      buttonText: "Visit",
      buttonColor: "gray",
    },
  ],
  commonAds: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=250&fit=crop",
      title: "Festival Electronics Sale",
      buttonText: "Shop",
      buttonColor: "blue",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
      title: "Coaching Admissions Open",
      buttonText: "Enroll",
      buttonColor: "gray",
    },
  ],
  updates: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNews: (state, action) => {
      state.newsItems.push(action.payload);
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    addUpdate: (state, action) => {
      state.updates.push(action.payload);
    },
    setNewsPage: (state, action) => {
      state.newsPage.currentPage = action.payload;
    },
    setNewsLoading: (state, action) => {
      state.newsPage.isLoading = action.payload;
    },
    setJobsPage: (state, action) => {
      state.jobsPage.currentPage = action.payload;
    },
    setJobsLoading: (state, action) => {
      state.jobsPage.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch News
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Assuming API returns { data: [...] } or just [...]
        // Adjust based on actual API response structure.
        // If API returns list, use action.payload.
        // For now, replacing newsFeedArticles if payload is array
        let articles = [];
        if (Array.isArray(action.payload)) {
          articles = action.payload;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          articles = action.payload.data;
        }
        state.newsFeedArticles = articles;

        // Also update newsItems for the dashboard
        state.newsItems = articles.slice(0, 5).map((article) => ({
          id: article.id,
          title: article.title,
          subtitle: article.time || "Recently",
          icon: "bi-newspaper",
          badge: article.categoryLabel || "News",
          badgeColor: "light-blue",
        }));
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create News
      .addCase(createNews.fulfilled, (state, action) => {
        // optimistically add or re-fetch
        state.newsFeedArticles.unshift(action.payload);
      })
      // Update News
      .addCase(updateNews.fulfilled, (state, action) => {
        const index = state.newsFeedArticles.findIndex(
          (news) => news.id === action.payload.id,
        );
        if (index !== -1) {
          state.newsFeedArticles[index] = action.payload;
        }
      })
      // Delete News
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.newsFeedArticles = state.newsFeedArticles.filter(
          (news) => news.id !== action.payload,
        );
      })
      // Fetch Detail
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.currNewsDetail = action.payload;
      })

      // -- Updates Reducers --
      // Get Updates
      .addCase(fetchUpdates.pending, (state) => {
        state.updatesStatus = "loading";
      })
      .addCase(fetchUpdates.fulfilled, (state, action) => {
        state.updatesStatus = "succeeded";
        let items = [];
        if (Array.isArray(action.payload)) {
          items = action.payload;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          items = action.payload.data;
        } else if (action.payload && action.payload.updates) {
          items = action.payload.updates;
        }
        state.updatesFeedItems = items.length > 0 ? items : [];
      })
      .addCase(fetchUpdates.rejected, (state, action) => {
        state.updatesStatus = "failed";
        state.updatesError = action.payload;
        // Fallback
        if (state.updatesFeedItems.length === 0) {
          state.updatesFeedItems = state.mockUpdatesFeedItems;
        }
      })
      // Create Update
      .addCase(createUpdate.fulfilled, (state, action) => {
        if (action.payload) {
          state.updatesFeedItems.unshift(action.payload);
          state.updatesFeedItems.unshift(action.payload);
        }
      })
      .addCase(fetchNewsLines.fulfilled, (state, action) => {
        // Assuming API returns array or object with data
        const lines = Array.isArray(action.payload)
          ? action.payload
          : action.payload.newsLines || action.payload.data || [];
        state.newsLines = lines;
      })
      // -- Jobs Reducers --
      .addCase(fetchJobs.pending, (state) => {
        state.jobsStatus = "loading";
        state.jobsError = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobsStatus = "succeeded";
        const jobs = Array.isArray(action.payload)
          ? action.payload
          : action.payload.jobs || [];

        // Clear existing to avoid duplication if re-fetched
        state.govtJobs = [];
        state.privateJobs = [];
        state.internships = [];

        jobs.forEach((job) => {
          const cat = (job.category || "").toLowerCase();
          const type = (job.jobType || "").toLowerCase();
          const title = (job.title || "").toLowerCase();

          if (
            cat.includes("gov") ||
            cat.includes("govt") ||
            title.includes("govt")
          ) {
            state.govtJobs.push(job);
          } else if (
            cat.includes("intern") ||
            type.includes("intern") ||
            title.includes("intern")
          ) {
            state.internships.push(job);
          } else {
            // Default to private if not identified as others
            state.privateJobs.push(job);
          }
        });
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.jobsStatus = "failed";
        state.jobsError = action.payload;
        // Logic to fallback to mock data is handled in component slightly,
        // but let's populate state with mock if we want fallback at redux level:
        if (state.govtJobs.length === 0 && state.privateJobs.length === 0) {
          state.govtJobs = state.mockGovtJobs;
          state.privateJobs = state.mockPrivateJobs;
          state.internships = state.mockInternships;
        }
      })
      .addCase(fetchJobDetail.fulfilled, (state, action) => {
        state.currJobDetail = action.payload;
      });
  },
});

export const {
  addNews,
  addJob,
  addEvent,
  addUpdate,
  setNewsPage,
  setNewsLoading,
  setJobsPage,
  setJobsLoading,
} = newsSlice.actions;
export default newsSlice.reducer;
