import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicModal from "./DynamicModal";

const DraftAnimationModal = ({ children }) => {
  return (
    <DynamicModal title="Draft Animation" subtitle="Your draft animation list">
      {/* 👇 Dynamic content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span className="text-sm text-white">Select All</span>
        </div>

        {drafts.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-1 py-1.5 rounded-md hover:bg-[#3F3F46]"
          >
            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm text-white">{item.title}</span>
            </div>
            <span className="text-xs text-[#A1A1AA]">{item.date}</span>
          </div>
        ))}
      </div>
    </DynamicModal>
  );
};

export default DraftAnimationModal;
