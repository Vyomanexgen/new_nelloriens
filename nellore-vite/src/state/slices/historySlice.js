import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../services/config';

// Thunks
export const fetchHistory = createAsyncThunk('history/fetchHistory', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/history-getHistory`, {
            method: 'GET', // Typically GET for fetching, but double check if POST is required. Requirement said GET.
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch history');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchHistorySectionDetail = createAsyncThunk('history/fetchHistorySectionDetail', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/history-getHistorySection?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch history section detail');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createHistorySection = createAsyncThunk('history/createHistorySection', async (newSection, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/history-createHistorySection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSection)
        });
        if (!response.ok) throw new Error('Failed to create history section');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateHistorySection = createAsyncThunk('history/updateHistorySection', async (sectionData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/history-updateHistorySection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sectionData)
        });
        if (!response.ok) throw new Error('Failed to update history section');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteHistorySection = createAsyncThunk('history/deleteHistorySection', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/history-deleteHistorySection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (!response.ok) throw new Error('Failed to delete history section');
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    timelineData: [], // Will be populated by API
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    currentSectionDetail: null,

    // Mock data for fallback
    mockTimelineData: [
        {
            id: 1,
            title: "EarlyMentions",
            description: "EarlyMentionsDesc",
            tags: ["Pre 6th c.", "Etymology"],
            image: "image yet to do",
            fullContent: "The history of Nellore begins in antiquity. Known as 'Vikrama Simhapuri' in ancient texts, the region has been a significant settlement since the Mauryan era. \n\n The name 'Nellore' is thought to be derived from 'Nelli' (Amla tree) and 'Ooru' (Village/Town). Archaeological findings suggest a thriving community with early trade links. It was a crucial part of the Dandakaranya forest mentioned in the Ramayana.",
        },
        {
            id: 2,
            title: "PallavaInfluence",
            description: "PallavaInfluenceDesc",
            tags: ["6th–9th c.", "Dynasty"],
            image: "image yet to do",
            fullContent: "From the 6th to the 9th century, Nellore flourished under the Pallava dynasty. This period saw the construction of several rock-cut temples and the expansion of agriculture through tank irrigation. \n\n The Pallavas established Nellore as a strategic northern outpost. The architectural style of this era laid the foundation for the Dravidian style that would evolve in later centuries.",
        },
        {
            id: 3,
            title: "CholaLinks",
            description: "CholaLinksDesc",
            tags: ["10th–12th c.", "Trade"],
            image: "image yet to do",
            fullContent: "The Cholas brought a golden age of administration and trade to Nellore. The region became a vital hub connecting the southern peninsula with northern kingdoms. \n\n Under rulers like Rajaraja Chola I, the Ranganatha Swamy Temple saw significant developments. Maritime trade flourished, with merchants from Nellore trading spices and textiles across the Bay of Bengal.",
        },
        {
            id: 4,
            title: "Vijayanagara",
            description: "VijayanagaraDesc",
            tags: ["14th–18th c.", "Polity"],
            image: "image yet to do",
            fullContent: "As part of the mighty Vijayanagara Empire, Nellore enjoyed stability and prosperity. The Udayagiri Fort was a key military stronghold during this period. \n\n The Rayas of Vijayanagara patronized arts and literature. Telugu literature, in particular, saw a renaissance. The region's strategic importance meant it was often the site of battles for control of the Andhra coast.",
        },
        {
            id: 5,
            title: "ColonialAdmin",
            description: "ColonialAdminDesc",
            tags: ["19th–20th c.", "Modernization"],
            image: "image yet to do",
            fullContent: "Under British rule, Nellore was constituted as a district in 1861. The colonial era brought distinct administrative shifts, railways, and western education. \n\n However, it was also a period of resistance. Nellore played a spirited role in the freedom struggle, with leaders like Potti Sreeramulu emerging from this soil. The district was known for its 'Satyagraha' movements.",
        },
        {
            id: 6,
            title: "PostIndep",
            description: "PostIndepDesc",
            tags: ["Since 1947", "Development"],
            image: "image yet to do",
            fullContent: "After Independence, Nellore became a part of the Madras State and later, the first district of the newly formed Andhra State in 1953. \n\n Today, it is a bustling hub of agriculture (known as the Rice Bowl of Andhra), aquaculture, and space research, home to the Satish Dhawan Space Centre at Sriharikota. It blends its rich cultural heritage with modern industrial growth.",
        },
    ],
    landmarks: [
        {
            icon: "bi-building",
            title: "NarasimhaSwamyTemple",
            desc: "NarasimhaSwamyDesc",
            tag: "Temple",
        },
        {
            icon: "bi-bricks",
            title: "HistoricFortRemains",
            desc: "FortDesc",
            tag: "Fort",
        },
        {
            icon: "bi-water",
            title: "PennaRiverGhats",
            desc: "RiverDesc",
            tag: "River",
        },
        {
            icon: "bi-bank",
            title: "MuseumArchives",
            desc: "MuseumDesc",
            tag: "Archive",
        },
    ]
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch History
            .addCase(fetchHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Handle if response is array or object wrapped
                let items = [];
                if (Array.isArray(action.payload)) {
                    items = action.payload;
                } else if (action.payload && Array.isArray(action.payload.data)) {
                    items = action.payload.data;
                }

                state.timelineData = items.map(item => ({
                    ...item,
                    id: item.id || `hist-${Math.random()}`,
                    // Ensure default image if missing
                    image: item.image || "image yet to do",
                    tags: item.tags || []
                }));
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                // Fallback to mock data
                if (state.timelineData.length === 0) {
                    state.timelineData = state.mockTimelineData;
                }
            })
            // Detail
            .addCase(fetchHistorySectionDetail.fulfilled, (state, action) => {
                state.currentSectionDetail = action.payload;
            })
            // Create
            .addCase(createHistorySection.fulfilled, (state, action) => {
                if (action.payload) {
                    state.timelineData.push(action.payload);
                }
            })
            // Update
            .addCase(updateHistorySection.fulfilled, (state, action) => {
                const updated = action.payload;
                if (updated && updated.id) {
                    const index = state.timelineData.findIndex(item => item.id === updated.id);
                    if (index !== -1) {
                        state.timelineData[index] = updated;
                    }
                }
            })
            // Delete
            .addCase(deleteHistorySection.fulfilled, (state, action) => {
                state.timelineData = state.timelineData.filter(item => item.id !== action.payload);
            });
    }
});

export default historySlice.reducer;
