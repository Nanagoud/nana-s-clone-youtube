import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react";

export default function BreadCrumbs() {
    const pathName = usePathname();
    // /docs/DOGpYFhAloFefyGpW6sW
    const segMents = pathName.split("/");
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    segMents.map((segment, index) => {
                        if (index === 0) return null;
                        const href = `/${segMents.slice(1, index + 1).join("/")}`
                        const isLast = index === segMents.length - 1
                        return (
                          <Fragment key={segment}>
                            <BreadcrumbSeparator />
                              <BreadcrumbItem key={index}>
                                {isLast ? (
                                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                                ) : (
                                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                          </Fragment>
                            
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
