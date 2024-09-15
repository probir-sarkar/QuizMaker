import {Link, redirect, useLoaderData} from 'react-router-dom'
import './App.css'
import { Models } from 'appwrite'
import { Button } from '@nextui-org/react';
import { account } from './lib/appwrite';
import QuizForm from './componets/Quiz/QuizForm';

function App() {
  const data = useLoaderData() as Models.User<Models.Preferences>;
  async function logout() {
    try {
      await account.deleteSession("");
      redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main>
      <h1>{data.email}</h1>
      <Button onClick={logout} >Logout</Button>
      <QuizForm />
    </main>
  )
}

export default App
