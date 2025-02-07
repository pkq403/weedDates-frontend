import DefaultLayout from "@/layouts/default";
import Calendar from "./calendar-component";

export default function CalendarPage() {
    return <DefaultLayout>
        <section className="flex h-auto">
            <Calendar />
        </section>
    </DefaultLayout>
}