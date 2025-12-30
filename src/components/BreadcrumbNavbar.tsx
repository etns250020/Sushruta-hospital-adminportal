import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import { useLocation, Link } from "react-router-dom";

function getBreadcrumbSegments(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  let url = "";
  return segments.map((seg, idx) => {
    url += `/${seg}`;
    return {
      name: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      url: url,
      isLast: idx === segments.length - 1,
    };
  });
}

export default function BreadcrumbNavbar() {
  const location = useLocation();
  const segments = getBreadcrumbSegments(location.pathname);
  if (segments.length === 0) return null;
  return (
    <div className="bg-background/80 border-b px-4 py-2 sticky top-12 z-30">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((seg) => (
            <>
              <BreadcrumbSeparator key={`sep-${seg.url}`}/>
              <BreadcrumbItem key={seg.url}>
                {seg.isLast ? (
                  <span>{seg.name}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={seg.url}>{seg.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

