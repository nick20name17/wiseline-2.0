import { useDebouncedCallback } from 'use-debounce'
import { StringParam, useQueryParam } from 'use-query-params'

import { Input } from '@/components/ui/input'

interface SearchBarProps {
    placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...' }) => {
    const [search, setSearch] = useQueryParam('search', StringParam)

    const debouncedSetSearch = useDebouncedCallback(setSearch, 300)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        debouncedSetSearch(searchTerm ? searchTerm : undefined)
    }

    return (
        <Input
            defaultValue={search || ''}
            onChange={handleSearch}
            className='h-10 w-48'
            placeholder={placeholder}
        />
    )
}
