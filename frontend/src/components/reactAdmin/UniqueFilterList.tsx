import axios from 'axios'
import { useEffect, useState } from 'react'
import { SelectInput } from 'react-admin'


export const UniqueFilterList = ({ source, mainUrl }: any) => {
    const [uniqueChoices, setUniqueChoices] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [page, setPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const limit = 100

    useEffect(() => {
        if (!isFetching || isLoading) return

        axios.get(`${mainUrl}?limit=${limit}&page=${page}`)
            .then(res => {
                const transformedData = res.data.data.data.map((d: any) => ({ id: d, name: d }))
                setUniqueChoices((data) => [...data, ...transformedData])
                setPage(p => p + 1)
                setIsFetching(false)
            })
    }, [isFetching])

    const handleScroll = (e: any) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        if (!isFetching && page * limit < total && scrollTop + clientHeight >= 0.9 * scrollHeight) {
            setIsFetching(true)
        }
    }

    useEffect(() => {
        const initialLoading = async () => {
            const res = await axios.get(`${mainUrl}?limit=${limit}`)
            setTotal(res.data.data.total)
            const transformedData = res.data.data.data.map((d: any) => ({ id: d, name: d }))
            setUniqueChoices(transformedData)
            setIsFetching(false)
            setIsLoading(false)
            setPage(p => p + 1)
        }

        initialLoading()
    }, [])

    return (
        <SelectInput isLoading={isLoading} onScrollCapture={handleScroll} choices={uniqueChoices} source={source} />
    )
}
