import { useEffect, useState } from 'react'

import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobListings } from '../components/JobListings.jsx'

import jobsData from '../data.json'

const RESULTS_PER_PAGE = 4

export function SearchPage() {
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experienceLevel: ''
    })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const jobsFilteredByFilters = jobsData.filter(job => {
        return (
            (filters.technology === '' || job.data.technology === filters.technology) &&
            (filters.location === '' || job.data.modalidad === filters.location) &&
            (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
        )
    })

    const jobsWithFilters = textToFilter === ''
        ? jobsFilteredByFilters
        : jobsFilteredByFilters.filter(job => {
            return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
        })

    const totalPages = Math.ceil(jobsWithFilters.length / RESULTS_PER_PAGE)

    const pagedResults = jobsWithFilters.slice(
        (currentPage - 1) * RESULTS_PER_PAGE, // Página 1: 0, Página 2: 5, Página 3: 10
        currentPage * RESULTS_PER_PAGE        // Página 1: 5, Página 2: 10, Página 3: 15
    )

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    useEffect(() => {
        document.title = `Resultados: ${jobsWithFilters.length}, Página ${currentPage} - DevJobs`
    }, [jobsWithFilters, currentPage])

    return (
        <>
            <main>

                <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

                <section>
                    <JobListings jobs={pagedResults} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage} />
                </section>
            </main>
        </>
    )
}