"use client";

import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";

export default function Sidebar() {
  return (
    <div>
      <div className="w-full max-w-[260px] px-1 py-2 dark:border-default-100">
        <Listbox aria-label="Listbox menu with sections" variant="shadow">
          <ListboxSection title="Actions" showDivider>
            <ListboxItem
              key="new"
              description="Create a new file"
              // startContent={<AddNoteIcon className={iconClasses} />}
            >
              New file
            </ListboxItem>
            <ListboxItem
              key="copy"
              description="Copy the file link"
              // startContent={<CopyDocumentIcon className={iconClasses} />}
            >
              Copy link
            </ListboxItem>
            <ListboxItem
              key="edit"
              description="Allows you to edit the file"
              // startContent={<EditDocumentIcon className={iconClasses} />}
            >
              Edit file
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Danger zone">
            <ListboxItem
              key="delete"
              className="text-danger"
              color="danger"
              description="Permanently delete the file"
              // startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
            >
              Delete file
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </div>
    </div>
  );
}
