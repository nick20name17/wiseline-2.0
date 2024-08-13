export const parseQueryString = (
    queryString: string
): Record<string, string | string[]> => {
    const params = new URLSearchParams(
        queryString.startsWith('?') ? queryString.substring(1) : queryString
    )
    const result: Record<string, any> = {}

    params.forEach((value, key) => {
        const intValue = parseInt(value, 10)
        result[key] = isNaN(intValue) ? value : intValue
    })

    return result

    return result
}
