import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedCategory } from '../../state/slices/homepageSlice';
import { fetchNews } from '../../state/slices/newsSlice';
import ContentSection from './ContentSection';
import './MainContentArea.css';
import SidebarContent from './SidebarContent';

  const MainContentArea = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, newsItems, publicInfo, events, results, sports, foods, history, famousstay, offers } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleCardClick = (item, category) => {
    dispatch(setSelectedCategory(category));

    navigate(`/hub/${category}/${item.id}`);
  };

  const sectionConfig = [
    {
      title: 'Jobs',
      subtitle: '1,248 openings',
      items: jobs,
      category: 'jobs',
    },
    {
      title: 'News',
      subtitle: 'Local + National',
      items: newsItems,
      category: 'news',
    },
    {
      title: 'Public Info',
      subtitle: null,
      items: publicInfo,
      category: 'public-info',
    },
    {
      title: 'Events',
      subtitle: "What's On",
      items: events,
      category: 'events',
    },
    {
      title: 'Results',
      subtitle: 'Exams & Merit',
      items: results,
      category: 'results',
    },
    {
      title: 'Sports',
      subtitle: 'Live & Highlights',
      items: sports,
      category: 'sports',
    },
    {
      title: 'Famous Foods',
      subtitle: 'Taste of Nellore',
      items: foods,
      category: 'foods',
      emptyMessage: 'No food listings available at the moment.',
    },
    {
      title: 'Nellore History',
      subtitle: 'Know your city',
      items: history,
      category: 'history',
      emptyMessage: 'No history listings available at the moment.',
    },
    {
      title: 'Famous Stay',
      subtitle: 'Top Rated',
      items: famousstay,
      category: 'famous-stay',
      emptyMessage: 'No stay listings available at the moment.',
    },
    {
      title: 'Offers',
      subtitle: 'Deals Around You',
      items: offers,
      category: 'offers',
      emptyMessage: 'No offers available at the moment.',
    },
  ];

  return (
    <div className="main-content-area">
      <div className="container-fluid">
        <div className="row">
          
          <div className="col-lg-8">
            <div className="content-sections">
              {sectionConfig.map((section) => (
                <ContentSection
                  key={section.category}
                  title={section.title}
                  subtitle={section.subtitle}
                  items={section.items}
                  emptyMessage={section.emptyMessage}
                  onCardClick={(item) => handleCardClick(item, section.category)}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <SidebarContent includeAds={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentArea;

