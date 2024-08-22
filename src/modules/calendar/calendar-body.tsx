import { CalendarDay } from './calendar-day'
import type { CalendarResponse } from '@/store/api/ebms/calendar/calendar.types'
import type { CapacityCategory } from '@/store/api/ebms/ebms.types'

export const CalendarBody = ({
    currentDays,
    firstDayCurrentMonth,
    calendarData,
    isFetching,
    category
}: {
    currentDays: Date[]
    calendarData: CalendarResponse
    isFetching: boolean
    firstDayCurrentMonth: Date
    category: CapacityCategory
}) => {
    return (
        <div className='grid grid-cols-[repeat(7,1fr)] gap-2 px-3'>
            {currentDays.map((currentDate) => (
                <CalendarDay
                    category={category}
                    calendarData={calendarData}
                    isFetching={isFetching}
                    date={currentDate}
                    key={currentDate.toString()}
                    firstDayCurrentMonth={firstDayCurrentMonth}
                />
            ))}
        </div>
    )
}
