import DefaultLayout from "@/layouts/default";
import Calendar from "./Calendar";

export default function CalendarPage() {
    return <DefaultLayout>
        <section className="flex h-auto">
            <Calendar />
        </section>
    </DefaultLayout>
}