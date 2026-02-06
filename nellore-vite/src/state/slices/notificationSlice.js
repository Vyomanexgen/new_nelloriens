
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

// Async Thunks
export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/notifications-createNotification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationData),
        },
      );
      if (!response.ok) throw new Error("Failed to create notification");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/notifications-getNotifications`,
      ); // Changed to GET as per request
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getNotificationDetail = createAsyncThunk(
  "notifications/getNotificationDetail",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/notifications-getNotificationDetail?id=${notificationId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch notification detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  // Filters
  notificationsFilters: [
    { id: 1, label: "All" },
    { id: 2, label: "General" },
    { id: 3, label: "Exams" },
    { id: 4, label: "Admissions" },
    { id: 5, label: "Updates" },
  ],

  // Status
  status: "idle", // idle, loading, succeeded, failed
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  currNotificationDetail: null,

  // Main notification list
  notificationsList: [],
  // Mock data for fallback
  mockNotificationsList: [
    {
      id: 1,
      title: "AP Board Released New Circular - October 2025",
      category: "General",
      board: "AP",
      session: "2024-25",
      tags: ["Circular", "Published 1h ago", "AP"],
      description:
        "Important notice for school managements regarding academic schedule.",
      actions: ["View", "Download PDF"],
      publishedDate: "2025-10-27",
      fullContent:
        "The Andhra Pradesh State Board of Education has released a new circular regarding the academic schedule for the upcoming months. All schools are mandated to follow the revised timings and holiday list. \n\n Key highlights include the rescheduling of the mid-term exams to the first week of November and the declaration of Dussehra holidays from October 15th. School principals are requested to disseminate this information to parents and students immediately.",
    },
    {
      id: 2,
      title: "Group-IV Exam Notification - Certificate Verification",
      category: "Exams",
      board: "AP",
      session: "2024-25",
      tags: ["Govt Exams", "Today"],
      description: "Candidates shortlisted for CV. Schedule released.",
      actions: ["Open", "PDF"],
      publishedDate: "2025-10-27",
      fullContent:
        "The AP Public Service Commission has released the schedule for the certificate verification process for Group-IV service posts. Candidates who have qualified in the written examination are required to attend the verification on their allotted dates. \n\n Please carry all original certificates along with two sets of photocopies. The verification will take place at the Commission's headquarters in Vijayawada from November 5th to November 10th. Failure to attend will result in disqualification.",
    },
    {
      id: 3,
      title: "NEET Counselling Instructions Updated - Round 2",
      category: "Admissions",
      board: "National",
      session: "2024-25",
      tags: ["Medical", "Updated 30m ago"],
      description: "Revised reporting guidelines for students.",
      actions: ["Instructions", "Allotment"],
      publishedDate: "2025-10-27",
      fullContent:
        "The Medical Counselling Committee (MCC) has updated the instructions for the second round of NEET UG counselling. Students allotted seats in this round must report to their respective colleges by November 2nd. \n\n The updated guidelines clarify the documents required for admission and the fee payment process. Candidates are advised to download their allotment letters from the official portal and proceed with the reporting formalities to secure their seats.",
    },
    {
      id: 4,
      title: "AP Schools Holiday Notification",
      category: "General",
      board: "AP",
      session: "2024-25",
      tags: ["Schools", "Released"],
      description: "Schools closed due to heavy rainfall for two days.",
      actions: ["View Notice"],
      publishedDate: "2025-10-26",
      fullContent:
        "Due to the heavy rainfall forecast by the IMD, the District Collector has declared a holiday for all public and private schools in the Nellore district for the next two days (October 27th and 28th). \n\n This measure is taken to ensure the safety of students and staff. Online classes may be conducted at the discretion of the school management. Please stay indoors and stay safe.",
    },
    {
      id: 5,
      title: "University Academic Calendar Update - Nov 2025",
      category: "Updates",
      board: "AP",
      session: "2024-25",
      tags: ["Universities", "Calendar"],
      description: "Revised timetable for semester exams.",
      actions: ["Download Calendar"],
      publishedDate: "2025-10-25",
      fullContent:
        "The revised academic calendar for state universities has been published. The semester examinations previously scheduled for late October have been pushed to the second week of November to accommodate the missed working days. \n\n Students can download the detailed subject-wise timetable from their respective university websites. Practical exams will commence immediately after the theory exams.",
    },
    {
      id: 6,
      title: "Scholarship Applications (Jagananna Vidya Deevena) Open",
      category: "Admissions",
      board: "AP",
      session: "2024-25",
      tags: ["Scholarship", "Financial Aid"],
      description: "Eligible students can apply via Jnanabhumi portal.",
      actions: ["Apply Now", "Guidelines"],
      publishedDate: "2025-10-24",
      fullContent:
        "The Social Welfare Department has opened the application window for the Jagananna Vidya Deevena (fee reimbursement) scheme for the academic year 2024-25. Students pursuing post-metric courses can apply online. \n\n Ensure your mother's bank account is linked with Aadhaar. The last date to submit applications at the college level is November 15th.",
    },
    {
      id: 7,
      title: "Special Bus Services for Group Exams",
      category: "Updates",
      board: "AP",
      session: "2024-25",
      tags: ["Transport", "Exam Support"],
      description: "APSRTC to run extra buses for candidates.",
      actions: ["View Routes"],
      publishedDate: "2025-10-23",
      fullContent:
        "To facilitate Easy transport for candidates appearing for the upcoming Group-IV and Police recruitment exams, APSRTC will operate special buses on major routes. \n\n Candidates can present their hall tickets to avail concessionary travel on exam days. Check the local depot manager's notice for specific timings.",
    },
    {
      id: 8,
      title: "Caution: Fake Recruitment Sites Alert",
      category: "General",
      board: "Cyber Cell",
      session: "2024-25",
      tags: ["Alert", "Safety"],
      description: "Do not pay money to unauthorized portals.",
      actions: ["Read Advisory"],
      publishedDate: "2025-10-22",
      fullContent:
        "The Police Cyber Cell has issued an advisory warning students about fake websites mimicking official government recruitment portals. \n\n Please verify the URL before making any payments. Official government websites always end in .gov.in or .ap.gov.in. Report any suspicious activity to the helpline 1930.",
    },
    {
      id: 9,
      title: "Intermediate Practical Exam Dates Announced",
      category: "Exams",
      board: "AP",
      session: "2024-25",
      tags: ["BIEAP", "Practicals"],
      description: "Jumbling system to be followed this year.",
      actions: ["View Schedule"],
      publishedDate: "2025-10-21",
      fullContent:
        "The BIEAP has released the schedule for Intermediate Public Practical Examinations. They will be held in four phases starting from February 1st, 2026. \n\n The jumbling system for allocating examination centers will be implemented strictly. Students can download their practical hall tickets one week before the exam.",
    },
    {
      id: 10,
      title: "Free Coaching for UPSC Civils by State Govt",
      category: "Admissions",
      board: "AP",
      session: "2024-25",
      tags: ["Coaching", "UPSC", "Free"],
      description: "Entrance test for free residential coaching.",
      actions: ["Register", "Syllabus"],
      publishedDate: "2025-10-20",
      fullContent:
        "The AP Study Circle is inviting applications for free residential coaching for UPSC Civil Services 2026. Selection will be based on an entrance test to be held on November 20th. \n\n 100 candidates will be selected for the 9-month extensive coaching program with free boarding and lodging.",
    },
    {
      id: 11,
      title: "Science Fair 2025 Registration",
      category: "Updates",
      board: "District",
      session: "2024-25",
      tags: ["Events", "Science", "Schools"],
      description: "District level science fair for high school students.",
      actions: ["Register School"],
      publishedDate: "2025-10-19",
      fullContent:
        "The District Education Officer has announced the dates for the Annual District Science Fair. It will be hosted at ZP High School, Nellore on December 10-12. \n\n Schools can register up to 3 exhibits. The themes for this year are 'Green Energy' and 'Robotics in Agriculture'.",
    },
    {
      id: 12,
      title: "Correction in SSC Student Data",
      category: "General",
      board: "AP",
      session: "2024-25",
      tags: ["SSC", "Data Correction"],
      description: "Last chance to correct name/DOB in records.",
      actions: ["Login Headmaster"],
      publishedDate: "2025-10-18",
      fullContent:
        "Headmasters of all secondary schools are informed to verify the Nominal Rolls of 10th class students for the March 2026 exams. \n\n Any corrections in the candidate's name, parents' names, or date of birth must be updated in the online portal by October 31st. No changes will be entertained later.",
    },
    {
      id: 13,
      title: "Hostel Admission List - BC Welfare",
      category: "Admissions",
      board: "AP",
      session: "2024-25",
      tags: ["Hostel", "Welfare"],
      description: "Selected list for pre-matric hostels.",
      actions: ["Check List"],
      publishedDate: "2025-10-17",
      fullContent:
        "The selection list for admissions into Mahatma Jyotiba Phule BC Welfare Hostels (Pre-Matric) is out. \n\n Guardians of selected students must report to the hostel warden with the Caste and Income certificates to complete the admission process.",
    },
    {
      id: 14,
      title: "Sports Quota Recruitment in Railways",
      category: "Updates",
      board: "Central",
      session: "2024-25",
      tags: ["Job", "Sports", "Railways"],
      description: "Open rally for sports persons in SCR zone.",
      actions: ["Notification"],
      publishedDate: "2025-10-16",
      fullContent:
        "South Central Railway (SCR) has issued a notification for recruitment against the Sports Quota for the year 2024-25. Outstanding sports persons in Athletics, Cricket, and Kabaddi can apply. \n\n The selection trials will be held at railway grounds in Secunderabad next month.",
    },
    {
      id: 15,
      title: "Change in EAPCET Exam Centers",
      category: "Exams",
      board: "AP",
      session: "2025-26",
      tags: ["EAPCET", "Alert"],
      description: "Two centers in Nellore have been changed.",
      actions: ["Check Centers"],
      publishedDate: "2025-10-15",
      fullContent:
        "Candidates appearing for the EAPCET special session are informed that two examination centers in Nellore have been changed due to technical reasons. \n\n Affected candidates have been sent SMS alerts. Please re-download your hall tickets to know the new venue address.",
    },
    {
      id: 16,
      title: "National Means-cum-Merit Scholarship (NMMS)",
      category: "Exams",
      board: "National",
      session: "2024-25",
      tags: ["Scholarship", "8th Class"],
      description: "Hall tickets released for NMMS exam.",
      actions: ["Download"],
      publishedDate: "2025-10-14",
      fullContent:
        "Hall tickets for the National Means-cum-Merit Scholarship (NMMS) examination to be held on November 5th are available for download. \n\n This exam is for 8th-class students from government and aided schools. Qualifying students will receive Rs. 12,000 per annum.",
    },
    {
      id: 17,
      title: "Library Week Celebrations",
      category: "Updates",
      board: "District",
      session: "2024-25",
      tags: ["Events", "Library"],
      description: "Competitions for students at District Library.",
      actions: ["View Brochure"],
      publishedDate: "2025-10-13",
      fullContent:
        "To mark National Library Week, the Nellore District Central Library is organizing essay writing and elocution competitions for school and college students on November 14th. \n\n Prizes will be distributed by the District Collector. Interested students can register at the library counter.",
    },
    {
      id: 18,
      title: "Mega Job Mela in Atmakur",
      category: "Admissions",
      board: "District",
      session: "2024-25",
      tags: ["Job Mela", "Private"],
      description: "20+ companies participating. Walk-in interview.",
      actions: ["Details"],
      publishedDate: "2025-10-12",
      fullContent:
        "AP Skill Development Corporation (APSSDC) is organizing a Mega Job Mela at Govt Polytechnic, Atmakur on October 30th. \n\n Over 20 private companies from Chennai and Sri City are participating to recruit for technical and non-technical roles. 10th, Inter, Degree, and ITI holders are eligible.",
    },
    {
      id: 19,
      title: "Online Classes for Flooded Areas",
      category: "General",
      board: "AP",
      session: "2024-25",
      tags: ["Schools", "Emergency"],
      description: "Instructions for schools in low-lying areas.",
      actions: ["Circular"],
      publishedDate: "2025-10-11",
      fullContent:
        "The Education Department has instructed schools in designated low-lying flood-prone areas to switch to online mode for the next 3 days. \n\n Mid-day meal rations should be distributed to the parents of eligible students at their homes where possible.",
    },
    {
      id: 20,
      title: "Quarterly Exam Marks Upload",
      category: "Exams",
      board: "AP",
      session: "2024-25",
      tags: ["Schools", "Marks"],
      description: "Deadline extended for uploading marks.",
      actions: ["Portal Login"],
      publishedDate: "2025-10-10",
      fullContent:
        "The last date for uploading quarterly examination marks for classes 6-10 has been extended by two days due to server maintenance issues. \n\n Teachers are requested to complete the data entry by midnight of October 29th.",
    },
    {
      id: 21,
      title: "Model School Results 6th Class",
      category: "Admissions",
      board: "AP",
      session: "2025-26",
      tags: ["Model School", "Entrance"],
      description: "Admission (Phase 2) list released.",
      actions: ["Check List"],
      publishedDate: "2025-10-09",
      fullContent:
        "The Phase-2 admission list for 6th Class entry into AP Model Schools is released. Parents of selected children should confirm the seat by submitting certificates at the respective school office before the deadline.",
    },
  ],
  notificationsList: [], // Initial empty, will be populated or fallback used

  // Page details
  notificationsPage: {
    currentPage: 1,
    totalPages: 9,
    isLoading: false,
  },

  // Recently opened (same as recently viewed)
  recentlyOpened: [
    { id: 1, title: "AP Board Released New Circular - October 2025" },
    { id: 2, title: "Group-IV Exam Notification - Certificate Verification" },
    { id: 3, title: "NEET Counselling Instructions Updated - Round 2" },
  ],

  // Important links
  importantNotificationLinks: [
    { id: 1, label: "AP Government Notifications", url: "#" },
    { id: 2, label: "Exam Board Official Portal", url: "#" },
    { id: 3, label: "Medical Counselling Updates", url: "#" },
  ],

  // Tools
  notificationTools: [
    { id: 1, label: "Filter by Date", icon: "bi-calendar-event" },
    { id: 2, label: "Choose Category", icon: "bi-ui-checks-grid" },
    { id: 3, label: "Set Alerts", icon: "bi-bell" },
    { id: 4, label: "Save this filter", icon: "bi-bookmark" },
  ],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsPage: (state, action) => {
      state.notificationsPage.currentPage = action.payload;
    },
    setNotificationsLoading: (state, action) => {
      state.notificationsPage.isLoading = action.payload;
    },
    addToRecentlyOpened: (state, action) => {
      const item = action.payload;

      // Remove if already exists
      state.recentlyOpened = state.recentlyOpened.filter(
        (x) => x.id !== item.id,
      );

      // Add to top
      state.recentlyOpened.unshift({ id: item.id, title: item.title });

      // Keep last 5 only
      state.recentlyOpened = state.recentlyOpened.slice(0, 5);
    },
  },
  extraReducers: (builder) => {
    // Get Notifications
    builder.addCase(getNotifications.pending, (state) => {
      state.status = "loading";
      state.notificationsPage.isLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.notificationsPage.isLoading = false;

      let items = [];
      if (Array.isArray(action.payload)) {
        items = action.payload;
      } else if (action.payload && Array.isArray(action.payload.data)) {
        items = action.payload.data;
      } else if (action.payload && action.payload.notifications) {
        items = action.payload.notifications;
      }

      state.notificationsList = items.length > 0 ? items : [];
    });
    builder.addCase(getNotifications.rejected, (state, action) => {
      state.status = "failed";
      state.notificationsPage.isLoading = false;
      state.error = action.payload;
      // Fallback
      if (state.notificationsList.length === 0) {
        state.notificationsList = state.mockNotificationsList;
      }
    });

    // Create Notification
    builder.addCase(createNotification.fulfilled, (state, action) => {
      if (action.payload) {
        state.notificationsList.unshift(action.payload);
      }
    });

    builder.addCase(getNotificationDetail.fulfilled, (state, action) => {
      state.currNotificationDetail = action.payload;
    });
  },
});

export const {
  setNotificationsPage,
  setNotificationsLoading,
  addToRecentlyOpened,
} = notificationSlice.actions;

export default notificationSlice.reducer;
