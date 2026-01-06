import RepeatField from "./components/repeat-field";
import RotateField from "./components/rotate-field";
import SliderField from "./components/slider-field";

function App() {
  return (
    <div className="mt-10 max-w-7xl mx-auto bg-[#27272A]">
      <SliderField/>
      <RepeatField />
      <RotateField />
    </div>
  );
}

export default App;
