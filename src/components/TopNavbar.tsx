

export default function TopNavbar() {

  return (
    <nav className="w-full sticky top-0 z-40 bg-[#E1EEFF] border-b">
      <div className="flex items-center justify-end py-[12.5px] px-4 ">

        {/* RIGHT: User Info */}
        <div className="flex items-center gap-3">
          <img
            src="/images/user.png" 
            alt="User"
            className="h-10.5 w-10.6 rounded-full border"
          />
          <div className=" leading-tight">
            <p className="text-md font-medium text-black">
              Tarun
            </p>
            <p className="text-sm text-muted-foreground">
              tarunkavi@gmail.com
            </p>
          </div>
        </div>

      </div>
    </nav>
  )
}
