import { CalendarDay } from './calendar-day'
import type { CalendarResponse, CapacityKey } from '@/store/api/ebms/ebms.types'

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
    category: CapacityKey
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
