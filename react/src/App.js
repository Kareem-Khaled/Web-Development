import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import Person from './components/Person';
import ParentInputRef from './components/ParentInputRef';
import HookCounter from './components/HookCounter';
import MouseContainer from './components/MouseContainer';
function App() {
  return (
    <div className="App">
      <MouseContainer />
      {/* <HookCounter /> */}
      {/* <ParentInputRef /> */}
      {/* <Person />
      <Counter /> */}
    </div>
  );
}

export default App;
