import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Current article data
  currentArticle: {
    id: 1,
    title: 'National Games: State clinches 3 golds in athletics',
    tag: 'Featured',
    posted: '2h ago',
    author: 'By Sports Desk',
    breadcrumbs: ['Home', 'Sports', 'Article'],
    heroImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1200&h=600&fit=crop',
    paragraphs: [
      'The state athletics contingent delivered a stellar performance at the National Games, capturing three gold medals and a silver across sprint, middle-distance, and relay events.',
      "Sprinter Kavya Rao clocked a meet record in the 100m final, while middle-distance runner Arjun secured gold in the 1500m with a decisive final lap. The 4x400m women's relay team sealed the third gold with a composed anchor leg.",
      "Coaches credited structured camps and improved recovery protocols for the surge in performance. Next up is the inter-state meet, where selectors will finalize squads for the Asian circuit.",
    ],
    medalTally: {
      gold: 3,
      silver: 1,
      bronze: 0,
    },
  },

  // Related articles
  relatedArticles: [
    {
      id: 2,
      title: 'District volleyball trials draw record turnout',
      posted: '4h ago',
      tag: 'Local',
      icon: 'bi-newspaper',
    },
    {
      id: 3,
      title: 'School cricket league announces new format',
      posted: 'Yesterday',
      tag: 'Update',
      icon: 'bi-flag',
    },
    {
      id: 4,
      title: 'Nellore runner qualifies for state marathon finals',
      posted: '2d ago',
      tag: 'Athletics',
      icon: 'bi-award',
    },
  ],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
  },
});

export const setCurrentArticle = articlesSlice.actions.setCurrentArticle;

export default articlesSlice.reducer;

