import { useEffect, useState } from "react"
import { X, Bold, Italic, Link as LinkIcon, Image as ImageIcon, MapPin, Smile, Type, Paperclip, Eye, Heart, Play } from "lucide-react"

interface Comment {
  id: number
  author: string
  text: string
  date: string
}

export function AddDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "John Doe", text: "Truly life-saving work at Sushruta!", date: "2026-01-05" }
  ])
  const [newComment, setNewComment] = useState("")

  const storageKey = "casestudy-add-dialog-closed"

  useEffect(() => {
    // Show dialog after a brief delay for better UX
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    const comment: Comment = {
      id: Date.now(),
      author: "You",
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    }
    setComments([...comments, comment])
    setNewComment("")
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="fixed scrollbar-hide left-1/2 top-1/2 z-50 w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200 "
        style={{ maxWidth: "1200px" }}
      >
        <div
          className="relative mx-auto rounded-lg bg-white shadow-2xl overflow-hidden flex flex-col h-[90vh]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#38419D] px-5 py-3.5 text-white shrink-0">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
              <h3 id="dialog-title" className="text-sm font-semibold tracking-wide">
                Move In Checklists
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="rounded p-1 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content Container */}
          <div className="overflow-y-auto overscroll-contain flex-1 bg-white p-8 space-y-12">
            
            {/* Section 1: Hero-style Intro */}
            <div className="grid grid-cols-[1fr_300px] gap-8 items-start">
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-[#1F2937] leading-[1.25]">
                  Emergency Trauma Care in Bhubaneswar: Your Trusted Lifeline in Critical Moments
                </h1>
                <p className="text-xs text-blue-600 font-medium italic">
                  Welcome to Sushruta Hospital - Your Compassionate Partner for Emergency Trauma Care in Bhubaneswar
                </p>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  In the face of critical emergencies, swift and expert care can make all the difference. At Sushruta Hospital, our dedicated Emergency Trauma Care unit in Bhubaneswar is designed to deliver immediate and specialized attention to individuals grappling with severe injuries. With a focus on rapid response and comprehensive services, we stand at the forefront of emergency trauma care, ensuring that each moment counts in providing life-saving interventions.
                </p>
                <div className="space-y-2">
                  {['Immediate and Expert Response', 'Comprehensive Emergency Trauma Services', 'Collaborative Care Approach', 'State-of-the-Art Facilities'].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-[13px] font-semibold text-blue-600">
                      <div className="w-2 h-2 rounded-full bg-blue-500" /> {point}
                    </div>
                  ))}
                </div>
              </div>
              <img 
                src="/images/technologyHealth.png" 
                alt="Case visuals" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Section 2: Video Layout */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1F2937]">
                Emergency Trauma Care in Bhubaneswar: Your Trusted Lifeline in Critical Moments
              </h2>
              <div className="grid grid-cols-[400px_1fr] gap-8 items-center">
                <div className="relative group rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/carePatient.png" 
                    alt="Video thumbnail" 
                    className="w-full h-64 object-cover" 
                  />
                  {/* <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div> */}
                </div>
                <div className="space-y-4">
                  <p className="text-xs text-blue-600 font-medium italic">
                    Welcome to Sushruta Hospital - Your Compassionate Partner for Emergency Trauma Care in Bhubaneswar
                  </p>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    In the face of critical emergencies, swift and expert care can make all the difference. At Sushruta Hospital, our dedicated Emergency Trauma Care unit in Bhubaneswar is designed to deliver immediate and specialized attention to individuals grappling with severe injuries. With a focus on rapid response and comprehensive services, we stand at the forefront of emergency trauma care, ensuring that each moment counts in providing life-saving interventions.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Final Text Block */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1F2937]">
                Emergency Trauma Care in Bhubaneswar: Your Trusted Lifeline in Critical Moments
              </h2>
              <p className="text-xs text-blue-600 font-medium italic">
                Welcome to Sushruta Hospital - Your Compassionate Partner for Emergency Trauma Care in Bhubaneswar
              </p>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                In the face of critical emergencies, swift and expert care can make all the difference. At Sushruta Hospital, our dedicated Emergency Trauma Care unit in Bhubaneswar is designed to deliver immediate and specialized attention to individuals grappling with severe injuries. With a focus on rapid response and comprehensive services, we stand at the forefront of emergency trauma care, ensuring that each moment counts in providing life-saving interventions.
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Suggested Case Studies Grid */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Suggested Case Studies</h3>
              <div className="grid grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-6 bg-gray-50/50 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                    <img
                      src={`images/patientCare.png`}
                      alt="Suggested"
                      className="w-40 h-32 rounded-xl object-cover shadow-sm"
                    />
                    <div className="flex-1 space-y-2">
                      <a href="https://sushrutahospital.org/case-studies" target="_blank">
                        <h4 className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer line-clamp-2 leading-snug uppercase">
                        emergency-trauma-care-bhubaneswar-1
                      </h4>
                      </a>
                      <p className="text-[11px] text-gray-600 line-clamp-3 leading-snug">
                        A 32-year-old male patient was brought to Sushruta Hospital after a severe road...
                      </p>
                      <a href="https://sushrutahospital.org/case-studies" target="_blank">
                        <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                        Read More <X className="w-3 h-3 rotate-45" />
                      </button>
                      </a>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          <Eye className="w-3 h-3" /> 8k
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          <Heart className="w-3 h-3 text-red-400" /> 8
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6 pt-10 border-t">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-[#1F2937]">Comments</h3>
                <span className="bg-[#FF4D4D] text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                  {String(comments.length).padStart(2, '0')}
                </span>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                      <span className="text-[11px] text-gray-400 font-medium">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="relative border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add Comment...."
                  className="w-full min-h-[140px] p-5 text-sm focus:outline-none resize-none placeholder:text-gray-400"
                />
                
                <div className="flex items-center px-5 py-4 border-t bg-gray-50/50 justify-between">
                  <div className="flex items-center gap-5 text-gray-400">
                    <button className="hover:text-blue-600 transition-colors"><Bold className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600 transition-colors"><Italic className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600 transition-colors"><LinkIcon className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-200" />
                    <button className="hover:text-blue-600 transition-colors"><ImageIcon className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600 transition-colors"><MapPin className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600 transition-colors"><Smile className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600 transition-colors"><Type className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600 transition-colors"><Paperclip className="w-4 h-4" /></button>
                  </div>
                  <button 
                    onClick={handleSubmitComment}
                    className="rounded-full bg-[#0EA5E9] px-10 py-2.5 text-sm font-bold text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
