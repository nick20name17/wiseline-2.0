import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface ErrorPageProps {
    message?: string
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message = 'Page not found' }) => {
    const navigate = useNavigate()

    return (
        <div className='flex min-h-[100vh] items-center justify-center'>
            <div className='flex flex-col items-center gap-y-5'>
                <h1 className='text-center text-5xl'>{message}</h1>
                <Button onClick={() => navigate('/')}>Go to homepage</Button>
            </div>
        </div>
    )
}
