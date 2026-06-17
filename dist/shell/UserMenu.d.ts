export interface ShellUser {
    email?: string;
    name?: string;
}
/** Account dropdown — consistent across apps: identity, System Admin (admin only),
 *  and a hub-centric Sign out. */
export default function UserMenu({ user, isAdmin, hubUrl, onSignOut, }: {
    user?: ShellUser;
    isAdmin?: boolean;
    hubUrl?: string;
    onSignOut?: () => void;
}): import("react").JSX.Element;
