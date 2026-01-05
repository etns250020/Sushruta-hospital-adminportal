import { useEffect, useState } from "react"
import { X, Bold, Italic, Link as LinkIcon, Image as ImageIcon, MapPin, Smile, Type, Paperclip, Eye, Heart } from "lucide-react"
import { Link } from "react-router-dom"

interface Comment {
  id: number
  author: string
  text: string
  date: string
}

export function AdDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "John Doe", text: "This is a great article about healthcare technology!", date: "2026-01-05" }
  ])
  const [newComment, setNewComment] = useState("")

  const storageKey = "ad-dialog-closed-healthcare"

  useEffect(() => {
    // Check if user has closed this ad in current session
    const hasClosedAd = sessionStorage.getItem(storageKey)

    if (!hasClosedAd) {
      // Show dialog after a brief delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    // Store in session storage that user closed the ad
    sessionStorage.setItem(storageKey, "true")
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
        className="fixed scrollbar-hide left-1/2 top-1/2 z-50 w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200 "
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

          {/* Content Grid */}
          <div className="overflow-y-auto overscroll-contain flex-1 bg-white">
            <div className="grid grid-cols-[1fr_320px] gap-0">
              {/* Left column - Main content */}
              <div className="p-8 space-y-10">
                <p className="text-[10px] text-gray-400 font-medium">Published 05 August 2025</p>

                {/* Hero Section */}
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-[1.15]">
                    The Future of Healthcare: How Technology is Transforming Patient Care
                  </h1>
                  <img
                    src="/images/carePatient.png"
                    alt="Healthcare professional with patient"
                    className="w-full h-[300px] rounded-xl object-fill"
                  />
                </div>

                {/* Table of Contents */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Table Of Contents</h3>
                  <ul className="space-y-2 list-decimal pl-5">
                    <li className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                      Introduction
                    </li>
                    <li className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                      Role of Technology in Modern Healthcare
                    </li>
                  </ul>
                </div>

                {/* Section 1: Introduction */}
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
                  <img
                    src="/images/technologyHealth.png"
                    alt="Healthcare technology"
                    className="w-full h-[300px] rounded-xl object-cover"
                  />
                  <div className="text-[15px] text-gray-600 leading-relaxed">
                    <p>
                      Healthcare today is evolving faster than ever. From robotics in surgery to artificial intelligence
                      assisting doctors with accurate diagnosis, patients are experiencing safer, faster, and more
                      effective treatments.
                    </p>
                    <p className="mt-4">
                      At Sushruta Hospital, we are proud to be at the forefront of adopting advanced medical
                      technologies that improve lives.
                    </p>
                  </div>
                </div>

                {/* Section 2: Role of Technology */}
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-900">2. Role of Technology in Modern Healthcare</h2>
                  <img
                    src="/images/health.png"
                    alt="Modern healthcare technology"
                    className="w-full h-[300px] rounded-xl object-cover"
                  />
                  <div className="text-[15px] text-gray-600 leading-relaxed">
                    <p>
                      Technology is no longer an add-on to healthcare—it's at the core of it. With 3D imaging, precision
                      instruments, and digital records, we ensure patient safety, accurate results, and seamless
                      communication between specialists.
                    </p>
                  </div>
                </div>

                {/* Suggested Case Studies */}
                <div className="space-y-6 bg-gray-50 -mx-8 px-8 py-10">
                  <h3 className="text-2xl font-bold text-gray-900">Suggested Case Studies</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <img
                          src={`images/patientCare.png`}
                          alt="Case study"
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3 space-y-2">
                          <p className="text-[10px] text-gray-500 font-medium uppercase">Monday, 05 September 2023 | By Author</p>
                          <a href="https://sushrutahospital.org/case-studies" target="_blank">
                            <h4 className="text-xs font-bold text-blue-600 line-clamp-1">emergency-trauma-care-bhubaneswar-1</h4>
                          </a>
                          <p className="text-[11px] text-gray-600 line-clamp-2 leading-snug">
                            A 32-year-old male patient was brought to Sushruta Hospital after a severe road...
                          </p>
                          <div className="flex items-center gap-3 pt-1 border-t">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Eye className="w-3 h-3" /> 1K
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Heart className="w-3 h-3 text-red-400" /> 16
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-red-500 pb-1">Comments</h3>
                    <span className="bg-[#FF4D4D] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {String(comments.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Comment Input */}
                  <div className="relative border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add Comment...."
                      className="w-full min-h-[120px] p-4 text-sm focus:outline-none resize-none"
                    />
                    
                    {/* Toolbar */}
                    <div className="flex items-center px-4 py-3 border-t bg-gray-50 justify-between">
                      <div className="flex items-center gap-4 text-gray-400">
                        <button className="hover:text-blue-600 transition-colors"><Bold className="w-4 h-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><Italic className="w-4 h-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><LinkIcon className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-gray-200 mx-1" />
                        <button className="hover:text-blue-600 transition-colors"><ImageIcon className="w-4 h-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><MapPin className="w-4 h-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><Smile className="w-4 h-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><Type className="w-4 h-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><Paperclip className="w-4 h-4" /></button>
                      </div>
                      <button 
                        onClick={handleSubmitComment}
                        className="rounded-full bg-[#0EA5E9] px-8 py-2 text-sm font-bold text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Sidebar */}
              <div className="bg-gradient-to-b from-[#B6D6F2] via-[#E8F2FB] to-white p-4 flex flex-col items-center text-center space-y-8 sticky top-0 h-[550px] border-gray-500 mt-2 rounded-md">
                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-blue-900 leading-[1.2]">Get An Appointment Now..</h3>
                  <p className="text-sm text-gray-600 font-medium px-4">
                    Welcome to Sushruta Hospital - Your Compassionate Partner for Emergency Trauma Care in Bhubaneswar
                  </p>

                  <div className="space-y-2 pt-2 flex flex-col ">
                    <a href="https://sushrutahospital.org/contact " target="_blank"
  rel="noopener noreferrer">
                     <button className="w-full rounded-full bg-white px-8 py-3.5 text-sm font-bold text-gray-800 shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95">
                      Book Appointment Now
                    </button>
                    </a>
                    <a href="https://sushrutahospital.org/services/plastic-cosmetic-surgery" target="_blank"
  rel="noopener noreferrer">
                    <button className="w-full rounded-full bg-white px-8 py-3.5 text-sm font-bold text-gray-800 shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95">
                      Explore Our Services
                    </button>
                    </a>
                  </div>
                  <div className="mt-auto w-full">
                  <img
                    src="images/user.png"
                    alt="Healthcare professional"
                    className="w-full h-auto object-contain drop-shadow-2xl mb-2"
                  />
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
