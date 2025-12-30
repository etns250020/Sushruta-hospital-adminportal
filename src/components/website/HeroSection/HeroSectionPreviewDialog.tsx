import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  
  interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    device: string
    title: string
    heroImages: string[]
    primaryImage: string | null
  }
  
  export default function HeroSectionPreviewDialog({
    open,
    onOpenChange,
    device,
    title,
    heroImages,
    primaryImage,
  }: Props) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[40vw] max-h-[85vh] overflow-y-auto overflow-x-hidden scrollbar-hide pl-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#152259]">
              Hero Section Preview
            </DialogTitle>
          </DialogHeader>
  
          {/* PROFILE */}
          <div className="space-y-4 pb-4">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Hero Profile
            </h3>
  
            <p>
              <b>Device:</b> {device}
            </p>
  
            <p className="text-sm text-gray-700 w-[35vw] break-words whitespace-pre-wrap overflow-hidden">
              <b>Title:</b> {title || "—"}
            </p>
          </div>
  
          {/* HERO IMAGES */}
          <div className="space-y-4 w-[35vw]">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Hero Images
            </h3>
  
            <div className="flex gap-4">
              {heroImages.length > 0 ? (
                heroImages.map(
                  (img, index) =>
                    img && (
                      <img
                        key={index}
                        src={img}
                        alt={`Hero ${index + 1}`}
                        className="w-32 h-24 rounded-md border object-cover"
                      />
                    )
                )
              ) : (
                <p className="text-gray-400 text-sm">No hero images uploaded</p>
              )}
            </div>
          </div>
  
          {/* PRIMARY IMAGE */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Primary Image
            </h3>
  
            {primaryImage ? (
              <img
                src={primaryImage}
                alt="Primary Hero"
                className="w-40 h-52 rounded-md border object-cover"
              />
            ) : (
              <p className="text-gray-400 text-sm">No primary image uploaded</p>
            )}
          </div>
  
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  