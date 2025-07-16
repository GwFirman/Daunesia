import { Outlet } from "react-router";

export default function _layout() {
    return (
        <div className="bg-background font-Helvetica_Neue text-foreground antialiased">
            <Outlet />
        </div>
    );
}
