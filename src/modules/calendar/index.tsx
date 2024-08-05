import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    parse,
    startOfToday,
    startOfWeek
} from 'date-fns'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { CalendarBody } from './calendar-body'
import { Categories } from './categories'
import { Button } from '@/components/ui/button'
import { useGetCalendarQuery } from '@/store/api/ebms/ebms'
import type { CapacityKey } from '@/store/api/ebms/ebms.types'

export const Calendar = () => {
    const today = startOfToday()

    const [category = 'Rollforming'] = useQueryParam('category', StringParam)
    const [monthQuery, setMonthQuery] = useQueryParam('month', StringParam)
    const [yearQuery, setYearQuery] = useQueryParam('year', StringParam)

    const initialDate =
        monthQuery && yearQuery
            ? parse(`${yearQuery} ${monthQuery}`, 'yyyy M', new Date())
            : today
    const [currentDate, setCurrentDate] = useState(format(initialDate, 'MMM yyyy'))

    const firstDayCurrentMonth = parse(currentDate, 'MMM yyyy', new Date())

    useEffect(() => {
        if (monthQuery && yearQuery) {
            const dateFromQuery = parse(
                `${yearQuery} ${monthQuery}`,
                'yyyy M',
                new Date()
            )
            setCurrentDate(format(dateFromQuery, 'MMM yyyy'))
        } else {
            const firstDayCurrentMonth = parse(currentDate, 'MMM yyyy', new Date())
            setMonthQuery(format(firstDayCurrentMonth, 'M'))
            setYearQuery(format(firstDayCurrentMonth, 'yyyy'))
        }
    }, [monthQuery, yearQuery])

    const getNextMonth = () => {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentDate(format(firstDayNextMonth, 'MMM yyyy'))
        setMonthQuery(format(firstDayNextMonth, 'M'))
        setYearQuery(format(firstDayNextMonth, 'yyyy'))
    }

    const getPreviousMonth = () => {
        const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentDate(format(firstDayPreviousMonth, 'MMM yyyy'))
        setMonthQuery(format(firstDayPreviousMonth, 'M'))
        setYearQuery(format(firstDayPreviousMonth, 'yyyy'))
    }

    const getCurrentMonthDays = () => {
        return eachDayOfInterval({
            start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 0 }),
            end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 0 })
        })
    }

    const { data: calendarData, isFetching } = useGetCalendarQuery({
        month: +format(firstDayCurrentMonth, 'M'),
        year: +format(firstDayCurrentMonth, 'yyyy')
    })

    useEffect(() => {
        setMonthQuery(format(firstDayCurrentMonth, 'M'))
        setYearQuery(format(firstDayCurrentMonth, 'yyyy'))
    }, [currentDate])

    return (
        <>
            <div className='flex flex-wrap-reverse items-center justify-between gap-4 px-3 py-3'>
                <Categories />
                <div className='flex w-[218px] items-center justify-between gap-x-4 max-[440px]:w-full'>
                    <Button
                        onClick={getPreviousMonth}
                        variant='outline'
                        className='h-8 w-8 p-0'>
                        <ArrowLeft className='h-4 w-4' />
                    </Button>

                    <h1 className='scroll-m-20 font-bold'>
                        {format(firstDayCurrentMonth, 'MMM yyyy')}
                    </h1>

                    <Button
                        onClick={getNextMonth}
                        variant='outline'
                        className='h-8 w-8 p-0'>
                        <ArrowRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            <div className='!w-full overflow-x-auto'>
                <Weeks />
                <CalendarBody
                    category={category as CapacityKey}
                    calendarData={calendarData!}
                    isFetching={isFetching}
                    currentDays={getCurrentMonthDays()}
                    firstDayCurrentMonth={firstDayCurrentMonth}
                />
            </div>
        </>
    )
}

const Weeks = () => {
    return (
        <div className='grid grid-cols-[repeat(7,1fr)] gap-2 px-3'>
            <div className='min-w-[187px] p-4 text-center'>Sunday</div>
            <div className='min-w-[187px] p-4 text-center'>Monday</div>
            <div className='min-w-[187px] p-4 text-center'>Tuesday</div>
            <div className='min-w-[187px] p-4 text-center'>Wednesday</div>
            <div className='min-w-[187px] p-4 text-center'>Thursday</div>
            <div className='min-w-[187px] p-4 text-center'>Friday</div>
            <div className='min-w-[187px] p-4 text-center'>Saturday</div>
        </div>
    )
}
