import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoPersonOutline, IoBookOutline, IoDocumentOutline } from "react-icons/io5";
import { BiMenuAltLeft, BiGroup } from "react-icons/bi";
import { FiCheck, FiArrowLeft, FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { FaSearch, FaRegTrashAlt, FaAngleLeft, FaAngleRight, FaHeart, FaRegStar, FaRegClock, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { useThemeContext } from "../context/ThemeContext";

interface Props {
  size: number;
  className?: string; // Use className instead of color
}

export const MangadexIcon = 'https://mangadex.org/img/brand/mangadex-logo.svg';

export const SettingsIcon = ({ size, className }: Props) => {
  return <CiSettings size={size} className={className} />; // Apply className
}

export const AngleDownIcon = ({ size, className }: Props) => {
  return <FaAngleDown size={size} className={className} />; // Apply className
}

export const AngleUpIcon = ({ size, className }: Props) => {
  return <FaAngleUp size={size} className={className} />; // Apply className
}

export const TrashIcon = ({ size, className }: Props) => {
  return <FaRegTrashAlt size={size} className={className} />; // Apply className
}

export const PageIcon = ({ size, className }: Props) => {
  return <IoDocumentOutline size={size} className={className} />; // Apply className
}

export const BookIcon = ({ size, className }: Props) => {
  return <IoBookOutline size={size} className={className} />; // Apply className
}

export const RightArrowIcon = ({ size, className }: Props) => {
  return <IoIosArrowForward size={size} className={className} />; // Apply className
}

export const LeftArrowIcon = ({ size, className }: Props) => {
  return <IoIosArrowBack size={size} className={className} />; // Apply className
}

export const ClockIcon = ({ size, className }: Props) => {
  return <FaRegClock size={size} className={className} />; // Apply className
}

export const StarIcon = ({ size, className }: Props) => {
  return <FaRegStar size={size} className={className} />; // Apply className
}

export const OpenBookIcon = ({ size, className }: Props) => {
  return <FiBookOpen size={size} className={className} />; // Apply className
}

export const HeartIcon = ({ size, className }: Props) => {
  return <FaHeart size={size} className={className} />; // Apply className
}

export const GroupIcon = ({ size, className }: Props) => {
  return <BiGroup size={size} className={className} />; // Apply className
}

export const AngleLeftIcon = ({ size, className }: Props) => {
  return <FaAngleLeft size={size} className={className} />; // Apply className
}

export const AngleRightIcon = ({ size, className }: Props) => {
  return <FaAngleRight size={size} className={className} />; // Apply className
}

export const SearchIcon = ({ size, className }: Props) => {
  return <FaSearch size={size} className={className} />; // Apply className
}

export const CheckIcon = ({ size, className }: Props) => {
  return <FiCheck size={size} className={className} />; // Apply className
}

export const ArrowLeftIcon = ({ size, className }: Props) => {
  return <FiArrowLeft size={size} className={className} />; // Apply className
}

export const ArrowRightIcon = ({ size, className }: Props) => {
  return <FiArrowRight size={size} className={className} />; // Apply className
}

export const CloseIcon = ({ size, className }: Props) => {
  return <IoMdClose size={size} className={className} />; // Apply className
}

export const NavbarMenu = ({ size, className }: Props) => {
  return <BiMenuAltLeft size={size} className={className} />; // Apply className
}

export const ProfileIcon = ({ size, className }: Props) => {
  return <IoPersonOutline size={size} className={className} />; // Apply className
}

export const UpDownAngleIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 my-auto text-midTone" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m8 9l4-4l4 4m0 6l-4 4l-4-4"></path></svg>
  )
}
export const ContentFilterUncheckIcon = () => {
  return (
    <svg data-v-9ba4cb7e="" data-v-e5d18c36="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="feather feather-square icon text-icon-contrast text-undefined" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg>
  )
}

export const ContentFilterCheckIcon = () => {
  const {theme} = useThemeContext();

  return (
    <svg data-v-9ba4cb7e="" data-v-e5d18c36="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon text-icon-contrast text-undefined"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><path stroke={`${theme !== 'dracula' ? 'rgb(255,103,64)' : 'rgb(145,111,173)'}`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 11 3 3L22 4"></path></svg>
  )
}