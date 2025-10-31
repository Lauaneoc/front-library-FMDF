import { Outlet } from "react-router-dom";
import { AppHeader } from "../app-header";
import { AppSidebar } from "../app-sidebar";

type Props = {
    titlePage?: string
}

export function DefaultLayout({titlePage}: Props) {
    return (
        <div className="flex h-screen bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AppHeader title={titlePage ?? ""} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}