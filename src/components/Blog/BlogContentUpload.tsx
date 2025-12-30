import * as React from "react"
import { Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link } from "react-router-dom"
import BlogPreviewDialog from "./BlogPreviewDialog"
import { useState } from "react"

interface BlogSection {
  id: string
  heading: string
  image: string | null
  description: string
}

interface Settings {
  comments: string
  contents: string
  suggestedBlogs: string
  showAuthor: string
}

const INITIAL_SECTIONS: BlogSection[] = [
  { id: "1", heading: "Introduction", image: null, description: "" },
]

const INITIAL_SETTINGS: Settings = {
  comments: "enable",
  contents: "enable",
  suggestedBlogs: "enable",
  showAuthor: "enable",
}

export default function BlogContentUpload() {
  const [authorName, setAuthorName] = useState("")
  const [blogCategory, setBlogCategory] = useState("")
  const [blogTitle, setBlogTitle] = useState("")
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [sections, setSections] = useState<BlogSection[]>(INITIAL_SECTIONS)
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS)
  const [previewOpen, setPreviewOpen] = useState(false)


  const addSection = () => {
    const newId = (sections.length + 1).toString()
    setSections([...sections, { id: newId, heading: "", image: null, description: "" }])
  }

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== id))
    }
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(URL.createObjectURL(file))
    }
    e.target.value = ''
  }

  const handleSectionImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSections(sections.map((s) => (s.id === id ? { ...s, image: url } : s)))
    }
    e.target.value = ''
  }

  const handleSectionHeadingChange = (id: string, value: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, heading: value } : s)))
  }

  const handleSectionDescriptionChange = (id: string, value: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, description: value } : s)))
  }

  const handleSettingChange = (settingKey: keyof Settings, value: string) => {
    setSettings({ ...settings, [settingKey]: value })
  }

  const handleReset = () => {
    setAuthorName("")
    setBlogCategory("")
    setBlogTitle("")
    setThumbnail(null)
    setSections(INITIAL_SECTIONS)
    setSettings(INITIAL_SETTINGS)
  }

  const handlePreview = () => {
    alert(
      `Blog Preview:\n\n` +
      `Author: ${authorName || "Not set"}\n` +
      `Category: ${blogCategory || "Not set"}\n` +
      `Title: ${blogTitle || "Not set"}\n` +
      `Thumbnail: ${thumbnail ? "Uploaded" : "Not uploaded"}\n` +
      `Sections: ${sections.length}\n` +
      `Settings: ${JSON.stringify(settings, null, 2)}`
    )
  }

  return (
    <main className="min-h-screen px-1  mx-auto font-sans text-gray-900">
      <div className="flex justify-end mb-2">
        <Link to="/website/blog-page"><button className="text-[#FF4D4D] text-sm font-medium  cursor-pointer underline">View All Blogs</button></Link>
      </div>

      <div className="space-y-2 rounded-md border p-2 px-4 shadow-md">
        {/* Blog Profile Section */}
        <section className="space-y-4">
          <h2 className=" text-sm text-[#FF4D4D] font-semibold uppercase tracking-wider">Blog Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#4F4F4F] ">
                Author Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                placeholder="Enter Auther Name" 
                className="bg-white border-gray-200 w-[20vw]"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
          </div>

          <div className=" flex gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#4F4F4F]">
                Blog Category <span className="text-red-500">*</span>
              </Label>
              <Select value={blogCategory} onValueChange={setBlogCategory}>
                <SelectTrigger className="bg-white border-gray-200 w-[20vw]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plastic-surgery">Plastic Surgery</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="general-healthcare">General Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#4F4F4F]">
                Blog Title <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Enter Your Blog Title"
                className="bg-white border-gray-200 w-[53vw]"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-[#4F4F4F]">
              Upload Blog Thumbnail <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-start gap-6">
              <div className="w-[180px] h-[110px] border-2 border-dashed border-destructive rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
                {thumbnail ? (
                  <img src={thumbnail || "/placeholder.svg"} alt="Thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-300">
                    <Upload className="w-8 h-8 opacity-20" />
                  </div>
                )}
              </div>
              <div className="space-y-2 mt-2">
                <div className="relative">
                  <input
                    type="file"
                    id="thumbnail-upload"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                  />
                  <div className="">
                    <h2 className="font-semibold mt-3 text-[#4F4F4F]">Upload Blog Thumbnail <span className="text-red-500">*</span></h2>
                    <Button
                    asChild
                    size="sm"
                      className="bg-[#152259] rounded-full text-white hover:bg-[#334155] gap-2 h-9 px-4 mt-2"
                  >
                    <label htmlFor="thumbnail-upload" className="cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <Upload className="w-3 h-3 text-primary" />
                      </div>
                      Upload
                    </label>
                  </Button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">(1035 × 650 px) Webp/JPEG/JPG/PNG</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Details Section */}
        <section className="space-y-2">
          <h2 className=" text-sm  text-[#FF4D4D] font-semibold uppercase tracking-wider">Blog Details</h2>

          {sections.map((section, index) => (
            <div key={section.id} className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Section {index + 1}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-destructive border-destructive/20 hover:bg-destructive/5 bg-transparent"
                    onClick={() => removeSection(section.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-black text-white hover:bg-gray-800"
                    onClick={addSection}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#4F4F4F]">
                  Heading <span className="text-destructive">*</span>
                </Label>
                <Input 
                  value={section.heading} 
                  onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                  className="bg-white border-gray-200" 
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-[#4F4F4F]">
                  Upload Blog Image <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-start gap-6">
                  <div className="w-[180px] h-[100px] border-2 border-dashed border-destructive rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    {section.image ? (
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt="Section Image"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-300">
                        <Upload className="w-8 h-8 opacity-20" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="relative">
                      <input
                        type="file"
                        id={`section-upload-${section.id}`}
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleSectionImageUpload(section.id, e)}
                      />
                      <div>
                        <h2 className="font-semibold mt-1 text-[#4F4F4F]">Upload Blog Image <span className="text-red-500">*</span></h2> 
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#152259] rounded-full text-white hover:bg-[#334155] gap-2 h-9 px-4 mt-1"
                      >
                        <label htmlFor={`section-upload-${section.id}`} className="cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <Upload className="w-3 h-3 text-primary" />
                          </div>
                          Upload
                        </label>
                      </Button>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">(1035 × 450 px) Webp/JPEG/JPG/PNG</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#4F4F4F]">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  placeholder="Enter content..."
                  value={section.description}
                  onChange={(e) => handleSectionDescriptionChange(section.id, e.target.value)}
                  className="min-h-[120px] bg-white border-gray-200 resize-none leading-relaxed"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Basic Settings Section */}
        <section className="space-y-6 pt-4">
          <h2 className=" text-sm font-semibold uppercase tracking-wider text-[#FF4D4D]">Basic Settings</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
            <SettingToggle 
              label="Comments" 
              value={settings.comments}
              onValueChange={(value) => handleSettingChange("comments", value)}
            />
            <SettingToggle 
              label="Contents" 
              value={settings.contents}
              onValueChange={(value) => handleSettingChange("contents", value)}
            />
            <SettingToggle 
              label="Suggested Blogs" 
              value={settings.suggestedBlogs}
              onValueChange={(value) => handleSettingChange("suggestedBlogs", value)}
            />
            <SettingToggle 
              label="Show Author" 
              value={settings.showAuthor}
              onValueChange={(value) => handleSettingChange("showAuthor", value)}
            />
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 pb-2">
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
  className="border-gray-300 text-[#4F4F4F] font-medium px-8 h-11 hover:bg-gray-50 bg-transparent"
>
  Preview Blog
</Button>

          <Button className="hover:bg-accent/90 text-white font-medium px-4  h-11 bg-[#0360D9]">Publish Blog</Button>
        </div>
      </div>
      <BlogPreviewDialog
  open={previewOpen}
  onOpenChange={setPreviewOpen}
  authorName={authorName}
  blogCategory={blogCategory}
  blogTitle={blogTitle}
  thumbnail={thumbnail}
  sections={sections}
  settings={settings}
/>

    </main>
  )
}

function SettingToggle({ 
  label, 
  value, 
  onValueChange 
}: { 
  label: string
  value: string
  onValueChange: (value: string) => void
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-700">
        {label} <span className="text-destructive">*</span>
      </Label>
      <RadioGroup value={value} onValueChange={onValueChange} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="enable" 
            id={`${id}-enable`} 
            className="border-gray-300 data-[state=checked]:border-blue-500 [&[data-state=checked]>div>svg]:fill-blue-500" 
          />
          <Label htmlFor={`${id}-enable`} className="text-sm text-gray-600 font-normal cursor-pointer">
            Enable
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="disable" 
            id={`${id}-disable`} 
            className=" data-[state=checked]:border-blue-500 [&[data-state=checked]>div>svg]:fill-blue-500" 
          />
          <Label htmlFor={`${id}-disable`} className="text-sm text-gray-600 font-normal cursor-pointer">
            Disable
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
