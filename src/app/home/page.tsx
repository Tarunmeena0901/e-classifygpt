"use client"
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { classifyEmails } from '@/utils/gpt-classifier';
import { CATEGORIZED_EMAILS, EMAIL } from '../type';
import { UserCard } from '../components/userCard';
import { EmailContainer } from '../components/emailContainer';

export default function Home() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<EMAIL[]>([]);
  const [categorizedEmails, setCategorizedEmails] = useState<CATEGORIZED_EMAILS>()
  const [loading, setLoading] = useState<boolean>(true);
  const [filterValue, setFilterValue] = useState<number>(50);

  const filteredEmails: EMAIL[] = emails.slice(0, filterValue);

  const handleClassification = async (filteredEmails: EMAIL[]) => {
    const classificationResult = await classifyEmails(filteredEmails);
    setCategorizedEmails(classificationResult);
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("/api/emails");

        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await response.json();
        const emails: EMAIL[] = data.emailDetails || [];
        setEmails(emails);
        // const categorizedEmails = await classifyEmails(emails);

      } catch (error) {
        console.error('Error fetching and classifying emails:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, []);

  if (!session) {
    return (
      <div className=' h-screen flex justify-center mt-10 p-10'>
        <div className="border-2 bg-slate-300 h-[30vh] w-[70vh] flex flex-col justify-center items-center gap-4 rounded">
          <div className='font-spaceMono text-white'>
            please login using your google account
          </div>
          <div>
            <button className='bg-white p-2 rounded font-semibold border-2 border-slate-100' onClick={() => signIn('google')}>Sign in with Google</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=' h-screen flex flex-col items-center m-3 bg-white gap-5'>
        <UserCard session={session}/>
      <div className='flex justify-between w-[100vh]'>
        <div className='flex items-center gap-2'>
          <h4 className='font-semibold'>Filter :</h4>
          <input
            className=' text-center bg-black rounded text-white w-[10vh] border-2 border-slate-300'
            type='number'
            placeholder='filter'
            step="1"
            max="50"
            min="1"
            value={filterValue}
            onChange={(e) => {
              const value = e.target.value;
              setFilterValue(parseInt(value, 10));
            }}
          />
        
        </div>
        <div>
          <button
            className="bg-gradient-to-r from-slate-500 to-slate-800 text-white font-semibold mt-2 h-[5vh] w-[15vh] rounded hover:border-black hover:scale-105 transition ease-in-out"
            onClick={() => handleClassification(filteredEmails)}
          >
            Classify
          </button>
        </div>
      </div>
      <div>
        <EmailContainer categorizedEmails={categorizedEmails} filteredEmails={filteredEmails} loading={loading}/>
      </div>
    </div>
  );
}


// if (!session) {
//   return (
//     <div>
//       <h1>You are not signed in</h1>
//       <button onClick={() => signIn('google')}>Sign in with Google</button>
//     </div>
//   );
// }

// if (loading) {
//   return <div>Loading...</div>;
// }


{/* <h1>Welcome, {session?.user?.name}</h1>
<input
  type='number'
  placeholder='filter'
  step="1"
  value={filterValue}
  onChange={(e) => {
    const value = e.target.value;
    setFilterValue(value ? parseInt(value, 10) : 50);
  }}
/>
<button onClick={() => signOut()}>Sign out</button>
<h2><b>Your Important Emails:</b></h2>
<ul>
  {categorizedEmails ? categorizedEmails.important.map((email, id) => (
    <li key={id}>{email.subject}</li>
  )) :
    filteredEmails.map((email, id) => (
      <li key={id}>{email.subject}</li>
    ))}
</ul>
<h2><b>Your General Emails: </b></h2>
<ul>
  {categorizedEmails ? categorizedEmails.general.map((email, id) => (
    <li key={id}>{email.subject}</li>
  )) :
    filteredEmails.map((email, id) => (
      <li key={id}>{email.subject}</li>
    ))}
</ul> */}