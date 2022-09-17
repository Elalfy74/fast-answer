import { useAuth } from '../contexts/AuthContext';
import { addAnswer, addQuestion, addTag } from '../utils/scripts';

function ScriptsPlayground() {
  const { signup } = useAuth();

  let i = 0;

  // Add Users
  // addUser(signup, i);

  // Add Tags
  addTag(i);

  // Add Questions
  addQuestion(i);

  // Add Answers
  addAnswer(i);

  setInterval(() => {
    // Here is the code that will be executed every second
    i++;
  }, 1000);

  return <div>DummyScript</div>;
}

export default ScriptsPlayground;
