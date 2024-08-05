import { StringParam, useQueryParam } from 'use-query-params'

import { Input } from '@/components/ui/input'

interface SearchBarProps {
    placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...' }) => {
    const [search, setSearch] = useQueryParam('search', StringParam)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        setSearch(searchTerm ? searchTerm : undefined)
    }

    return (
        <Input
            value={search || ''}
            onChange={handleSearch}
            className='h-10 w-48'
            placeholder={placeholder}
        />
    )
}
