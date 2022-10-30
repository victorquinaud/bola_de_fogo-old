import { GameProvider } from "../store/GameProvider";
import Content from '../components/layout/Content';

const App = () => {

  return (
    <GameProvider>
      <div className={`App
        bg-gradient-to-r from-sky-600 to-sky-800 text-black
        min-h-screen max-h-full flex justify-center items-center py-10 font-mono
      `} >
        <Content />
      </div>
    </GameProvider>
  );
};

export default App;