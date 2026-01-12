import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CancelCircleIcon,
  ComputerIcon,
  LaptopIcon,
  SmartPhone01Icon,
  Tablet02Icon,
} from "@hugeicons/core-free-icons";
import { debounceFn } from "../lib/utils";

// Devices data
const DEVICES = [
  {
    key: "desktop",
    label: "Desktop",
    icon: <HugeiconsIcon icon={ComputerIcon} size={15} />,
  },
  {
    key: "laptop",
    label: "Laptop",
    icon: <HugeiconsIcon icon={LaptopIcon} size={15} />,
  },
  {
    key: "tablet",
    label: "Tablet",
    icon: <HugeiconsIcon icon={Tablet02Icon} size={15} />,
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: <HugeiconsIcon icon={SmartPhone01Icon} size={15} />,
  },
];

const ScrollSmootherSettings = () => {
  const [config, setConfig] = useState({
    enableScrollSmother: true,
    configuration: {
      desktop: { enable: true, value: 1 },
      laptop: { enable: true, value: 1 },
      tablet: { enable: true, value: 1 },
      mobile: { enable: true, value: 1 },
    },
  });
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const [tempValue, setTempValue] = useState(
    config.configuration[selectedDevice].value
  );
  
  // slider min and max value range
  const MIN_VALUE = 0.5;
  const MAX_VALUE = 3;
  
  // derived state
  const isGlobalEnabled = config.enableScrollSmother;
  const deviceConfig = config.configuration[selectedDevice];
  
  console.log(selectedDevice, deviceConfig.value);
  // Smooth Scroll toggle switch handler
  const toggleGlobalSwitch = (value) => {
    setConfig((prev) => ({
      ...prev,
      enableScrollSmother: value,
    }));
  };

  // device toggle switch handler
  const toggleDevice = (value) => {
    setConfig((prev) => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [selectedDevice]: {
          ...prev.configuration[selectedDevice],
          enable: value,
        },
      },
    }));
  };

  // sync temp value when device changes
  useEffect(() => {
    setTempValue(deviceConfig.value);
  }, [selectedDevice, deviceConfig.value]);

  const clampValue = (value) => {
    if (Number.isNaN(value)) return;
    if (value < MIN_VALUE) value = MIN_VALUE;
    if (value > MAX_VALUE) value = MAX_VALUE;
    return value;
  };

  const updateValue = (value) => {
    const updatedValue = clampValue(value);

    setConfig((prev) => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [selectedDevice]: {
          ...prev.configuration[selectedDevice],
          value: updatedValue,
        },
      },
    }));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="w-96.5 h-62.75 rounded-xl bg-[#27272A] p-5 shadow-lg]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Scroll Smoother</h2>
          <Switch
            checked={isGlobalEnabled}
            onCheckedChange={toggleGlobalSwitch}
          />
        </div>

        {isGlobalEnabled && (
          <>
            {/* Device Tabs */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 bg-[#18181B] p-1 rounded-md">
              {DEVICES.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setSelectedDevice(d.key)}
                  className={`rounded-md flex items-center gap-1 p-1.5 text-sm transition ${
                    selectedDevice === d.key
                      ? "bg-[#3F3F46] text-[#FAFAFA]"
                      : "text-[#A1A1AA] hover:bg-[#3F3F46]"
                  }`}
                >
                  <span>{d?.icon}</span>
                  <span>{d?.label}</span>
                </button>
              ))}
            </div>

            {/* Enable Per Device */}
            <div className="mt-4 flex items-center gap-5 text-sm">
              <p>
                Enable on <span className="capitalize">{selectedDevice}</span>
              </p>
              <Switch
                checked={deviceConfig?.enable}
                onCheckedChange={toggleDevice}
              />
            </div>

            {deviceConfig?.enable && (
              <div className="mt-6 space-y-2">
                <p className="text-sm text-[#FAFAFA]">
                  Set the scroll smoother level
                </p>

                <div className="flex items-center gap-3">
                  <Slider
                    value={[tempValue]}
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    step={0.05}
                    onValueChange={(v) => {
                      updateValue(v[0]);
                      setTempValue(v[0]);
                    }}
                    className="flex-1 cursor-pointer"
                  />

                  <Input
                    type="number"
                    placeholder={"Add Value"}
                    step={0.05}
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    value={tempValue}
                    onChange={(e) => {
                      setTempValue(e.target.value);
                    }}
                    onBlur={() => {
                      const num = Number(tempValue);
                      const value = clampValue(num);
                      updateValue(value);
                      setTempValue(value);
                    }}
                    className="w-20 bg-[#3F3F46] text-center"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Footer */}
      <div className="mt-5 flex justify-end">
        <Button
          size="sm"
          className="bg-[#B34A33] w-18.5 h-7.5 flex items-center gap-1 px-3 py-1.5"
        >
          <HugeiconsIcon icon={CancelCircleIcon} />
          Close
        </Button>
      </div>
    </div>
  );
};

export default ScrollSmootherSettings;
