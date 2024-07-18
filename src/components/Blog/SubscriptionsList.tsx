import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Subscriber {
    _id: string;
    email: string;
}

function Page() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllSubscribers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/email');
                console.log("Subscriber : ", response.data.allEmail);
                setSubscribers(response.data.allEmail);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch subscribers:', error);
                alert('Failed to fetch subscribers! Reload the page.');
            }
        };

        getAllSubscribers();
    }, []);

    const deleteSubscriber = async (email: string) => {
        try {
            await axios.delete('/api/email', { data: { email } });
            setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));
        } catch (error) {
            console.error('Failed to delete subscriber:', error);
            alert('Failed to delete subscriber!');
        }
    };

    if (loading) {
        return <div className='text-center'>Loading...</div>;
    }

    return (
        <div className="w-full h-full dark:text-white flex justify-center items-center">
            <div className="max-w-lg w-full">
                <h1 className="text-center font-bold text-5xl mb-8">
                    Subscribers List
                </h1>

                <div className="text-xl">
                    <table className="min-w-full dark:bg-transparent bg-white dark:bg-gray-800 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="px-6 py-3 text-left font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-transparent dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {subscribers.map(subscriber => (
                                <tr key={subscriber._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {subscriber.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-600"
                                            onClick={() => deleteSubscriber(subscriber.email)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Page;
