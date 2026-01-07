import MethodSelectField from "./components/MethodSelectField";
import NumberField from "./components/NumberField";
import RepeatField from "./components/RepeatField";
import RotationField from "./components/RotationField";
import SliderField from "./components/SliderField";

function App() {
  return (
    <div className="mt-10 max-w-7xl mx-auto bg-[#27272A]">
      <SliderField />
      <RepeatField />
      <RotationField />
      <NumberField/>
      <MethodSelectField />
    </div>
  );
}

export default App;
