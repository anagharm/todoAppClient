import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters, useSortBy, usePagination, useRowSelect } from 'react-table'
import { ColumnFilter } from './ColumnFilter'
import './TableCss.css'

export const TableTemplate = (props) => {
    const columns = useMemo(() => props.columns, [] )
    const data = useMemo(() => props.userData, [])
    const defaultColumn = useMemo(() => {
        return {
            Filter : ColumnFilter
        }
    },[])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
                    {
                        columns: columns,
                        data : data,
                        defaultColumn : defaultColumn
                    },
                    useFilters,
                    useGlobalFilter,
                    useSortBy,
                    useRowSelect,
                )

    return (
        <>
            <div className="tempcss">
                <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup) =>(
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map( column => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? <span>&#8595;</span> : <span>&#8593;</span>) : ''}
                                                </span>
                                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            rows.map(row =>{
                                prepareRow(row)
                                return(
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}