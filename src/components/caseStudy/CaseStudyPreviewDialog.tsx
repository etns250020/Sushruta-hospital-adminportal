import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  
  interface CaseSection {
    id: string
    orientation: boolean
    heading: string
    mediaType: "photo" | "video"
    mediaEnabled: boolean
    image: string | null
    description: string
  }
  
  interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    category: string
    title: string
    thumbnail: string | null
    description: string
    sections: CaseSection[]
    suggestedCaseStudies: string
  }
  
  export default function CaseStudyPreviewDialog({
    open,
    onOpenChange,
    category,
    title,
    thumbnail,
    description,
    sections,
    suggestedCaseStudies,
  }: Props) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[40vw] max-h-[85vh] overflow-y-auto pl-4 overflow-x-hidden scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#152259]">
              Case Study Preview
            </DialogTitle>
          </DialogHeader>
  
          {/* PROFILE */}
          <div className="space-y-4  pb-4">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Case Study Profile
            </h3>
  
            <p><b>Category:</b> {category || "—"}</p>
            <p className="text-sm text-gray-700 w-[35vw] break-words whitespace-pre-wrap overflow-hidden"><b>Title:</b> {title || "—"}</p>
  
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-63 rounded-md border"
              />
            )}
  
            <p className="text-sm text-gray-700 w-[35vw] break-words whitespace-pre-wrap overflow-hidden">
              {description || "No description provided"}
            </p>
          </div>
  
          {/* SECTIONS */}
          <div className="space-y-4 w-[35vw]">
            <h3 className="text-xs font-bold  text-[#FF4D4D] uppercase">
              Case Study Details
            </h3>
  
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-lg border p-4 space-y-2"
              >
                <h4 className="font-semibold">
                  Section {index + 1}
                </h4>
  
                <p><b>Heading:</b> {section.heading || "—"}</p>
                <p><b>Orientation:</b> {section.orientation ? "Left" : "Right"}</p>
                <p><b>Media Type:</b> {section.mediaType}</p>
                <p><b>Media Enabled:</b> {section.mediaEnabled ? "Yes" : "No"}</p>
  
                {section.image && (
                  <img
                    src={section.image}
                    alt="Section Media"
                    className="w-63 max-w-md rounded-md border"
                  />
                )}
  
                <p className="text-sm text-gray-700 w-[35vw] break-words whitespace-pre-wrap overflow-hidden">
                  {section.description || "No description provided"}
                </p>
              </div>
            ))}
          </div>
  
          {/* SETTINGS */}
          <div className="border-t pt-4">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Basic Settings
            </h3>
            <p>
              Suggested Case Studies:{" "}
              <b>{suggestedCaseStudies === "enable" ? "Enabled" : "Disabled"}</b>
            </p>
          </div>
  
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  