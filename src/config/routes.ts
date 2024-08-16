export const routes = {
    main: '/',
    login: '/login',
    flowSettings: '/flow-settings',
    userSettings: '/user-settings',
    companySettings: '/company-settings',
    passwordResetConfirm: '/password-reset/:uidb64/:token',
    users: '/users',
    calendar: '/calendar',
    priorities: '/priorities'
} as const

export const adminOnlyRoutes = [
    routes.flowSettings,
    routes.users,
    routes.priorities,
    routes.companySettings
]
