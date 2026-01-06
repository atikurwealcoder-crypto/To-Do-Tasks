
import MinWidthField from "./components/MinWidthField";
import RepeatField from "./components/RepeatField";
import RotateField from "./components/RotateField";
import SliderField from "./components/SliderField";

function App() {
  return (
    <div className="mt-10 max-w-7xl mx-auto bg-[#27272A]">
      <SliderField/>
      <RepeatField />
      <RotateField />
      <MinWidthField/>
    </div>
  );
}

export default App;
