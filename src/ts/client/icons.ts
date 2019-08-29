import {
	faCrown,
	faPlug,
	faGamepad,
	faMobile,
	faTablet,
	faTv,
} from '../generated/fa-icons';

export {
	faHashtag,
	faCog,
	faCogs,
	faMinus,
	faPlus,
	faCheck,
	faFlag,
	faStickyNote,
	faCertificate,
	faGlobe,
	faGamepad,
	faDesktop,
	faQuestionCircle,
	faInfo,
	faSync,
	faUserSecret,
	faTrash,
	faLock,
	faApple,
	faEdit,
	faImage,
	faLaughBeam,
	faLanguage,
	faCircle,
	faEyeSlash,
	faEnvelope,
	faFont,
	faCompressArrowsAlt,
	faIdBadge,
	faFilter,
	faEraser,
	faBell,
	faClock,
	faComment,
	faComments,
	faCommentSlash,
	faHdd,
	faMicrochip,
	faUser,
	faUsers,
	faUserFriends,
	faSpinner,
	faBan,
	faMicrophoneSlash,
	faFileAlt,
	faTimes,
	faSearch,
	faClipboard,
	faChevronUp,
	faChevronDown,
	faChevronLeft,
	faChevronRight,
	faStar,
	faAngleDoubleUp,
	faAngleDoubleDown,
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faPlay,
	faRedo,
	faSave,
	faArrowLeft,
	faArrowRight,
	faArrowUp,
	faArrowDown,
	faEyeDropper,
	faPaintBrush,
	faEllipsisV,
	faExclamationCircle,
	faUserPlus,
	faUserMinus,
	faUserTimes,
	faSignOutAlt,
	faStepForward,
	faVolumeOff,
	faVolumeDown,
	faVolumeUp,
	faHome,
	faStop,
	faRetweet,
	faFile,
	faCopy,
	faShare,
	faCode,
	faTerminal,
	faClone,
	faPause,
	faCrosshairs,
	faFileImage,
	faHeart,
	faPlusCircle,
	faMinusCircle,
	faInfoCircle,
	faCaretUp,
	faCaretSquareUp,
	faCaretSquareDown,
	faCheckCircle,
	faWrench,
	faDrawPolygon,
	faUserCog,
	faSlidersH,
	faExchangeAlt,
	faDatabase,
	faHorseHead,
	faMapMarkerAlt,
	faChartPie,
	faCalendar,
} from '../generated/fa-icons';

import {
	faPatreon,
	faDeviantart,
	faTwitter,
	faTumblr,
	faFacebook,
	faGithub,
	faVk,
	faGoogle,
	faChrome,
	faInternetExplorer,
	faEdge,
	faAndroid,
	faFirefox,
	faSafari,
	faOpera,
	faWindows,
	faApple,
	faLinux,
	faAmilia,
	faYandexInternational,
} from '../generated/fa-icons';

export {
	faPatreon,
	faDeviantart,
	faTwitter,
	faTumblr,
	faGithub,
} from '../generated/fa-icons';

export const partyLeaderIcon = faCrown;
export const offlineIcon = faPlug;
export const emptyIcon = {
	prefix: 'fas',
	iconName: 'empty-icon',
	icon: [512, 512, [], 'ffff', ''],
};

export const oauthIcons: { [key: string]: any; } = {
	patreon: faPatreon,
	deviantart: faDeviantart,
	twitter: faTwitter,
	tumblr: faTumblr,
	facebook: faFacebook,
	github: faGithub,
	vkontakte: faVk,
	google: faGoogle,
};

export const uaIcons: { [key: string]: any; } = {
	// browser
	'Chrome': faChrome,
	'Chromium': faChrome,
	'IE': faInternetExplorer,
	'Edge': faEdge,
	'Android Browser': faAndroid,
	'Firefox': faFirefox,
	'Safari': faSafari,
	'Mobile Safari': faSafari,
	'Opera': faOpera,
	'Opera Mini': faOpera,
	'Amigo': faAmilia,
	'YaBrowser': faYandexInternational,
	// os
	'Windows': faWindows,
	'Windows Phone': faWindows,
	'Android': faAndroid,
	'iOS': faApple,
	'Mac OS': faApple,
	'Arch': faLinux,
	'CentOS': faLinux,
	'Fedora': faLinux,
	'FreeBSD': faLinux,
	'OpenBSD': faLinux,
	'Debian': faLinux,
	'Ubuntu': faLinux,
	'Linux': faLinux,
	'Chromium OS': faChrome,
	'Firefox OS': faFirefox,
	'Playstation': faGamepad,
	'Nintendo': faGamepad,
	// device
	'console': faGamepad,
	'mobile': faMobile,
	'tablet': faTablet,
	'smarttv': faTv,
};
