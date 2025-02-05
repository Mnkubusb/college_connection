import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="flex items-center justify-between p-4 w-full border-t bg-base-300 mt-10 text-base-content">
            <div>
                <p>Copyright © 2025 - All right reserved</p>
            </div>
            <div>
                <a href="https://github.com/Mnkubusb/college_connection"><FaGithub size={20} /> </a>
            </div>
        </footer>
    );
}

export default Footer;