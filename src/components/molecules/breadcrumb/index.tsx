import React from "react";

import {
  ABreadcrumb,
  ABreadcrumbItem,
  ABreadcrumbLink,
  ABreadcrumbList,
  ABreadcrumbPage,
  ABreadcrumbSeparator,
} from "@/components/atoms/breadcrumb/index";
import { IBreadcrumb } from "@/stores/breadcrumb";

interface MBreadcrumbProps {
  items: IBreadcrumb[];
}

export function MBreadcrumb({ items }: MBreadcrumbProps) {
  return (
    <ABreadcrumb className={items.length ? "p-4" : ""}>
      <ABreadcrumbList>
        {items.length ? (
          items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ABreadcrumbItem key={`item-${index}`}>
                  {items.length - 1 > index ? (
                    <ABreadcrumbLink
                      href={item.href}
                      className="font-medium text-blue-700"
                    >
                      {item.label}
                    </ABreadcrumbLink>
                  ) : (
                    <ABreadcrumbPage>{item.label}</ABreadcrumbPage>
                  )}
                </ABreadcrumbItem>
                {items.length - 1 > index && (
                  <ABreadcrumbSeparator
                    key={`separator-${index}`}
                    className="font-medium"
                  />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <></>
        )}
      </ABreadcrumbList>
    </ABreadcrumb>
  );
}
