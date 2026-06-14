import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="bg-indigo-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <Wallet className="h-6 w-6" />
                        <span className="font-bold text-xl tracking-tight">ExpenseTracker</span>
                    </div>
                    {isAuthenticated && (
                        <button 
                            onClick={logout}
                            className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium transition"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;