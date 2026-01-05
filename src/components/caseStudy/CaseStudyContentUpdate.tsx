import * as React from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AddDialog } from "../ui/CaseStudyAddDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useState } from "react";
import CaseStudyPreviewDialog from "./CaseStudyPreviewDialog";
import { toast } from "sonner";
interface CaseSection {
  id: string;
  orientation: boolean;
  heading: string;
  mediaType: "photo" | "video";
  mediaEnabled: boolean;
  image: string | null;
  description: string;
}

const INITIAL_SECTIONS: CaseSection[] = [
  {
    id: "1",
    orientation: true,
    heading: "",
    mediaType: "photo",
    mediaEnabled: true,
    image: null,
    description: "",
  },
];

export default function CaseStudyContentUpdate() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<CaseSection[]>(INITIAL_SECTIONS);
  const [suggestedCaseStudies, setSuggestedCaseStudies] = useState("enable");
  const [previewOpen, setPreviewOpen] = useState(false);

  const addSection = () => {
    const newId = Date.now().toString();
    setSections([
      ...sections,
      {
        id: newId,
        orientation: true,
        heading: "",
        mediaType: "photo",
        mediaEnabled: true,
        image: null,
        description: "",
      },
    ]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== id));
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const handleSectionImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSections(
        sections.map((s) => (s.id === id ? { ...s, image: url } : s))
      );
    }
    e.target.value = "";
  };

  const handleReset = () => {
    setCategory("");
    setTitle("");
    setThumbnail(null);
    setDescription("");
    setSections(INITIAL_SECTIONS);
    setSuggestedCaseStudies("enable");
  };

  const handlePreview = () => {
    alert(
      `Case Study Preview:\n\n` +
        `Category: ${category || "Not set"}\n` +
        `Title: ${title || "Not set"}\n` +
        `Thumbnail: ${thumbnail ? "Uploaded" : "Not uploaded"}\n` +
        `Description: ${description || "Not set"}\n` +
        `Sections: ${sections.length}\n` +
        `Suggested Case Studies: ${suggestedCaseStudies}\n\n` +
        `Sections Details:\n` +
        sections
          .map(
            (s, i) =>
              `  Section ${i + 1}:\n` +
              `    Heading: ${s.heading || "Not set"}\n` +
              `    Orientation: ${s.orientation ? "Left" : "Right"}\n` +
              `    Media Type: ${s.mediaType}\n` +
              `    Media Enabled: ${s.mediaEnabled ? "Yes" : "No"}\n` +
              `    Image: ${s.image ? "Uploaded" : "Not uploaded"}\n` +
              `    Description: ${s.description || "Not set"}`
          )
          .join("\n\n")
    );
  };

  const updateSection = (id: string, updates: Partial<CaseSection>) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const bhogPublish = () => {
     toast.success("Publishing Case Study...");
  };

  return (
    <>
      <div className="w-full flex justify-end mb-2">
        <AddDialog />
        <Link to="/website/case-studies">
          <button className="text-[#ef4444] text-sm font-medium hover:underline underline cursor-pointer">
            View All Case Studies
          </button>
        </Link>
      </div>
      <main className="space-y-4 rounded-md border p-2 px-4 shadow-md">
        <div className="space-y-8">
          {/* Case Study Profile */}
          <section className="space-y-4">
            <h2 className="text-[#FF4D4D] text-xs font-bold uppercase tracking-wider">
              Case Study Profile
            </h2>

            <div className="flex gap-6">
              <div className="space-y-2">
                <Label className="text-[#4F4F4F] font-semibold text-sm">
                  Case Study Category <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-gray-200 w-[20vw]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plastic-surgery">
                      Plastic Surgery
                    </SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-[#4F4F4F] font-semibold text-sm">
                  Case Study Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                  className="bg-white border-gray-200 w-[53vw]"
                />
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-[120px] h-[120px] border-2 border-dashed border-[#FF4D4D] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                {thumbnail ? (
                  <img
                    src={thumbnail || "/placeholder.svg"}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-[#4F4F4F] opacity-20" />
                )}
              </div>
              <div className="space-y-3 mt-5">
                <Label className="text-[#4F4F4F] font-semibold text-sm block">
                  Upload Thumbnail <span className="text-red-500">*</span>
                </Label>
                <Button
                  asChild
                  size="sm"
                  className="bg-[#152259] rounded-full text-white hover:bg-[#152259]/90 h-10 px-6 gap-2"
                >
                  <label className="cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Upload className="w-3 h-3 text-[#152259]" />
                    </div>
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                    />
                  </label>
                </Button>
                <p className="text-[10px] text-[#4F4F4F]">
                  (760 × 510 px) Webp/JPEG/JPG/PNG
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#4F4F4F] font-semibold text-sm">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] border-gray-200 resize-none"
              />
            </div>
          </section>

          {/* Case Study Details */}
          <section className="space-y-2">
            <h2 className="text-[#FF4D4D] text-xs font-bold uppercase tracking-wider">
              Case Study Details
            </h2>

            {sections.map((section, index) => (
              <div key={section.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#4F4F4F]">
                    Section {index + 1}
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#4F4F4F]">
                        Switch Orientation
                      </span>
                      <Switch
                        checked={section.orientation}
                        onCheckedChange={(val) =>
                          updateSection(section.id, { orientation: val })
                        }
                        className="data-[state=checked]:bg-[#00D17F]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeSection(section.id)}
                        className="h-9 w-9 border-[#FF4D4D]/20 text-[#FF4D4D] hover:bg-[#FF4D4D]/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={addSection}
                        size="icon"
                        className="h-9 w-9 bg-black hover:bg-black/90 text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#4F4F4F] font-semibold text-sm">
                    Heading <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={section.heading}
                    onChange={(e) =>
                      updateSection(section.id, { heading: e.target.value })
                    }
                    className="border-gray-200"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#4F4F4F] font-semibold text-sm">
                      Chose Photo/Video <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={section.mediaType}
                      onValueChange={(val: "photo" | "video") =>
                        updateSection(section.id, { mediaType: val })
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="photo"
                          id={`photo-${section.id}`}
                          className="data-[state=checked]:border-blue-500 [&[data-state=checked]>div>svg]:fill-blue-500"
                        />
                        <Label
                          htmlFor={`photo-${section.id}`}
                          className="cursor-pointer"
                        >
                          Photo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="video"
                          id={`video-${section.id}`}
                          className="data-[state=checked]:border-blue-500 [&[data-state=checked]>div>svg]:fill-blue-500"
                        />
                        <Label
                          htmlFor={`video-${section.id}`}
                          className="cursor-pointer"
                        >
                          Video
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <span className="text-sm text-[#4F4F4F] font-medium">
                      Enable/Disable Media
                    </span>
                    <Switch
                      checked={section.mediaEnabled}
                      onCheckedChange={(val) =>
                        updateSection(section.id, { mediaEnabled: val })
                      }
                      className="data-[state=checked]:bg-[#00D17F]"
                    />
                  </div>

                  <div
                    className={`flex items-start gap-6 transition-opacity ${
                      !section.mediaEnabled
                        ? "opacity-40 pointer-events-none"
                        : ""
                    }`}
                  >
                    <div className="w-[120px] h-[120px] border-2 border-dashed border-[#FF4D4D] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                      {section.image ? (
                        <img
                          src={section.image || "/placeholder.svg"}
                          alt="Section"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="w-6 h-6 text-[#4F4F4F] opacity-20" />
                      )}
                    </div>
                    <div className="space-y-2 mt-8">
                      <Label className="text-[#4F4F4F] font-semibold text-sm block">
                        Upload{" "}
                        {section.mediaType === "photo" ? "Photo" : "Video"}{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#152259] rounded-full text-white hover:bg-[#152259]/90 h-9 px-5 gap-2"
                      >
                        <label className="cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <Upload className="w-3 h-3 text-[#152259]" />
                          </div>
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            accept={
                              section.mediaType === "photo"
                                ? "image/*"
                                : "video/*"
                            }
                            onChange={(e) =>
                              handleSectionImageUpload(section.id, e)
                            }
                          />
                        </label>
                      </Button>
                      <p className="text-[10px] text-[#4F4F4F]">
                        (1035 × 450 px) Webp/JPEG/JPG/PNG
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#4F4F4F] font-semibold text-sm">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={section.description}
                    onChange={(e) =>
                      updateSection(section.id, { description: e.target.value })
                    }
                    className="min-h-[120px] border-gray-200 resize-none"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Basic Settings */}
          <section className="space-y-2">
            <h2 className="text-[#FF4D4D] text-xs font-bold uppercase tracking-wider">
              Basic Settings
            </h2>
            <div className="space-y-3">
              <Label className="text-[#4F4F4F] font-semibold text-sm">
                Suggested Case Studies <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={suggestedCaseStudies}
                onValueChange={setSuggestedCaseStudies}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="enable"
                    id="suggested-enable"
                    className="data-[state=checked]:border-blue-500 [&[data-state=checked]>div>svg]:fill-blue-500"
                  />
                  <Label htmlFor="suggested-enable" className="cursor-pointer">
                    Enable
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="disable"
                    id="suggested-disable"
                    className="data-[state=checked]:border-blue-500 [&[data-state=checked]>div>svg]:fill-blue-500"
                  />
                  <Label htmlFor="suggested-disable" className="cursor-pointer">
                    Disable
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-4  pb-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-gray-300 text-[#4F4F4F] font-medium px-8 h-11 hover:bg-gray-50 bg-transparent"
            >
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() => setPreviewOpen(true)}
              className="border-gray-300 text-[#4F4F4F] font-medium px-4 h-11 hover:bg-gray-50 bg-transparent"
            >
              Preview Case Study
            </Button>

            <Button className="h-11 px-4 bg-[#0360D9]  text-white font-medium" onClick={bhogPublish}>
              Publish CaseStudy
            </Button>
          </div>
        </div>
      </main>

      <CaseStudyPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        category={category}
        title={title}
        thumbnail={thumbnail}
        description={description}
        sections={sections}
        suggestedCaseStudies={suggestedCaseStudies}
      />
    </>
  );
}
