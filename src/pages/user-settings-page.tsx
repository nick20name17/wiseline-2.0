import { Header } from '@/components/layout/header'
import { UserSettings } from '@/modules'

export const UserSettingsPage = () => (
    <>
        <Header title='User profile' />
        <UserSettings />
    </>
)
