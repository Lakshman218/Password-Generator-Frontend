import React, { useEffect, useState } from 'react';
import { getAllPassword, deletePassword } from '../../services/user/apiMethod'; // Make sure to implement deletePassword in your API methods
import { useSelector } from 'react-redux';
import { Copy, Trash } from 'lucide-react'; // Import delete icon from lucide-react or any other icon library
import { toast } from 'sonner';

function SavedPasswords() {
  const selectUser = (state) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await getAllPassword({ userId });
        setPasswords(response.data.passwords); // Assuming response.data contains passwords array
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    };

    fetchPasswords();
  }, [userId]);

  const handleDelete = async (passwordId) => {
    try {
      await deletePassword({ userId, passwordId }); 
      setPasswords(passwords.filter(password => password._id !== passwordId)); 
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password)
    toast.success("Text Copied")
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center gap-8'>
        <div className='flex flex-col lg:w-6/12'>
          <div className="p-4">
            {/* <h2 className="text-xl font-semibold mb-4">Saved Passwords</h2> */}
            {passwords.length === 0 ? (
              <p className='text-center'>No passwords saved.</p>
            ) : (
              <ul className="space-y-4">
                {passwords.map((password) => (
                  <li key={password._id} className="flex items-center justify-between p-4 bg-neutral-200 rounded-lg shadow-md">
                    <div>
                      <p className="font-semibold">{password.title}</p>
                      <p className="text-gray-800">{password.password}</p>
                    </div>
                    <div className='flex justify-center text-center'>
                    <button
                    onClick={() => {handleCopy(password.password)}}
                    ><Copy className='text-blue-800 hover:text-blue-900'/> </button>
                    <button
                      onClick={() => handleDelete(password._id)}
                      className="text-red-600 hover:text-red-800 pl-4"
                    >
                      <Trash size={20} />
                    </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedPasswords;
