import React from 'react'

export const ColumnFilter = ({column}) => {
    const { filterValue, setFilter } = column
    return (
        <span>
            <input placeholder="Search" value={filterValue || ''} onChange={e => setFilter(e.target.value)} style={{"width":"110px","height":"20px"}}/>
        </span>
    )
}