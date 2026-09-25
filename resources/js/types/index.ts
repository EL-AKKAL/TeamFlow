export type * from "./auth";
export type * from "./navigation";
export type * from "./ui";
import type { Method } from "@inertiajs/core";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type Workspace = {
    id: number;
    name: string;
    members_count?: number;
    members?: Member[];
};

export interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    joined_at: string;
    avatar_url: string;
}

export type RowAction =
    | {
          type: "link";
          label: string;
          href: string;
          icon?: LucideIcon;
      }
    | {
          type: "dialog";
          label: string;
          content: ReactNode;
          icon?: LucideIcon;
      }
    | {
          type: "delete";
          label: string;
          route: { method: Method; url: string };
          title?: string;
          description?: string;
          icon?: LucideIcon;
      }
    | { type: "separator" };
