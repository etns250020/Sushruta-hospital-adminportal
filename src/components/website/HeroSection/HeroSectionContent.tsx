import React from "react";
import { Upload, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import HeroSectionPreviewDialog from "./HeroSectionPreviewDialog";
const DEFAULT_TITLE = "Rebuilding Lives Restoring Confidence";
const INITIAL_HERO_IMAGES: string[] = [];
const INITIAL_PRIMARY_IMAGE = null;

function HeroSectionContent() {
  const [device, setDevice] = React.useState("desktop");
  const [title, setTitle] = React.useState(DEFAULT_TITLE);
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const [heroImages, setHeroImages] =
    React.useState<string[]>(INITIAL_HERO_IMAGES);
  const [primaryImage, setPrimaryImage] = React.useState<string | null>(
    INITIAL_PRIMARY_IMAGE
  );
  const heroUploadRef = React.useRef<HTMLInputElement>(null);
  const primaryUploadRef = React.useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setTitle(DEFAULT_TITLE);
    setHeroImages(INITIAL_HERO_IMAGES);
    setPrimaryImage(INITIAL_PRIMARY_IMAGE);
    setDevice("desktop");
  };

  const handlePreview = () => {
    alert(
      `Previewing: \nTitle: ${title}\nImages: ${
        heroImages.length
      }\nPrimary Image: ${primaryImage ? "Set" : "Not set"}`
    );
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setHeroImages((prev) => {
        // Ensure we have 3 slots
        const updated = [...prev];
        while (updated.length < 3) {
          updated.push("");
        }

        // Process each new image
        for (const newImage of newImages) {
          // Find the rightmost empty slot
          let rightmostEmptyIndex = -1;
          for (let j = 2; j >= 0; j--) {
            if (!updated[j] || updated[j] === "") {
              rightmostEmptyIndex = j;
              break;
            }
          }

          if (rightmostEmptyIndex !== -1) {
            // Fill the rightmost empty slot
            updated[rightmostEmptyIndex] = newImage;
          } else {
            // All slots filled, shift left and add new to rightmost (index 2)
            updated[0] = updated[1];
            updated[1] = updated[2];
            updated[2] = newImage;
          }
        }

        return updated.slice(0, 3);
      });
      // Reset input to allow re-uploading same file
      e.target.value = "";
    }
  };

  const handlePrimaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrimaryImage(URL.createObjectURL(file));
    }
    // Reset input to allow re-uploading same file
    e.target.value = "";
  };
  return (
    <div className="space-y-3 h-full">
      <div className="flex items-center justify-between">
        <RadioGroup
          defaultValue="desktop"
          className="flex  p-1 rounded-full gap-2"
          onValueChange={setDevice}
        >
          <div className="flex items-center">
            <RadioGroupItem value="desktop" id="desktop" className="sr-only" />
            <Label
              htmlFor="desktop"
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors bg-transparent text-sm font-medium",
                device === "desktop"
                  ? "bg-[#ef4444] text-white"
                  : "text-gray-500 border border-gray-300"
              )}
            >
              <Monitor className="w-4 h-4" />
              Desktop
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="mobile" id="mobile" className="sr-only" />
            <Label
              htmlFor="mobile"
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors text-sm font-medium",
                device === "mobile"
                  ? "bg-[#ef4444] text-white"
                  : "text-gray-500 border border-gray-300"
              )}
            >
              <Smartphone className="w-4 h-4" />
              Mobile
            </Label>
          </div>
        </RadioGroup>

       <Link to="/website/hero-section">
       <button className="text-[#ef4444] text-sm font-medium hover:underline underline cursor-pointer">
          View Hero Section Updates
        </button>
       </Link>
      </div>

      <div className="space-y-4 rounded-md border p-2 px-4 shadow-md">
        <div className="space-y-2 ">
          <h3 className="text-[#FF4D4D] text-md font-medium">
            Hero section details
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="hero-title" className="text-sm font-medium text-[#4F4F4F]">
                Hero Section Title <span className="text-red-500">*</span>
              </Label>
              <span className="text-xs text-gray-400 italic">
                Max 40 characters
              </span>
            </div>
            <Input
              id="hero-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={40}
              className="w-full  border-gray-200 focus-visible:ring-[#2563eb] focus-visible:border-0"
            />
          </div>
        </div>

        {device === "desktop" && (
          <div className="space-y-4 px-1">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#474747]">
                Upload Hero images (Max 3){" "}
                <span className="text-red-500">*</span>
              </Label>

              <div className="flex gap-4">
                {[0, 1, 2].map((index) => {
                  const hasImage =
                    heroImages[index] && heroImages[index] !== "";
                  return (
                    <div
                      key={index}
                      className={cn(
                        "relative w-42 h-30 rounded-md overflow-hidden border-2",
                        hasImage
                          ? "border-solid border-gray-200"
                          : "border-dashed border-red-400"
                      )}
                    >
                      {hasImage ? (
                        <img
                          src={heroImages[index]}
                          alt={`Hero ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs">
                          Empty
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  ref={heroUploadRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleHeroUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#152259] rounded-full text-white hover:bg-[#334155] gap-2 h-9 px-4"
                  onClick={() => heroUploadRef.current?.click()}
                >
                  <span className="h-6 w-6 flex justify-center items-center rounded-full bg-white">
              <Upload className="w-4 h-4  rounded-full text-[#121201]" />
              </span>
                  Upload
                </Button>
                <span className="text-[10px] text-gray-400">
                  (315 x 210 px) Webp/JPEG/JPG/PNG
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-1.5 ">
          <Label className="text-sm font-medium text-[#474747]">
            Upload primary Hero image (Max 1){" "}
            <span className="text-red-500">*</span>
          </Label>

          <div
            className={cn(
              "relative w-32 h-40 rounded-md overflow-hidden border-2",
              primaryImage
                ? "border-solid border-gray-200"
                : "border-dashed border-red-400 bg-gray-50"
            )}
          >
            {primaryImage ? (
              <img
                src={primaryImage}
                alt="Primary Hero"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                Primary
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-0 ">
            <input
              ref={primaryUploadRef}
              type="file"
              accept="image/*"
              onChange={handlePrimaryUpload}
              className="hidden"
            />
            <Button
              type="button"
              size="sm"
              className="bg-[#152259] rounded-full text-white hover:bg-[#334155] gap-2 h-9 px-4"
              onClick={() => primaryUploadRef.current?.click()}
            >
              <span className="h-6 w-6 flex justify-center items-center rounded-full bg-white">
              <Upload className="w-4 h-4  rounded-full text-[#121201]" />
              </span>
              Upload
            </Button>
            <span className="text-[10px] text-gray-400">
              (800 x 885 px) PNG
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t mb-2">
        <Button
          onClick={handleReset}
          variant="outline"
          className="px-8 border-gray-300 bg-transparent"
        >
          Reset
        </Button>
        <Button
  onClick={() => setPreviewOpen(true)}
  variant="outline"
  className="px-8 border-gray-300 bg-transparent"
>
  Preview Page
</Button>

        <Button className="px-8 bg-[#0360D9] hover:bg-[#0052b1] text-white">
          Update
        </Button>
      </div>
      <HeroSectionPreviewDialog
  open={previewOpen}
  onOpenChange={setPreviewOpen}
  device={device}
  title={title}
  heroImages={heroImages}
  primaryImage={primaryImage}
/>

    </div>
  );
}

export default HeroSectionContent;
