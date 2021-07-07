import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters, useSortBy, usePagination, useRowSelect } from 'react-table'
import { ColumnFilter } from './ColumnFilter' 
import './TableCss.css'

export const TableTemplatePageWise = (props) => {
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
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
    } = useTable(
                    {
                        columns: columns,
                        data : data,
                        defaultColumn : defaultColumn
                    },
                    useFilters,
                    useGlobalFilter,
                    useSortBy,
                    usePagination,
                    useRowSelect,
                )
    const { pageIndex, pageSize } = state

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
                        page.map(row =>{
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
            <div><br/>
                <div className="row col-lg-10 offset-lg-2">
                    <span>
                    <strong>Page{' '}
                            {pageIndex + 1 } of {pageOptions.length}
                        </strong>{' '}
                        
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                        | <b>Go to page :</b> &nbsp;{' '}
                        <input type='number' defaultValue={pageIndex+1} 
                        onChange = {e => {
                                const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
                                gotoPage(pageNumber)
                            }
                        }
                        style={{width : '50px'}}/>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {
                            [10,25,50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))
                        }
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>&nbsp;
                    <button style={{backgroundColor:"#8eb4db",color:"white"}} onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style={{backgroundColor:"#8eb4db",color:"white"}}  onClick={() => nextPage()} disabled={!canNextPage}>Next</button>&nbsp;
                    <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
            </div>
        </>
    )
}