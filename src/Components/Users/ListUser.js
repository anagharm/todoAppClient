import React from 'react'
import Fetcher from '../../hoc/FetcherSetting/FetcherSetting'
import { useQuery } from 'react-query'
import { TableTemplate } from '../../hoc/TableSetting/TableTemplate'
import { COLUMNS_USER } from './ListUserColumn'

function ListUser() {
    const { data : userList, isLoading } = useQuery('listUsers', () => Fetcher('get','/api/profile/get/listofusers',{}) )
    if(isLoading) return <h1>Loading</h1>
    return (
        <div>
            <TableTemplate userData={userList.data.response} columns={COLUMNS_USER}/>
        </div>
    )
}

export default ListUser
