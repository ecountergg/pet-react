import React, { useRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/clsx";
import { type LucideIcon } from "lucide-react";

import { AScrollArea } from "@/components/atoms/scroll-area/index";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import {
  AAccordionTrigger,
  AAccordionContent,
} from "@/components/atoms/accordion";

interface TreeDataItem {
  id: string;
  name: string;
  href: string;
  icon?: LucideIcon;
  color?: string;
  children?: TreeDataItem[];
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem;
  initialSelelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  folderIcon?: LucideIcon;
  itemIcon?: LucideIcon;
};

const ATree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data,
      initialSelelectedItemId,
      onSelectChange,
      expandAll,
      folderIcon,
      itemIcon,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedItemId, setSelectedItemId] = React.useState<
      string | undefined
    >(initialSelelectedItemId);
    const refRoot = useRef<HTMLDivElement>(null);

    const handleSelectChange = React.useCallback(
      (item: TreeDataItem | undefined) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
          onSelectChange(item);
        }
      },
      [onSelectChange]
    );

    const expandedItemIds = React.useMemo(() => {
      if (!initialSelelectedItemId) {
        return [] as string[];
      }

      const ids: string[] = [];

      function walkTreeItems(
        items: TreeDataItem[] | TreeDataItem,
        targetId: string
      ) {
        if (items instanceof Array) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < items.length; i++) {
            ids.push(items[i]!.id);
            if (walkTreeItems(items[i]!, targetId) && !expandAll) {
              return true;
            }
            if (!expandAll) ids.pop();
          }
        } else if (!expandAll && items.id === targetId) {
          return true;
        } else if (items.children) {
          return walkTreeItems(items.children, targetId);
        }
      }

      walkTreeItems(data, initialSelelectedItemId);
      return ids;
    }, [data, initialSelelectedItemId]);

    const { width, height } = useResizeObserver({ ref: refRoot });

    return (
      <div ref={refRoot} className={cn("overflow-hidden", className)}>
        <AScrollArea style={{ width, height }}>
          <div className="relative p-2">
            <TreeItem
              data={data}
              ref={ref}
              selectedItemId={selectedItemId}
              handleSelectChange={handleSelectChange}
              expandedItemIds={expandedItemIds}
              FolderIcon={folderIcon}
              ItemIcon={itemIcon}
              {...props}
            />
          </div>
        </AScrollArea>
      </div>
    );
  }
);

type TreeItemProps = TreeProps & {
  selectedItemId?: string;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  FolderIcon?: LucideIcon;
  ItemIcon?: LucideIcon;
};

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      data,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      FolderIcon,
      ItemIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} role="tree" className={className} {...props}>
        <ul>
          {data instanceof Array ? (
            data.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <AccordionPrimitive.Root
                    type="multiple"
                    defaultValue={expandedItemIds}
                  >
                    <AccordionPrimitive.Item value={item.id}>
                      <AAccordionTrigger
                        className={cn(
                          "px-2 hover:before:opacity-100 before:absolute before:left-0 before:w-full before:opacity-0 before:h-[1.75rem] before:-z-10",
                          selectedItemId === item.id &&
                            "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
                        )}
                        onClick={() => handleSelectChange(item)}
                      >
                        <div className="flex gap-x-2 items-center font-medium">
                          {item.icon && (
                            <item.icon
                              className={cn("h-5 w-5", item.color)}
                              aria-hidden="true"
                            />
                          )}
                          {!item.icon && FolderIcon && (
                            <FolderIcon
                              className={cn("h-5 w-5", item.color)}
                              aria-hidden="true"
                            />
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                      </AAccordionTrigger>
                      <AAccordionContent className="pl-4 pb-0">
                        <TreeItem
                          data={item.children ? item.children : item}
                          selectedItemId={selectedItemId}
                          handleSelectChange={handleSelectChange}
                          expandedItemIds={expandedItemIds}
                          FolderIcon={FolderIcon}
                          ItemIcon={ItemIcon}
                        />
                      </AAccordionContent>
                    </AccordionPrimitive.Item>
                  </AccordionPrimitive.Root>
                ) : (
                  <Leaf
                    item={item}
                    isSelected={selectedItemId === item.id}
                    onClick={() => handleSelectChange(item)}
                    Icon={ItemIcon}
                  />
                )}
              </li>
            ))
          ) : (
            <li>
              <Leaf
                item={data}
                isSelected={selectedItemId === data.id}
                onClick={() => handleSelectChange(data)}
                Icon={ItemIcon}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
);

const Leaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeDataItem;
    isSelected?: boolean;
    Icon?: LucideIcon;
  }
>(({ className, item, isSelected, Icon, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        `
          flex items-center p-2 cursor-pointer hover:before:opacity-100 before:absolute before:left-0
          before:right-1 before:w-fullbefore:opacity-0 before:h-[1.75rem] before:-z-10
        `,
        className,
        isSelected &&
          `
            before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2
            before:border-l-accent-foreground/50 dark:before:border-0
          `
      )}
      {...props}
    >
      <div className="flex gap-x-2 items-center font-medium">
        {item.icon && (
          <item.icon className={cn("h-5 w-5", item.color)} aria-hidden="true" />
        )}
        {!item.icon && Icon && (
          <Icon className={cn("h-5 w-5", item.color)} aria-hidden="true" />
        )}
        <span className="flex-grow truncate">{item.name}</span>
      </div>
    </div>
  );
});

export { ATree, type TreeDataItem };
