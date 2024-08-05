type KeyFinder<T> = ((item: T) => string) | keyof T | string

type Grouped<T> = Array<[string, T[]]>

const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj)
}

export const groupBy = <T>(values: T[], keyFinder: KeyFinder<T>): Grouped<T> => {
    const groupedObj: Map<string, T[]> = values.reduce(
        (map: Map<string, T[]>, item: T) => {
            const key =
                typeof keyFinder === 'function'
                    ? keyFinder(item)
                    : typeof keyFinder === 'string'
                      ? getNestedValue(item, keyFinder)
                      : (item as any)[keyFinder]

            if (!map.has(key)) {
                map.set(key, [item])
            } else {
                map.get(key)?.push(item)
            }

            return map
        },
        new Map<string, T[]>()
    )

    return Array.from(groupedObj.entries())
}
