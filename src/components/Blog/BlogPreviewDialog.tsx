import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  
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
  
  interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    authorName: string
    blogCategory: string
    blogTitle: string
    thumbnail: string | null
    sections: BlogSection[]
    settings: Settings
  }
  
  export default function BlogPreviewDialog({
    open,
    onOpenChange,
    authorName,
    blogCategory,
    blogTitle,
    thumbnail,
    sections,
    settings,
  }: Props) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className=" w-[40vw] max-h-[85vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#152259]">
              Blog Preview
            </DialogTitle>
          </DialogHeader>
  
          {/* BLOG PROFILE */}
          <div className="space-y-3 border-b pb-4">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Blog Profile
            </h3>
  
            <p><b>Author:</b> {authorName || "—"}</p>
            <p><b>Category:</b> {blogCategory || "—"}</p>
            <p className="text-sm text-gray-700 w-[35vw] break-words whitespace-pre-wrap overflow-hidden"><b>Title:</b> {blogTitle || "—"}</p>
  
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Blog Thumbnail"
                className="w-[260px] rounded-md border mt-2"
              />
            )}
          </div>
  
          {/* BLOG CONTENT */}
          <div className="space-y-6 pt-4 text-sm text-gray-700 w-[35vw] break-words whitespace-pre-wrap overflow-hidden">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Blog Content
            </h3>
  
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-lg border p-4 space-y-2"
              >
                <h4 className="font-semibold text-lg" >
                  {index + 1}. {section.heading || "Untitled Section"}
                </h4>
  
                {section.image && (
                  <img
                    src={section.image}
                    alt="Section"
                    className="w-63 rounded-md border my-2"
                  />
                )}
  
  <p className="text-sm text-gray-700 w-[35vw] break-words whitespace-pre-wrap overflow-hidden">
  {section.description || "No description provided"}
</p>

              </div>
            ))}
          </div>
  
          {/* SETTINGS */}
          <div className="border-t pt-4 space-y-2">
            <h3 className="text-xs font-bold text-[#FF4D4D] uppercase">
              Basic Settings
            </h3>
  
            <ul className="text-sm space-y-1">
              <li>Comments: <b>{settings.comments}</b></li>
              <li>Contents: <b>{settings.contents}</b></li>
              <li>Suggested Blogs: <b>{settings.suggestedBlogs}</b></li>
              <li>Show Author: <b>{settings.showAuthor}</b></li>
            </ul>
          </div>
  
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-4">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  