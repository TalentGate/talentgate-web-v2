import CustomCalendar from '@/app/(company)/events/_components/calendar/custom-calendar';
import Header from '@/components/section/header';

function EventCalendar() {
  return (
    <main className="p-6 space-y-6 w-full h-full">
      <Header
        header={'Event Calendar'}
        description={'You can view, set, edit and delete events by using the calendar below.'}
      />
      <CustomCalendar />
    </main>
  );
}

export default EventCalendar;
