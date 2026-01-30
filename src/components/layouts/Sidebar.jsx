import SidebarItem from './SidebarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faUsers,
  faUsersCog,
  faReply,
  faBoxOpen,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';



const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const sidebarItems = [
    { href: '/admin/home', label: 'Dashboard', icon: faChartPie },
    { href: '/admin/user-roles', label: 'User Roles', icon: faUsersCog },
    { href: '/admin/user-management', label: 'User Management', icon: faUsers },
    { href: '/admin/customers', label: 'Customers', icon: faUsers },
    { href: '/admin/auto-response', label: 'Auto Response', icon: faReply },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: faBoxOpen },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-14' : 'w-64'
      } h-full bg-black/5 transition-all duration-300 ease-in-out relative`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-2.5 top-0 w-6 h-6 flex justify-center items-center hover:bg-gray-300 rounded-full transition cursor-pointer focus:outline-none bg-gray-200"
      >
        {isCollapsed ? (
          <FontAwesomeIcon icon={faArrowRight} />
        ) : (
          <FontAwesomeIcon icon={faArrowLeft} />
        )}
      </button>

      {/* Sidebar Navigation */}
      <nav className="mt-4">
        <ul>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              isCollapsed={isCollapsed}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
