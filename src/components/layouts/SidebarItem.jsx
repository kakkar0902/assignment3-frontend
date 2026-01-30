import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarItem = ({ href, label, isCollapsed, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className="group">
      <Link
        to={href}
        className={`flex items-center py-2.5 px-4 hover:bg-white transition ${
          isActive ? 'bg-white border-y-2 border-black-500' : ''
        }`}
      >
        <FontAwesomeIcon icon={icon} />
        <span
          className={`text-black text-base font-medium leading-tight ml-4 text-nowrap ${
            isCollapsed ? 'hidden' : 'block'
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

export default SidebarItem